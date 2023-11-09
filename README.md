# Student Wellbeing App

A mobile app designed to bring support to struggling students

## Technologies

- Expo
- Firebase
- JavaScript
- React Native
- Tailwind CSS

## Getting Started

### A few things to check before you launch the app
## Anroid Studio
- You will need to download Android Studio
- Once downloaded follow these instructions 
- Navigate to projects, select more actions and click on **SDK Manager**
- Navigate to the Android SKD tab and install **Android Tiramisu** & **Android 12L**
- Click Apply & ok
- Select more actions again and click on **Virtual Device Manager**
- Select **Create virtual device**
- Select the Pixel 2 and click next
- Install and select the **R** Release, click next & Finish
  
  
# Environment Variables
- Make sure in your **Envoronment variables** on your computer that there is a Variable called **ANDROID_HOME** with the value **c:\Android\AndroidSDK** or something similar.

### Installation

```bash
$ git clone https://github.com/MarcoKoen/StudentWellbeing.git
$ cd StudentWellbeing
```

To see the app in Android Studio:
```bash
$ npm i
$ npm run android
```

#### Add `.env` file to your directory
All this information will be found in Firebase
```
API_KEY= 
AUTH_DOMAIN= 
PROJECT_ID= 
STORAGE_BUCKET= 
MESSAGING_SENDER_ID= 
APP_ID=
```
