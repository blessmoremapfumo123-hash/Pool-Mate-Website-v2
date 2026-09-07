/**
 * PoolMate — Firebase project keys
 * --------------------------------
 * Open Firebase Console → Project settings → Your apps → Web app.
 * Paste the config object values below. Leave the placeholders and the
 * app still runs (local database) so you can open the HTML files offline.
 *
 * Collections used:
 *   passengers/{uid}  — rider accounts
 *   drivers/{uid}     — driver accounts
 *   trips/{id}        — bookings
 *   users/{uid}       — role + profile pointer
 */
window.POOLMATE_FIREBASE = {
  apiKey: "PASTE_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};
