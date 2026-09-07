# PoolMate — school website

Corridor pooling for Lusaka. Open the HTML files in a browser — no build step.

## Open the site

Click **[index.html](index.html)** to start.

| File | What it is |
| --- | --- |
| [index.html](index.html) | Landing page |
| [login.html](login.html) | Log in / create account |
| [role.html](role.html) | Passenger or driver |
| [dashboard.html](dashboard.html) | Passenger booking |
| [drive.html](drive.html) | Driver jobs |
| [activity.html](activity.html) | Trip history |
| [database.html](database.html) | Drivers & passengers tables + Firebase keys |

## Firebase

Accounts are stored in two collections after login + role:

- `passengers/{uid}` — riders
- `drivers/{uid}` — drivers
- `users/{uid}` — profile + role
- `trips/{id}` — bookings

Paste your web app keys in `js/firebase-config.js` or on **database.html**. Until then the same collections run in the browser so the HTML still opens offline. Step-by-step: [FIREBASE.md](FIREBASE.md).

## How to demo for the lecturer

1. Open `index.html`.
2. Create an account on `login.html`.
3. Pick **Ride** or **Drive**.
4. Open `database.html` — the new row is in passengers or drivers.
