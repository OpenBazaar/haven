
## OB1 Native-Bazaar
[![Build Status](https://app.bitrise.io/app/9c4f0ff60d38782d/status.svg?token=PdrfhQM1NCRlGC-HFRRwMw&branch=develop)](https://www.bitrise.io/app/9c4f0ff60d38782d) [![CodeFactor](https://www.codefactor.io/repository/github/ob1company/native-bazaar/badge)](https://www.codefactor.io/repository/github/ob1company/native-bazaar)

![banner](https://avatars1.githubusercontent.com/u/14205218?s=60&v=4)

OB1 mobile app built with react-native.

### Setup Instructions:

1. `git clone https://github.com/OB1Company/native-bazaar.git`
2. `yarn`
3. `yarn start`

### Development Server

The app is currently connected to a development server `http://45.32.240.156:4002` (username:password). When the app is further developed, we'll switch to the mobile server running on the device.

#### iOS
Then you'll need to set up iOS simulator (Xcode). The app can also be installed on your device, but the default is not a static build, meaning it will need to be connected to Xcode to function. Static build instructions can be found [here](http://facebook.github.io/react-native/docs/running-on-device.html).

In Xcode, run the project on a simulator or install on your device.

#### Android

Setup Android USB debugging mode and make sure `adb` is installed on your computer. Plug in your Android device into your computer, make sure that your computer recognizes the device (type in `adb devices`), and run: `react-native run-android`.

Again, static builds for Android haven't been compiled yet, but further instructions are [here](http://facebook.github.io/react-native/docs/running-on-device.html).

##### Building Android

The application most easily builds with:

- Android Studio 3.1 (https://developer.android.com/studio/archive)
- Android SDK Build Tools v27.0.3
- gradle 4.4 (as defined in https://github.com/OB1Company/native-bazaar/blob/develop/android/gradle/wrapper/gradle-wrapper.properties)
- Java 1.8 (http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

##### Using gradle to run app on-device

From the repository root, perform the following steps:

1. Ensure your device is available
```
$ adb devices
List of devices attached
8AAX0P48U       device
```
2. `cd ./android`
3. `./gradlew clean`
4. `./gradlew installRelease`
5. Find the application installed on your device.


### Main libraries used:
redux, redux-saga, react-native-navigation, typescript.

### Troubleshooting

#### `./gradlew clean` produces `java.lang.NullPointerException`

```
> Configure project :react-native-webview
FAILURE: Build failed with an exception.

* What went wrong:
A problem occurred configuring project ':react-native-webview'.
> java.lang.NullPointerException (no error message)
```

This typically occurs when the wrong Java version is used. The expected version for Java is 1.8. [See this StackOverflow question for help switching to 1.8](https://stackoverflow.com/questions/46513639/how-to-downgrade-java-from-9-to-8-on-a-macos-eclipse-is-not-running-with-java-9).

#### Missing modules

If you get an error like this:

```
While resolving module `react-native-vector-icons/Ionicons`, the Haste package `react-native-vector-icons` was found. However the module `Ionicons` could not be found within the package.
```

Type into the terminal: `rm ./node_modules/react-native/local-cli/core/__fixtures__/files/package.json`
