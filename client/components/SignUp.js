import axios from 'axios'
import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { end_point } from '../EndPoint'


const SignUp = () => {

    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [confirmPassword, setConfirmPassword] = useState('')

    return (
        <View style={{ padding: 10, flex: 1, display: 'flex', justifyContent: 'center', }}>

            <Text  style={{ fontFamily: 'Prompt-Medium', color: 'firebrick', fontSize: 20, marginBottom: 20 }}>กำลังพัฒนา...(ยังไม่สามารถ สมัครสมาชิกได้)</Text>

            <Text style={{ fontFamily: 'Prompt-Medium', color: 'black', fontSize: 20, marginBottom: 20 }}>สมัครสมาชิก</Text>

            <View>
                <Text style={{ fontFamily: 'Prompt-Regular', color: 'black', fontSize: 16 }}>อีเมลผู้ใช้</Text>
                <TextInput onChangeText={(text) => {
                    setEmail(text)
                }} style={styles.input}></TextInput>
            </View>

            <View>
                <Text style={{ fontFamily: 'Prompt-Regular', color: 'black', fontSize: 16 }}>รหัสผ่าน</Text>
                <TextInput onChangeText={(text) => {
                    setPassword(text)
                }} style={styles.input}></TextInput>
            </View>

            <View>
                <Text style={{ fontFamily: 'Prompt-Regular', color: 'black', fontSize: 16 }}>ยืนยันรหัสผ่าน</Text>
                <TextInput onChangeText={(text) => {
                    setConfirmPassword(text)
                }} style={styles.input}></TextInput>
            </View>

            {/* <TouchableOpacity>
                <Text>เด็กชาย</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>เด็กหญิง</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text>นาย</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>นาง</Text>
            </TouchableOpacity> */}

            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ width: '45%', marginTop: 5 }}>
                    <Text style={{ fontFamily: 'Prompt-Regular', color: 'black', fontSize: 16 }}>ชื่อ</Text>
                    <TextInput style={styles.input2}></TextInput>
                </View>

                <View style={{width: '50%', marginTop: 5}}>
                    <Text style={{ fontFamily: 'Prompt-Regular', color: 'black', fontSize: 16 }}>นามสกุล</Text>
                    <TextInput style={styles.input2}></TextInput>
                </View>
            </View>

            <TouchableOpacity onPress={() => {
                if (!email || !password || !confirmPassword) {
                    Alert.alert("Pls put your information")
                } else {
                    if (password == confirmPassword) {
                        axios.post(end_point + 'register', {
                            email: email,
                            password: password,
                        }).then((res) => {
                            console.log(res.data)
                        })
                    } else {
                        Alert.alert("Password doesn't match")
                    }
                }
            }} style={styles.btn} >
                <Text style={{ fontFamily: 'Prompt-Regular', color: 'white', fontSize: 20 }}>สมัครสมาชิก</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 5,
        marginTop: 10,
        color: 'black',
        borderWidth: 1,
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
    input2: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 5,
        marginTop: 10,
        color: 'black',
        borderWidth: 1,
        fontFamily: 'Prompt-Regular'
    },
})

export default SignUp