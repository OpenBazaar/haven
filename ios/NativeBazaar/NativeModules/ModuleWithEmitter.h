#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface ModuleWithEmitter : RCTEventEmitter <RCTBridgeModule>
+ (void)emitEventWithName:(NSString *)name andPayload:(NSDictionary *)payload;
@end
