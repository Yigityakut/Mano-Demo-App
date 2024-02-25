import {StyleSheet} from 'react-native';
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import Colors from './src/assets/Colors';

const App = () => {
  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
        <Toast />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.green,
  },
});
