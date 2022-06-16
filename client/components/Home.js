import React, { useEffect, useState } from 'react'
import { View, Text, Button, Image, TouchableOpacity } from 'react-native'
import { Exit } from '../actions/AuthenticationActions'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from 'axios'
import { end_point } from '../EndPoint'
import { StyleSheet } from 'react-native'
import PopupInput from '../lib/PopupInput'


const Home = ({ navigation }) => {

    let dispatch = useDispatch()

    let [UserData, setUserData] = useState([])
    let [status_popup, setStatus_popup] = useState(false)


    const GetUser = () => {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem('username_email').then((user) => {
                axios.post(end_point + "user_data", {
                    username: user
                }).then((res) => {
                    if (res.data.success) {
                        resolve(res.data.user_data)
                    }
                })
            })
        })
    }


    const AllApi = async () => {
        let user = await GetUser()
        setUserData(user)
    }


    useEffect(() => {
        AllApi()
    }, [])

    const Hello = (grade, chooseClass) => {
        navigation.navigate("TEACHER_HOME", { grade: grade, classes: chooseClass })
    }

    return (
        <View style={styles.container}>

            <View style={styles.decorate}>
                {status_popup ? <PopupInput goto={Hello} status={setStatus_popup} /> : null}
            </View>



            {UserData && UserData.length > 0 ? UserData[0].role === 1 ?
                <View>

                    <Text style={styles.head_text}>Teacher Method</Text>

                    <TouchableOpacity onPress={() => {
                        // navigation.navigate('TEACHER_HOME')
                        setStatus_popup(true)
                    }}>
                        <Image style={styles.size_img} source={require('../images/class.png')} />
                        <View style={styles.cap}>
                            <Text style={styles.cap_text}>เช็คชื่อเข้าเรียน</Text>
                        </View>
                    </TouchableOpacity>


                </View> :
                <View>

                    <Text style={styles.head_text}>Students Method</Text>

                    <TouchableOpacity onPress={() => {
                        navigation.navigate('STUDENT_HOME')
                    }}>
                        <Image style={styles.size_img} source={require('../images/check.jpg')} />
                        <View style={styles.cap}>
                            <Text style={styles.cap_text}>เช็คคะเเนน</Text>
                        </View>
                    </TouchableOpacity>

                </View> : null}

            <TouchableOpacity style={{width: '100%', backgroundColor: 'firebrick', height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 5, position: 'absolute', bottom: 20, alignSelf: 'center'}} onPress={() => {
                dispatch(Exit())
            }}><Text style={{fontFamily: 'Prompt-Regular', color: 'white', fontSize: 20}}>ออกจากระบบ</Text></TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    size_img: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'black'
    },
    container: {
        padding: 20,
        flex: 1
    },
    head_text: {
        color: 'black',
        fontFamily: 'Prompt-Regular',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20
    },
    decorate: {
        position: 'absolute',
        flex: 1,
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        alignSelf: 'center',
        width: '100%'
        
    },
    cap: {
        backgroundColor: 'white',
        position: 'absolute',
        width: '100%',
        height: 30,
        top: '45%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: 1,
        borderRightWidth: 1,
    },
    cap_text: {
        fontSize: 20,
        fontFamily: 'Prompt-Regular',
        color: 'black'
    },
})

export default Home