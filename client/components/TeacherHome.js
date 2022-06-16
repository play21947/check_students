import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { View, Text, ScrollView, TouchableOpacity, Button, Alert } from 'react-native'
import { StyleSheet } from 'react-native'
import { end_point } from '../EndPoint'
import { AddChecked } from '../actions/CheckedActions'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'


const TeacherHome = ({ route }) => {

    let dispatch = useDispatch()

    let [allStudents, setAllStudents] = useState([])
    let [me, setMe] = useState([])

    let step = [
        {
            id: 0,
            title: 'มาเรียน',
        },
        {
            id: 1,
            title: 'มาสาย',
        },
        {
            id: 2,
            title: 'หนีเรียน',
        },
        {
            id: 3,
            title: 'ลาป่วย/กิจ',
        }
    ]

    let [keep, setKeep] = useState([])

    let grade = route.params.grade
    let classes = route.params.classes

    let checked = useSelector((state) => {
        return state.checkall.user_checked
    })

    console.log(checked)

    let [count, setCount] = useState(0)

    let [members, setMembers] = useState(0)

    const getMyself = () => {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem('username_email').then((user) => {
                axios.post(end_point + "myself", {
                    username_email: user
                }).then((res) => {
                    // console.log(res.data)
                    resolve(res.data)
                })
            })
        })
    }

    const getStudents = () => {
        return new Promise((resolve, reject) => {
            axios.post(end_point + "get_students", {
                grade: grade,
                classes: classes
            }).then((res) => {
                if (res.data) {
                    // console.log(res.data)
                    resolve(res.data)
                }
            })
        })
    }




    const RunApi = async () => {
        let me = await getMyself()
        setMe(me)
        let students = await getStudents()
        // console.log(students)
        setAllStudents(students)
    }

    // console.log(grade, classes)

    useEffect(() => {
        RunApi()
    }, [count])

    // 0 => มาเรียน
    // 1 => มาสาย
    // 2 => หนีเรียน
    // 3 => ลากิจ


    let tests = [
        {
            id: 0,
            title: 'come'
        },
        {
            id: 1,
            title: 'jump'
        },
    ]


    let Check = (id, name_btn) => {
        console.log("AddCheck")
        axios.post(end_point + 'check', {
            username_id: id,
            name_btn: name_btn
        }).then((res) => {
            console.log("Success")
        })
    }


    let [test, setTest] = useState(0)


    return (
        <ScrollView>

            <View style={styles.header_box}>
                <Text style={styles.header_box_text}>เช็คชื่อเข้าเรียน</Text>
            </View>

            {members ? <Text>{members}</Text> : null}

            <View style={styles.container}>


                {/* //Headers */}

                {/* //Display All Students name */}


                {me && me.length > 0 ? <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginBottom: 10 }}>
                    <Text style={{ fontFamily: 'Prompt-Regular', color: 'black', fontSize: 18 }}>มัธยมศึกษาปีที่ {grade}/{classes}</Text>
                    <View style={{ flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <Text style={{ fontFamily: 'Prompt-Regular', color: 'black', fontSize: 18 }}>ครูผู้สอน : {me[0].prefix}{me[0].pre_name} {me[0].last_name}</Text>
                        <Text style={{ fontFamily: 'Prompt-Regular', color: 'mediumseagreen', fontSize: 18 }}>วิชา : {me[0].subject ? me[0].subject : null}</Text>
                    </View>
                </View> : null}


                {allStudents && allStudents.length > 0 ? allStudents.map((item, index) => {
                    return (
                        <View key={index}>
                            <View style={styles.flexrow}>
                                <Text style={styles.text_name}>{index + 1}. {item.prefix} {item.pre_name} {item.last_name}</Text>
                                <Text style={styles.text_name}>{item.username.split('@')[0]}</Text>
                            </View>
                            <View style={styles.box_out}>
                                {item.come == 0 ? <TouchableOpacity style={styles.box_inside} onPress={() => {
                                    Check(item.username, 'come')
                                    setCount(count + 1)
                                }}><Text style={styles.text_box_inside_black}>มาเรียน</Text></TouchableOpacity> : <TouchableOpacity style={styles.btn_black}><Text style={styles.btn_black_text}>มาเรียน</Text></TouchableOpacity>}
                                {item.late == 0 ? <TouchableOpacity style={styles.box_inside} onPress={() => {
                                    Check(item.username, 'late')
                                    setCount(count + 1)
                                }}><Text style={styles.text_box_inside_black}>มาสาย</Text></TouchableOpacity> : <TouchableOpacity style={styles.btn_black}><Text style={styles.btn_black_text}>มาสาย</Text></TouchableOpacity>}
                                {item.jump == 0 ? <TouchableOpacity style={styles.box_inside} onPress={() => {
                                    Check(item.username, 'jump')
                                    setCount(count + 1)
                                }}><Text style={styles.text_box_inside_black}>โดดเรียน</Text></TouchableOpacity> : <TouchableOpacity style={styles.btn_black}><Text style={styles.btn_black_text}>โดดเรียน</Text></TouchableOpacity>}
                                {item.sick == 0 ? <TouchableOpacity style={styles.box_inside} onPress={() => {
                                    Check(item.username, 'sick')
                                    setCount(count + 1)
                                }}><Text style={styles.text_box_inside_black}>ลากิจ/ป่วย</Text></TouchableOpacity> : <TouchableOpacity style={styles.btn_black}><Text style={styles.btn_black_text}>ลากิจ/ป่วย</Text></TouchableOpacity>}
                            </View>
                        </View>
                    )
                }) : <Text>กำลังโหลดข้อมูล...</Text>}


                <TouchableOpacity onPress={() => {
                    Alert.alert("ต้องการยืนยัน?", "Do you wanna submit?", [{
                        text: 'ตกลง', onPress: () => {
                            console.log("Test : ", me[0].subject)
                            axios.post(end_point + "students_check", {
                                grade: grade,
                                classes: classes,
                                username_email: me[0].username,
                                subject: me[0].subject
                            }).then((res) => {
                                if (res.data.success) {
                                    setCount(count + 1)
                                    Alert.alert("Success")
                                }
                            })
                        }
                    }, {
                        text: 'ยกเลิก', onPress: () => {
                            console.log("cancel")
                        }
                    }])
                }} style={styles.submit_btn}><Text style={{ fontFamily: 'Prompt-Regular', color: 'white', fontSize: 18 }}>ยืนยัน</Text></TouchableOpacity>




            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    header_box: {
        backgroundColor: 'mediumseagreen',
        width: 250,
        height: 60,
        alignSelf: 'center',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header_box_text: {
        color: 'white',
        fontFamily: 'Prompt-Regular',
        fontSize: 20
    },
    text_name: {
        color: 'black',
        fontFamily: 'Prompt-Regular',
        fontSize: 18,
        marginTop: 10,
        marginBottom: 5
    },
    box_out: {
        backgroundColor: '#A1E1B0',
        height: 50,
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
        padding: 5,
        borderRadius: 5
    },
    box_inside: {
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 4
    },
    box_inside_black: {
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 4
    },
    text_box_inside_black: {
        fontFamily: 'Prompt-Regular',
        color: 'black'
    },
    text_box_inside: {
        fontFamily: 'Prompt-Regular',
        color: 'black'
    },
    flexrow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    number: {
        fontFamily: 'Prompt-Regular',
        color: 'black'
    },
    container: {
        padding: 10
    },
    box_inside_selected: {
        backgroundColor: "#1a1a1a",
    },
    text_box_inside_selected: {
        color: 'white'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    btn_black: {
        backgroundColor: '#1a1a1a',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 4
    },
    btn_black_text: {
        fontFamily: 'Prompt-Regular',
        color: 'white'
    },
    submit_btn: {
        backgroundColor: '#1a1a1a',
        borderRadius: 5,
        textAlign: 'center',
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    }
})

export default TeacherHome