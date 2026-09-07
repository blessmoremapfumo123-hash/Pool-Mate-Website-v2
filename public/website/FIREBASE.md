# Connect PoolMate to Firebase

The website already talks to Firebase Auth + Cloud Firestore. You only need a project and the web keys.

## 1. Create a project

1. Open [Firebase Console](https://console.firebase.google.com/).
2. Add project → name it `poolmate` (or similar).
3. Skip Google Analytics if asked.

## 2. Register a web app

1. Project overview → the **web** icon (`</>`).
2. App nickname: `PoolMate website`.
3. Copy the `firebaseConfig` object.

## 3. Paste the keys

Either:

- Edit `js/firebase-config.js` and replace the `PASTE_` / `YOUR_` values, **or**
- Open `database.html` and paste the six fields, then **Save & connect**.

## 4. Turn on Auth and Firestore

1. **Authentication** → Sign-in method → Email/Password → Enable.
2. **Firestore Database** → Create database → **Start in test mode** (ok for the assignment).
3. Location: pick the closest (e.g. `europe-west`).

Optional rules (same as test mode) are in `firestore.rules`.

## Collections the app writes

| Collection | When |
| --- | --- |
| `users/{uid}` | On sign up |
| `passengers/{uid}` | When the user picks Ride |
| `drivers/{uid}` | When the user picks Drive |
| `trips/{id}` | When a ride is booked or a job is completed |

The Database page lists passengers and drivers live from those collections.
