import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { StyleSheet } from 'react-native'
import { SignInAction } from '../actions/AuthenticationActions'
import { useDispatch, useSelector } from 'react-redux'

const SignIn = ({navigation}) => {

    let dispatch = useDispatch()

    let user = useSelector((state) => {
        return state.authenticate.user
    })

    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')

    return (
        <View style={styles.container}>

            <Text style={styles.header}>SCHOOL APPLICATION</Text>

            <Text style={styles.bottom_header}>Sanpatong Wittayakom school</Text>

            <View style={styles.decorate_input}>
                <Text style={styles.head_input}>Email</Text>
                <TextInput onChangeText={(text) => {
                    setUsername(text)
                }} style={styles.input} placeholder='2718x@svk.ac.th' />
            </View>

            <View>
                <Text style={styles.head_input}>Password</Text>
                <TextInput onChangeText={(text) => {
                    setPassword(text)
                }} style={styles.input} placeholder='123456' />
            </View>

            <TouchableOpacity onPress={() => {
                if (!username || !password) {
                    Alert.alert("please put your id")
                } else {
                    dispatch(SignInAction(username, password))
                    console.log(user)
                }
            }} style={styles.btn}>
                <Text style={styles.btn_text}>เข้าสู่ระบบ</Text>
            </TouchableOpacity>

            <View style={{display: 'flex', flexDirection: 'row', marginTop: 10}}>
                <Text style={{fontFamily: 'Prompt-Regular', color: 'black'}}>Don't have an account ?</Text>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate("SIGN_UP")
                }}>
                    <Text style={{fontFamily: 'Prompt-Regular', color: 'skyblue'}}>SignUp</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    header: {
        color: 'black',
        fontSize: 26,
        fontFamily: 'Prompt-Medium'
    },
    bottom_header: {
        color: 'gray',
        fontFamily: 'Prompt-Regular',
        marginBottom: 20
    },
    input: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 5,
        marginTop: 10,
        color: 'black',
        borderWidth: 1,
        fontFamily: 'Prompt-Regular'
    },
    head_input: {
        marginTop: 10,
        color: 'black',
        fontFamily: 'Prompt-Regular'
    },
    btn: {
        width: '100%',
        height: 50,
        backgroundColor: '#64AD75',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        marginTop: 20
    },
    btn_text: {
        color: 'white',
        fontFamily: 'Prompt-Regular',
        fontSize: 20
    }

})

export default SignIn