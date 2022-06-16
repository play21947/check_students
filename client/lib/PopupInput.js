import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { StyleSheet } from 'react-native'

const PopupInput = ({ goto, status }) => {



    let all_grade = [1, 2, 3, 4, 5, 6];
    let all_class = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    let [grade, setGrade] = useState(all_grade[0]) // This is grade of school
    let [numberClass, setNumberClass] = useState(all_class[0]) // This is number of grade

    let [status_choose, setStatus_choose] = useState(false)
    let [status_class, setStatus_class] = useState(false)

    return (
        <View>

            <ScrollView style={{zIndex: 3}}>

                <View style={styles.popup}>

                    <TouchableOpacity onPress={() => {
                        status(false)
                    }}>
                        <Text>X</Text>
                    </TouchableOpacity>

                    <Text style={styles.text_header}>เลือกห้อง</Text>

                    <View style={styles.flexrow}>

                        <View style={styles.flexcol}>

                            <View style={styles.flexrow}>
                                <Text style={styles.text_class}>มัธยม : </Text>
                                <TouchableOpacity onPress={() => {
                                    setStatus_choose(!status_choose)
                                }} style={styles.box}>
                                    <Text style={styles.text}>{grade}</Text>
                                </TouchableOpacity>
                            </View>


                            {status_choose ? <View style={{ display: 'flex', flexDirection: 'column' }}>
                                {all_grade.map((item, index) => {
                                    return (
                                        <View style={{ marginTop: 5 }} key={index}>
                                            {grade === item ? <TouchableOpacity onPress={() => {
                                                setGrade(item)
                                                setStatus_choose(false)
                                            }} style={styles.box_black}>
                                                <Text style={styles.text}>{item}</Text>
                                            </TouchableOpacity> : <TouchableOpacity onPress={() => {
                                                setGrade(item)
                                                setStatus_choose(false)
                                            }} style={styles.box}>
                                                <Text style={styles.text}>{item}</Text>
                                            </TouchableOpacity>}
                                        </View>
                                    )
                                })}
                            </View> : null}

                        </View>

                        <View style={styles.flexcol}>
                            <View style={styles.flexrow}>
                                <Text style={styles.text_class}>ห้อง : </Text>
                                <TouchableOpacity onPress={() => {
                                    setStatus_class(!status_class)
                                }} style={styles.box}>
                                    <Text style={styles.text}>{numberClass}</Text>
                                </TouchableOpacity>
                            </View>

                            {status_class ? <View style={{ display: 'flex', flexDirection: 'column' }}>
                                {all_class.map((item, index) => {
                                    return (
                                        <View style={{ marginTop: 5 }} key={index}>
                                            {numberClass === item ? <TouchableOpacity onPress={() => {
                                                setNumberClass(item)
                                                setStatus_choose(false)
                                            }} style={styles.box_black}>
                                                <Text style={styles.text}>{item}</Text>
                                            </TouchableOpacity> : <TouchableOpacity onPress={() => {
                                                setNumberClass(item)
                                                setStatus_class(false)
                                            }} style={styles.box}>
                                                <Text style={styles.text}>{item}</Text>
                                            </TouchableOpacity>}
                                        </View>
                                    )
                                })}
                            </View> : null}

                        </View>
                    </View>

                    <TouchableOpacity onPress={() => {
                        goto(grade, numberClass)
                        status(false)
                    }} style={styles.btn}>
                        <Text style={styles.text}>เช็ครายชื่อ</Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>


        </View>
    )
}


const styles = StyleSheet.create({
    popup: {
        backgroundColor: 'white',
        width: '100%',
        zIndex: 2,
        borderRadius: 8,
        padding: 10,
        justifyContent: 'center',
        borderWidth: 1
    },
    flexrow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    text: {
        fontFamily: 'Prompt-Regular',
        fontSize: 18,
        color: 'white'
    },
    text_class: {
        fontFamily: 'Prompt-Regular',
        fontSize: 16,
        color: 'black'
    },
    text_header: {
        fontFamily: 'Prompt-Medium',
        fontSize: 20,
        marginBottom: 50,
        textAlign: 'center',
        color: 'black'
    },
    box: {
        backgroundColor: 'mediumseagreen',
        width: 50,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
    box_black: {
        backgroundColor: '#1a1a1a',
        width: 50,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
    flexcol: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
    btn: {
        backgroundColor: 'mediumseagreen',
        width: '80%',
        height: 50,
        alignSelf: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        borderRadius: 8
    }
})


export default PopupInput