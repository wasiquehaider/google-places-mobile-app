# Google Places App

## Getting Started

### 1. Setup Environment Variables

Create a `.env` file in your project root with the following variables:

```
EXPO_PUBLIC_GOOGLE_API_KEY=your_google_api_key_here
EXPO_PUBLIC_PLACES_AUTOCOMPLETE_URL=https://maps.googleapis.com/maps/api/place/autocomplete/json
EXPO_PUBLIC_PLACE_DETAILS_URL=https://maps.googleapis.com/maps/api/place/details/json
```

Replace `your_google_api_key_here` with your actual Google API key.

### 2. Install Dependencies

Run:

```
npx expo install react-native-maps @react-native-async-storage/async-storage
npm install @reduxjs/toolkit react-redux redux-persist
```

### 3. Start the App

Run:

```
npx expo start
```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## State Management
This app uses **Redux Toolkit** and **redux-persist** for efficient, scalable state management and local data persistence. All state logic is modularized in Redux slices.

## UI & Components
The UI is built with a modular component approach for maintainability and reusability. The design is clean, modern, and optimized for performance and user experience.

## Dependencies
- @reduxjs/toolkit
- react-redux
- redux-persist
- @react-native-async-storage/async-storage

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
