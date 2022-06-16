import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { LoadedScreen } from '../actions/AuthenticationActions'
import { AutoSignIn } from '../actions/AuthenticationActions'

const LoadingScreen = () => {

    let dispatch = useDispatch()


    useEffect(() => {

        dispatch(AutoSignIn())

        setTimeout(() => {
            dispatch(LoadedScreen())
        }, 1000)
    }, [])

    return (
        <View>
            <Text>Loading...</Text>
        </View>
    )
}


export default LoadingScreen