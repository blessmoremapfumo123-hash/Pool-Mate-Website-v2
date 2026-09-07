/**
 * PoolMate database
 * -----------------
 * Talks to Cloud Firestore when a real Firebase config is present.
 * Otherwise stores the same collections in the browser so HTML files
 * still open and logins still persist.
 *
 * Collections
 *   users/{uid}        { name, email, phone, role, createdAt }
 *   passengers/{uid}   rider profile
 *   drivers/{uid}      driver profile
 *   trips/{id}         bookings linked to passengerId / driverId
 */
(function (global) {
  var LS_DB = "poolmate.v1.db";
  var LS_SESSION = "poolmate.v1.session";
  var LS_CONFIG = "poolmate.v1.firebase";
  var SEED_FLAG = "poolmate.v1.seeded";

  function uid() {
    if (global.crypto && crypto.randomUUID) return crypto.randomUUID();
    return "id-" + Date.now() + "-" + Math.random().toString(16).slice(2);
  }

  function now() {
    return new Date().toISOString();
  }

  function readLocal() {
    try {
      return JSON.parse(localStorage.getItem(LS_DB) || "") || emptyDb();
    } catch (e) {
      return emptyDb();
    }
  }

  function emptyDb() {
    return { users: {}, passengers: {}, drivers: {}, trips: {} };
  }

  function writeLocal(db) {
    localStorage.setItem(LS_DB, JSON.stringify(db));
  }

  function savedConfig() {
    try {
      var raw = localStorage.getItem(LS_CONFIG);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return global.POOLMATE_FIREBASE || {};
  }

  function isLiveConfig(cfg) {
    if (!cfg || !cfg.apiKey || !cfg.projectId) return false;
    if (String(cfg.apiKey).indexOf("PASTE") === 0) return false;
    if (String(cfg.projectId).indexOf("YOUR_") === 0) return false;
    return true;
  }

  var mode = "local";
  var auth = null;
  var fs = null;
  var readyPromise = null;

  function hash(text) {
    return Promise.resolve().then(function () {
      if (!global.crypto || !crypto.subtle) {
        return "p:" + text;
      }
      return crypto.subtle
        .digest("SHA-256", new TextEncoder().encode("poolmate:" + text))
        .then(function (buf) {
          return Array.from(new Uint8Array(buf))
            .map(function (b) {
              return b.toString(16).padStart(2, "0");
            })
            .join("");
        });
    });
  }

  function seedIfNeeded() {
    if (localStorage.getItem(SEED_FLAG)) return;
    var db = readLocal();
    var data = global.PM_DATA || { seedPassengers: [], seedDrivers: [] };
    data.seedPassengers.forEach(function (p, i) {
      var id = "seed-p-" + (i + 1);
      db.users[id] = {
        id: id,
        name: p.name,
        email: p.email,
        phone: p.phone,
        role: "passenger",
        createdAt: now(),
        demo: true,
      };
      db.passengers[id] = {
        id: id,
        name: p.name,
        email: p.email,
        phone: p.phone,
        area: p.area,
        tripsCount: 0,
        wallet: 0,
        createdAt: now(),
      };
    });
    data.seedDrivers.forEach(function (d, i) {
      var id = "seed-d-" + (i + 1);
      db.users[id] = {
        id: id,
        name: d.name,
        email: d.email,
        phone: d.phone,
        role: "driver",
        createdAt: now(),
        demo: true,
      };
      db.drivers[id] = {
        id: id,
        name: d.name,
        email: d.email,
        phone: d.phone,
        vehicle: d.vehicle,
        plate: d.plate,
        status: d.status,
        rating: 4.8,
        tripsCount: 12 + i * 3,
        createdAt: now(),
      };
    });
    writeLocal(db);
    localStorage.setItem(SEED_FLAG, "1");
  }

  function colToMap(snap) {
    var out = {};
    snap.forEach(function (doc) {
      out[doc.id] = Object.assign({ id: doc.id }, doc.data());
    });
    return out;
  }

  function initFirebase(cfg) {
    if (!global.firebase) throw new Error("Firebase SDK not loaded");
    if (!firebase.apps.length) firebase.initializeApp(cfg);
    auth = firebase.auth();
    fs = firebase.firestore();
    mode = "firebase";
  }

  function boot() {
    if (readyPromise) return readyPromise;
    readyPromise = Promise.resolve()
      .then(function () {
        seedIfNeeded();
        var cfg = savedConfig();
        if (!isLiveConfig(cfg)) {
          mode = "local";
          return;
        }
        try {
          initFirebase(cfg);
        } catch (e) {
          console.warn("Firebase init failed, using local database", e);
          mode = "local";
        }
      })
      .then(function () {
        return PM;
      });
    return readyPromise;
  }

  function currentSession() {
    try {
      return JSON.parse(localStorage.getItem(LS_SESSION) || "null");
    } catch (e) {
      return null;
    }
  }

  function setSession(user) {
    if (!user) localStorage.removeItem(LS_SESSION);
    else localStorage.setItem(LS_SESSION, JSON.stringify(user));
  }

  function toPublicUser(u) {
    if (!u) return null;
    return {
      id: u.id || u.uid,
      uid: u.id || u.uid,
      name: u.name || u.displayName || "",
      email: u.email || "",
      phone: u.phone || "",
      role: u.role || null,
    };
  }

  var PM = {
    boot: boot,
    mode: function () {
      return mode;
    },
    isCloud: function () {
      return mode === "firebase";
    },
    saveConfig: function (cfg) {
      localStorage.setItem(LS_CONFIG, JSON.stringify(cfg));
      global.POOLMATE_FIREBASE = cfg;
      readyPromise = null;
      mode = "local";
      auth = null;
      fs = null;
      return boot();
    },
    getConfig: savedConfig,
    isLiveConfig: isLiveConfig,

    currentUser: function () {
      if (mode === "firebase" && auth && auth.currentUser) {
        var s = currentSession() || {};
        return toPublicUser(
          Object.assign({}, s, {
            id: auth.currentUser.uid,
            email: auth.currentUser.email,
            name: auth.currentUser.displayName || s.name,
          }),
        );
      }
      return toPublicUser(currentSession());
    },

    signUp: function (input) {
      var name = (input.name || "").trim();
      var email = (input.email || "").trim().toLowerCase();
      var password = input.password || "";
      var phone = (input.phone || "").trim();
      if (!email || !password) return Promise.reject(new Error("Email and password are required"));
      if (password.length < 6) return Promise.reject(new Error("Password must be at least 6 characters"));

      if (mode === "firebase") {
        return auth
          .createUserWithEmailAndPassword(email, password)
          .then(function (cred) {
            return cred.user.updateProfile({ displayName: name }).then(function () {
              return cred.user;
            });
          })
          .then(function (user) {
            var profile = {
              id: user.uid,
              name: name || email.split("@")[0],
              email: email,
              phone: phone,
              role: null,
              createdAt: now(),
            };
            return fs
              .collection("users")
              .doc(user.uid)
              .set(profile)
              .then(function () {
                setSession(profile);
                return toPublicUser(profile);
              });
          });
      }

      return hash(password).then(function (pw) {
        var db = readLocal();
        var exists = Object.keys(db.users).some(function (id) {
          return db.users[id].email === email;
        });
        if (exists) throw new Error("An account with that email already exists");
        var id = uid();
        var profile = {
          id: id,
          name: name || email.split("@")[0],
          email: email,
          phone: phone,
          passwordHash: pw,
          role: null,
          createdAt: now(),
        };
        db.users[id] = profile;
        writeLocal(db);
        setSession(profile);
        return toPublicUser(profile);
      });
    },

    signIn: function (input) {
      var email = (input.email || "").trim().toLowerCase();
      var password = input.password || "";
      if (mode === "firebase") {
        return auth.signInWithEmailAndPassword(email, password).then(function (cred) {
          return fs
            .collection("users")
            .doc(cred.user.uid)
            .get()
            .then(function (doc) {
              var profile = doc.exists
                ? Object.assign({ id: cred.user.uid }, doc.data())
                : {
                    id: cred.user.uid,
                    name: cred.user.displayName || email.split("@")[0],
                    email: email,
                    phone: "",
                    role: null,
                    createdAt: now(),
                  };
              if (!doc.exists) {
                return fs
                  .collection("users")
                  .doc(cred.user.uid)
                  .set(profile)
                  .then(function () {
                    setSession(profile);
                    return toPublicUser(profile);
                  });
              }
              setSession(profile);
              return toPublicUser(profile);
            });
        });
      }
      return hash(password).then(function (pw) {
        var db = readLocal();
        var found = null;
        Object.keys(db.users).forEach(function (id) {
          var u = db.users[id];
          if (u.email === email) found = u;
        });
        if (!found || found.demo) throw new Error("No account for that email");
        if (found.passwordHash !== pw) throw new Error("Wrong password");
        setSession(found);
        return toPublicUser(found);
      });
    },

    signOut: function () {
      setSession(null);
      if (mode === "firebase" && auth) return auth.signOut();
      return Promise.resolve();
    },

    saveRole: function (role, extra) {
      extra = extra || {};
      var user = PM.currentUser();
      if (!user) return Promise.reject(new Error("Not signed in"));
      if (role !== "passenger" && role !== "driver") {
        return Promise.reject(new Error("Choose passenger or driver"));
      }
      var base = {
        id: user.id,
        name: extra.name || user.name,
        email: user.email,
        phone: extra.phone || user.phone || "",
        role: role,
        updatedAt: now(),
      };

      function writeLocalRole() {
        var db = readLocal();
        var prev = db.users[user.id] || { id: user.id, email: user.email, createdAt: now() };
        db.users[user.id] = Object.assign({}, prev, base);
        if (role === "passenger") {
          db.passengers[user.id] = Object.assign({}, db.passengers[user.id] || {}, base, {
            area: extra.area || "Lusaka",
            tripsCount: (db.passengers[user.id] && db.passengers[user.id].tripsCount) || 0,
            wallet: (db.passengers[user.id] && db.passengers[user.id].wallet) || 0,
            createdAt: (db.passengers[user.id] && db.passengers[user.id].createdAt) || now(),
          });
          delete db.drivers[user.id];
        } else {
          db.drivers[user.id] = Object.assign({}, db.drivers[user.id] || {}, base, {
            vehicle: extra.vehicle || "Toyota Corolla",
            plate: extra.plate || "LUSAKA",
            status: extra.status || "online",
            rating: 5,
            tripsCount: (db.drivers[user.id] && db.drivers[user.id].tripsCount) || 0,
            createdAt: (db.drivers[user.id] && db.drivers[user.id].createdAt) || now(),
          });
          delete db.passengers[user.id];
        }
        writeLocal(db);
        setSession(Object.assign({}, currentSession(), base));
        return toPublicUser(Object.assign({}, user, base));
      }

      if (mode === "firebase") {
        var batch = fs.batch();
        batch.set(fs.collection("users").doc(user.id), base, { merge: true });
        if (role === "passenger") {
          batch.set(
            fs.collection("passengers").doc(user.id),
            Object.assign({}, base, { area: extra.area || "Lusaka", tripsCount: 0, wallet: 0, createdAt: now() }),
            { merge: true },
          );
          batch.delete(fs.collection("drivers").doc(user.id));
        } else {
          batch.set(
            fs.collection("drivers").doc(user.id),
            Object.assign({}, base, {
              vehicle: extra.vehicle || "Toyota Corolla",
              plate: extra.plate || "LUSAKA",
              status: extra.status || "online",
              rating: 5,
              tripsCount: 0,
              createdAt: now(),
            }),
            { merge: true },
          );
          batch.delete(fs.collection("passengers").doc(user.id));
        }
        return batch.commit().then(function () {
          setSession(Object.assign({}, currentSession(), base));
          writeLocalRole();
          return toPublicUser(Object.assign({}, user, base));
        });
      }
      return Promise.resolve(writeLocalRole());
    },

    listPassengers: function () {
      if (mode === "firebase") {
        return fs
          .collection("passengers")
          .get()
          .then(function (snap) {
            return Object.keys(colToMap(snap)).map(function (id) {
              return colToMap(snap)[id];
            });
          });
      }
      var db = readLocal();
      return Promise.resolve(
        Object.keys(db.passengers).map(function (id) {
          return db.passengers[id];
        }),
      );
    },

    listDrivers: function () {
      if (mode === "firebase") {
        return fs
          .collection("drivers")
          .get()
          .then(function (snap) {
            var map = colToMap(snap);
            return Object.keys(map).map(function (id) {
              return map[id];
            });
          });
      }
      var db = readLocal();
      return Promise.resolve(
        Object.keys(db.drivers).map(function (id) {
          return db.drivers[id];
        }),
      );
    },

    setDriverStatus: function (status) {
      var user = PM.currentUser();
      if (!user) return Promise.reject(new Error("Not signed in"));
      if (mode === "firebase") {
        return fs
          .collection("drivers")
          .doc(user.id)
          .set({ status: status, updatedAt: now() }, { merge: true });
      }
      var db = readLocal();
      if (db.drivers[user.id]) {
        db.drivers[user.id].status = status;
        writeLocal(db);
      }
      return Promise.resolve();
    },

    saveTrip: function (trip) {
      var user = PM.currentUser();
      if (!user) return Promise.reject(new Error("Not signed in"));
      var row = Object.assign(
        {
          id: uid(),
          passengerId: user.role === "driver" ? trip.passengerId || null : user.id,
          driverId: user.role === "driver" ? user.id : trip.driverId || null,
          service: "rides",
          status: "requested",
          createdAt: now(),
        },
        trip,
      );
      if (mode === "firebase") {
        return fs
          .collection("trips")
          .doc(row.id)
          .set(row)
          .then(function () {
            return row;
          });
      }
      var db = readLocal();
      db.trips[row.id] = row;
      if (row.passengerId && db.passengers[row.passengerId]) {
        db.passengers[row.passengerId].tripsCount = (db.passengers[row.passengerId].tripsCount || 0) + 1;
      }
      if (row.driverId && db.drivers[row.driverId] && row.status === "completed") {
        db.drivers[row.driverId].tripsCount = (db.drivers[row.driverId].tripsCount || 0) + 1;
      }
      writeLocal(db);
      return Promise.resolve(row);
    },

    patchTrip: function (id, patch) {
      if (mode === "firebase") {
        return fs
          .collection("trips")
          .doc(id)
          .set(Object.assign({}, patch, { updatedAt: now() }), { merge: true })
          .then(function () {
            return Object.assign({ id: id }, patch);
          });
      }
      var db = readLocal();
      if (!db.trips[id]) return Promise.resolve(null);
      db.trips[id] = Object.assign({}, db.trips[id], patch, { updatedAt: now() });
      writeLocal(db);
      return Promise.resolve(db.trips[id]);
    },

    listMyTrips: function () {
      var user = PM.currentUser();
      if (!user) return Promise.resolve([]);
      function mine(list) {
        return list
          .filter(function (t) {
            return t.passengerId === user.id || t.driverId === user.id;
          })
          .sort(function (a, b) {
            return String(b.createdAt).localeCompare(String(a.createdAt));
          });
      }
      if (mode === "firebase") {
        return fs
          .collection("trips")
          .get()
          .then(function (snap) {
            var map = colToMap(snap);
            return mine(
              Object.keys(map).map(function (id) {
                return map[id];
              }),
            );
          });
      }
      var db = readLocal();
      return Promise.resolve(
        mine(
          Object.keys(db.trips).map(function (id) {
            return db.trips[id];
          }),
        ),
      );
    },
  };

  global.PM = PM;
})(window);
