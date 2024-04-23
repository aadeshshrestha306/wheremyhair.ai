# Hair Loss Prediction and Analysis System - React Native App

## Introduction
The Hair Loss Prediction and Analysis System is a mobile application designed to predict and analyze male pattern baldness based on uploaded images. The app interacts with a backend server built with FastAPI to process image uploads, perform predictions, and display analysis results.

## Installation
1. Install Node.js and React Native CLI
Ensure you have Node.js installed on your system. You can download it from the official Node.js website.

Install the React Native CLI globally using npm:

```bash
Copy code
    npm install -g react-native-cli
```

2. Clone the Repository
Clone the project repository from GitHub:

```bash
Copy code
    git clone https://github.com/aadeshshrestha306/wheremyhair.ai.git`
```

3. Install Dependencies
Navigate to the project directory and install the required npm packages:

```bash
Copy code
    cd your-repository
    npm install
```

4. Run the App
Start the React Native development server:

```bash
Copy code
    npx react-native start
```

In a separate terminal, run the app on an emulator or physical device:

```bash
Copy code
    npx react-native run-android
```

or

```bash
Copy code
    npx react-native run-ios
```

The app should now be running on your device or emulator.

Usage
Uploading Images
The app allows users to upload images for baldness prediction. The image is sent to the backend server, processed, and the prediction results are displayed to the user.

Viewing Usage
The app also provides a feature to view the user's image upload history and visualize the usage over time.