![WhatsApp Image 2025-10-08 at 20 47 06_2c6bf3b2](https://github.com/user-attachments/assets/9a85709f-6169-41c7-a872-272f1ac0c070)

![WhatsApp Image 2025-10-08 at 20 47 06_753c5556](https://github.com/user-attachments/assets/8923785b-0413-4f14-b707-86ec9c448467)

![WhatsApp Image 2025-10-08 at 20 47 07_101b5099](https://github.com/user-attachments/assets/c7d55723-49c5-43b7-bc5e-b9c7424a0a52)

![WhatsApp Image 2025-10-08 at 20 47 07_f18656fa](https://github.com/user-attachments/assets/4498b318-63f9-4618-a8ba-8beb17f8849c)

If you want to see the app run follow this link https://youtube.com/shorts/fxD8tKMs8J8?feature=share
Quick start (clone + run)
1. Clone the repo and install dependencies:

   git clone <your-repo-url>
   cd <repo-folder>
   npm install

2. Install Expo CLI (if you don't have it):

   npm install -g expo-cli

3. Install native-compatible dependencies via Expo (recommended):

   cd <repo-folder>
   expo install @react-native-async-storage/async-storage
   expo install firebase
   # If prompted by Expo, accept any matching versions

4. Start the Expo dev server and clear cache (recommended on first run):

   expo start -c

5. Open the app in Expo Go on your device, or in an emulator.

Required packages (the app depends on these):
- expo (~54)
- react (19.x)
- react-native (0.81.x)
- firebase (^9.x)
- axios
- @react-navigation/native
- @react-navigation/stack
- react-native-gesture-handler
- react-native-reanimated
- react-native-safe-area-context
- react-native-screens
- @react-native-async-storage/async-storage

The exact package versions are listed in `package.json` (install via npm or yarn to get the same versions).


- If the app shows an error about missing native modules (AsyncStorage), run:

  expo install @react-native-async-storage/async-storage




