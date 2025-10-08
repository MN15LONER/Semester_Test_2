ShopEZ - Expo React Native shopping app

What I implemented for you:
- Email/password registration and login (Firebase Auth).
- Persistent auth state using Firebase onAuthStateChanged.
- Product list and product details fetched from Fake Store API.
- Category filter.
- Add to cart, cart screen with quantity controls and remove.
- Cart saved under Firebase Realtime Database at /carts/{uid} and kept in sync in real-time.
- Local cart persistence using AsyncStorage for offline access.
- Basic styled UI and navigation using React Navigation.

How to run
1. Install dependencies (from project root):

   npm install

2. Install Expo CLI globally if needed:

   npm install -g expo-cli

3. Start the app:

   npm start

4. Open in Expo Go on your device or in a simulator.

Firebase setup (you must do this on your side):
1. Create a Firebase project at https://console.firebase.google.com/.
2. Enable Email/Password sign-in method under Authentication -> Sign-in method.
3. Create a Realtime Database (not Firestore) and set its location. Start in locked mode for now.
4. In Project Settings -> Your apps -> Add web app. Copy the firebase config object (apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId, appId).
5. In this repo, open `firebase.js` and replace the placeholder values in the firebaseConfig object with your project's values.

Realtime Database security rules (basic example to restrict cart access to its owner):

{
  "rules": {
    "carts": {
      "$uid": {
        ".read": "auth != null && auth.uid === $uid",
        ".write": "auth != null && auth.uid === $uid"
      }
    }
  }
}

Notes & next steps:
- The checkout flow is not implemented.
- You can tweak styles in the screens folder.
- If you prefer Firestore instead of Realtime Database, adapt `firebase.js` and the reads/writes accordingly.

If you want, I can commit these changes to a branch and open a PR, or help you set up the Firebase rules in the console step-by-step.