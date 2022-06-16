import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import { applyMiddleware, createStore } from 'redux'
import AllReducers from './AllReducers'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import Home from './components/Home'
import {useSelector} from 'react-redux'
import LoadingScreen from './components/LoadingScreen'
import TeacherHome from './components/TeacherHome'
import StudentsHome from './components/StudentsHome'


let Stack = createNativeStackNavigator()

let store = createStore(AllReducers, applyMiddleware(thunk))



const App = () => {


  let user = useSelector((state)=>{
    return state.authenticate.user
  })

  let loading_screen = useSelector((state)=>{
    return state.authenticate.loading_screen
  })

  console.log("Loading Screen : ", loading_screen)
  // console.log("User : ", user)

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!loading_screen ? <Stack.Screen name='LOADING' component={LoadingScreen}></Stack.Screen> : !user || user == null ? <Stack.Screen name='SIGN_IN' component={SignIn} options={{ headerShown: false }}></Stack.Screen> : <Stack.Screen name='HOME' component={Home} options={{headerShown: false}}></Stack.Screen>}
        <Stack.Screen name='SIGN_UP' component={SignUp} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name='TEACHER_HOME' component={TeacherHome} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name='STUDENT_HOME' component={StudentsHome} options={{headerShown: false}}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const Warp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}


export default Warp