/* eslint-disable class-methods-use-this */
import { NativeModules } from 'react-native';

const { ServerBridge } = NativeModules;

class ServerBridgeNativeModule {
  static start() {
    return ServerBridge.start();
  }

  static stop() {
    return ServerBridge.stop();
  }

  static downloadFromCloudContentUri(zipUri) {
    return ServerBridge.downloadFromCloudContentUri(zipUri);
  }

  static EXAMPLE_CONSTANT = ServerBridge.EXAMPLE_CONSTANT
}

export default ServerBridgeNativeModule;
