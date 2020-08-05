import React, { Component } from 'react';

import {
  Text,
  View,
  Animated,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';

import StatusBarWrapper from '../../status-bar';
import { primaryTextColor } from '../commonColors';
import { navHeightStyle } from '../../utils/navbar';

export const SCREEN_WIDTH = Dimensions.get('window').width;

export const DEFAULT_WINDOW_MULTIPLIER = 0.50;

const styles = {
  container: {
    flex: 1,
    borderColor: 'transparent',
  },
  scrollView: {
    backgroundColor: 'transparent',
  },
  background: {
    position: 'absolute',
    backgroundColor: 'white',
    width: SCREEN_WIDTH,
    resizeMode: 'cover',
  },
  navbarAction: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: primaryTextColor,
  },
  navBarTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
};

export default class ParallaxScrollView extends Component {
  constructor() {
    super();

    this.state = {
      scrollY: new Animated.Value(0),
    };
  }

  scrollTo(where) {
    if (!this._scrollView) {
      return;
    }
    this._scrollView.scrollTo(where);
  }

  renderBackground() {
    const {
      windowHeight, backgroundSource, onBackgroundLoadEnd, onBackgroundLoadError,
    } = this.props;
    const { scrollY } = this.state;
    if (!windowHeight || !backgroundSource) {
      return null;
    }

    return (
      <Animated.Image
        style={[
          styles.background,
          {
            height: windowHeight,
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [-windowHeight, 0, windowHeight],
                  outputRange: [windowHeight / 2, 0, -windowHeight / 3],
                }),
              },
              {
                scale: scrollY.interpolate({
                  inputRange: [-windowHeight, 0, windowHeight],
                  outputRange: [2, 1, 1],
                }),
              },
            ],
          },
        ]}
        source={backgroundSource}
        onLoadEnd={onBackgroundLoadEnd}
        onError={onBackgroundLoadError}
      />
    );
  }

  renderNavBarTitle() {
    const {
      windowHeight, backgroundSource, navBarTitleColor, navBarTitleComponent,
    } = this.props;
    const { scrollY } = this.state;
    if (!windowHeight || !backgroundSource) {
      return null;
    }

    return (
      <Animated.View
        style={{
          opacity: scrollY.interpolate({
            inputRange: [-windowHeight, windowHeight * DEFAULT_WINDOW_MULTIPLIER, windowHeight * 0.8],
            outputRange: [0, 0, 1],
          }),
        }}
      >
        {navBarTitleComponent ||
        <Text style={[styles.navBarTitle, { color: navBarTitleColor || 'white' }]}>
          {this.props.navBarTitle}
        </Text>}
      </Animated.View>
    );
  }

  rendernavBar() {
    const {
      windowHeight, backgroundSource, leftIconOnPress, rightIconOnPress, navBarColor, leftIcon: LeftIcon, rightIcon: RightIcon,
    } = this.props;

    const { scrollY } = this.state;
    if (!windowHeight || !backgroundSource) {
      return null;
    }

    const navBarActionStyle = {
      ...styles.navbarAction,
      backgroundColor: scrollY.interpolate({
        inputRange: [-windowHeight, windowHeight * DEFAULT_WINDOW_MULTIPLIER, windowHeight * 0.8],
        outputRange: ['rgba(108, 108, 108, 0.5)', 'rgba(108, 108, 108, 0.5)', 'transparent'],
      }),
    };

    const animColor = scrollY.interpolate({
      inputRange: [-windowHeight, windowHeight * DEFAULT_WINDOW_MULTIPLIER, windowHeight * 0.8],
      outputRange: ['white', 'white', 'black'],
    });

    const leftAnimView = (
      <Animated.View style={navBarActionStyle}>
        <LeftIcon animColor={animColor} />
      </Animated.View>
    );

    const rightAnimView = (
      <Animated.View style={navBarActionStyle}>
        <RightIcon animColor={animColor} />
      </Animated.View>
    );

    return (
      <Animated.View
        style={{
          ...navHeightStyle,
          width: SCREEN_WIDTH,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 6,
          backgroundColor: scrollY.interpolate({
            inputRange: [-windowHeight, windowHeight * DEFAULT_WINDOW_MULTIPLIER, windowHeight * 0.8],
            outputRange: ['transparent', 'transparent', navBarColor || 'rgba(0, 0, 0, 1.0)'],
          }),
        }}
      >
        <TouchableWithoutFeedback onPress={leftIconOnPress}>{leftAnimView}</TouchableWithoutFeedback>
        <View style={styles.titleContainer}>
          {this.renderNavBarTitle()}
        </View>
        {rightIconOnPress ? (
          <TouchableWithoutFeedback onPress={() => rightIconOnPress}>{rightAnimView}</TouchableWithoutFeedback>
        ) : (
          <Animated.View style={navBarActionStyle}>{rightAnimView}</Animated.View>
        )}
      </Animated.View>
    );
  }

  render() {
    const { style, ...props } = this.props;

    return (
      <View style={[styles.container, style]}>
        {this.renderBackground()}
        <StatusBarWrapper
          backgroundColor="white"
          barStyle="dark-content"
        />
        {this.rendernavBar()}
        <ScrollView
          ref={(component) => {
            this._scrollView = component;
          }}
          {...props}
          style={styles.scrollView}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.state.scrollY } } },
          ])}
          scrollEventThrottle={16}
        >
          {this.props.children}
        </ScrollView>
      </View>
    );
  }
}
