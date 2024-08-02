import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  // DebugInstructions,
  // Header,
  // LearnMoreLinks,
  // ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './app/views/Home.tsx';
import QouteScreen from './app/views/Qoute.tsx';
import ContactScreen from './app/views/Contact.tsx';
import HelpScreen from './app/views/Help.tsx';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (

        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{title: 'Home',headerShown: false}}
            />
            <Stack.Screen
              name="Qoute"
              component={QouteScreen}
              options={{title: 'Qoute'}}
            />
            <Stack.Screen
              name="Contact"
              component={ContactScreen}
              options={{title: 'Contact Us'}}
            />
            <Stack.Screen
              name="Help"
              component={HelpScreen}
              options={{title: 'Request Assistance'}}
            />
        </Stack.Navigator>
    </NavigationContainer>
  );

}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  background: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' or 'contain'
},
appName:{
  marginTop: 100,
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  fontSize: 34,
  fontWeight: '800',
  padding:10,
},
greetText: {
  padding: 10, // Padding around the text
  marginTop: 15,
  marginBottom: 200,
  fontSize: 24,
  fontWeight: '800',
},
});

export default App;
