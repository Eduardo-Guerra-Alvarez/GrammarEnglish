import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';

import VerbsList from './screens/verbsList';
import AddVerb from './screens/AddVerb';
import VerbDetail from './screens/VerbDetail';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="VerbsList" component={VerbsList} options={{title: 'Lista de Verbos'}}/>
      <Stack.Screen name="AddVerb" component={AddVerb} options={{title: 'Agregar Verbo'}}/>
        <Stack.Screen name="VerbDetail" component={VerbDetail} options={{title: 'Ver Verbo'}} />
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