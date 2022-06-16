import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { end_point } from '../EndPoint'

const StudentsHome = () => {

    let [user, setUser] = useState([])
    let [log, setLog] = useState([])


    let get_myself = () => {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem("username_email").then((username) => {
                axios.post(end_point + 'user', {
                    username_email: username
                }).then((res) => {
                    resolve(res.data)
                })
            })
        })
    }

    const get_myLog = () => {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem('username_email').then((username) => {
                axios.post(end_point + 'log_user', {
                    username_email: username
                }).then((res) => {
                    console.log("LOG : ", res.data)
                    resolve(res.data)
                })
            })
        })
    }

    const RunApi = async () => {
        let myself = await get_myself()
        setUser(myself)
        let mylog = await get_myLog()
        setLog(mylog)
    }


    useEffect(() => {
        RunApi()
    }, [])

    return (
        <View>

            <View style={styles.header_box}>
                <Text style={styles.header_box_text}>ข้อมูลส่วนตัว</Text>
            </View>


            {user && user.length > 0 ? <View style={styles.container}>
                <View>
                    <Text style={styles.text}>ชื่อ : {user[0].pre_name} {user[0].last_name}</Text>
                    <Text style={styles.text}>รหัสประจำตัว : {user[0].username.split('@')[0]}</Text>
                    <Text style={{fontFamily: 'Prompt-Regular', fontSize: 18, color: 'green'}}>คะแนนความประพฤติ : {user[0].score}</Text>
                </View>
            </View> : null}

            <ScrollView style={styles.box}>
                <Text style={{fontFamily: 'Prompt-Medium', color: 'white', fontSize: 20}}>LOG</Text>
                {log && log.length > 0 ? log.map((item, index) => {
                    return (
                        <View key={index} style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                            <Text style={{fontFamily: 'Prompt-Regular', color: 'white'}}>{index+1 == 1 ? index+1 +" ล่าสุด" : index+1}</Text>
                            {item.status == 0 ? <Text style={styles.green}>เข้าเรียน : {item.subject}</Text> : item.status == 1 ? <Text style={styles.orange}>มาสาย : {item.subject} -5</Text> : item.status == 2 ? <Text style={styles.red}>หนีเรียน : {item.subject} -10</Text> : item.status == 3 ? <Text style={styles.green}>ลากิจ/ป่วย</Text> : null}
                        </View>
                    )
                }) : null}
            </ScrollView>

        </View>
    )
}

let styles = StyleSheet.create({
    header_box: {
        backgroundColor: 'mediumseagreen',
        width: 300,
        height: 50,
        display: 'flex',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6
    },
    header_box_text: {
        fontFamily: 'Prompt-Regular',
        color: 'white',
        fontSize: 20
    },
    container: {
        padding: 10
    },
    text: {
        fontFamily: 'Prompt-Regular',
        color: 'black',
        fontSize: 18
    },
    green: {
        fontFamily: 'Prompt-Regular',
        color: 'mediumseagreen',
        fontSize: 16,
        marginTop: 5
    },
    red: {
        fontFamily: 'Prompt-Regular',
        color: '#ef4444',
        fontSize: 16,
        marginTop: 5
    },
    orange: {
        fontFamily: 'Prompt-Regular',
        color: 'orange',
        fontSize: 16,
        marginTop: 5
    },
    box:{
        padding: 10,
        backgroundColor: '#1a1a1a',
        height: '100%'
    }
})

export default StudentsHome