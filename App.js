import { AppLoading, Asset, Font, Icon } from "expo";
import React, { Component } from "react";
import {
  ActivityIndicator,
  Platform,
  StatusBar,
  StyleSheet,
  View
} from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import AppNavigator from "./navigation/AppNavigator";
import { persistor, store } from "./redux/store";

export default class App extends Component {
  state = {
    isLoadingComplete: false
  };

  showLoading = () => (
    <View>
      <ActivityIndicator size="large" />
    </View>
  );

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={this.showLoading()}>
            <View style={styles.container}>
              {Platform.OS === "ios" && <StatusBar barStyle="default" />}
              <AppNavigator />
            </View>
          </PersistGate>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      // Asset.loadAsync([
      //   require("./assets/images/robot-dev.png"),
      //   require("./assets/images/robot-prod.png")
      // ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font
      })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
