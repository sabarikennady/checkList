import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ChecklistScreen from './src/screens/ChecklistScreen';
import PreDepartureChecklistScreen from './src/screens/PreDepartureChecklistScreen';
import ChecklistItemsScreen from './src/screens/ChecklistItemsScreen';

import {ChecklistProvider} from './src/context/ChecklistContext';

const Stack = createStackNavigator();

const App = () => {
  return (
    <ChecklistProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={({navigation}) => ({
            headerTitleAlign: 'center',
            headerStyle: {backgroundColor: '#ECEEF0'},
            headerLeft: () =>
              navigation.canGoBack() && (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{marginLeft: 10}}>
                  <Icon name="chevron-back" size={24} color="black" />
                </TouchableOpacity>
              ),
          })}>
          <Stack.Screen name="Checklists" component={ChecklistScreenWrapper} />
          <Stack.Screen
            name="PreDepartureChecklistScreen"
            component={PreDepartureChecklistScreenWrapper}
          />
          <Stack.Screen
            name="ChecklistItemsScreen"
            component={ChecklistItemsScreenWrapper}
            options={{headerTitle: '', headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ChecklistProvider>
  );
};

const ChecklistScreenWrapper = props => (
  <View style={styles.screen}>
    <ChecklistScreen {...props} />
  </View>
);

const ChecklistItemsScreenWrapper = props => (
  <View style={styles.screen}>
    <ChecklistItemsScreen {...props} />
  </View>
);

const PreDepartureChecklistScreenWrapper = props => (
  <View style={styles.screen}>
    <PreDepartureChecklistScreen {...props} />
  </View>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ECEEF0',
  },
});

export default App;
