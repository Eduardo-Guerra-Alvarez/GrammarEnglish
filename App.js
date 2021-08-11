import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';

import VerbsList from './screens/VerbsList';
import AddVerb from './screens/AddVerb';
import VerbDetail from './screens/VerbDetail';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="VerbsList" component={VerbsList} 
      options={{
      title: 'Lista de Verbos',
      headerTitleAlign: 'center',
      style: {
        borderBottomWidth: 0,
        elevation: 0
      },
      headerStyle: {
        backgroundColor: '#292929',
        shadowColor: 'transparent'
      },
      headerTintColor: '#fff'
      }}/>
      <Stack.Screen name="AddVerb" component={AddVerb} 
      options={{title: 'Agregar Verbo',
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#292929',
      },
      headerTintColor: '#fff'
    }}/>
        <Stack.Screen name="VerbDetail" component={VerbDetail} 
        options={{title: 'Ver Verbo',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#292929',
        },
        headerTintColor: '#fff'
        }} />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}

export default App;