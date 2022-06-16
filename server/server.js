let express = require('express')
let app = express()
let cors = require('cors')
let mysql = require('mysql2')


app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'school'
})


app.get("/test", (req, res) => {
    res.json("Hello World")
})


app.post("/sign_in", (req, res) => {
    let username = req.body.username
    let password = req.body.password


    db.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, student) => {
        if (err) throw err

        // if Student exact with username and password has real

        if (student.length > 0) {
            res.json({ success: true, user_data: student })
        } else {
            res.json({ success: false })
        }

    })

})


app.post("/user_data", (req, res) => {
    let username = req.body.username

    db.query("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
        if (user.length > 0) {
            res.json({ success: true, user_data: user })
        } else {
            res.json({ success: false })
        }
    })
})


app.post("/get_students", (req, res) => {
    let grade = req.body.grade
    let classes = req.body.classes

    db.query("SELECT * FROM users WHERE grade = ? AND classes = ?", [grade, classes], (err, AllStudents) => {
        res.json(AllStudents)
    })
})


app.post('/user', (req, res) => {
    let username_email = req.body.username_email

    db.query("SELECT * FROM users WHERE username = ?", [username_email], (err, rs) => {
        if (err) throw err

        res.json(rs)
    })
})


app.post("/check", (req, res) => {
    let username_id = req.body.username_id
    let name_btn = req.body.name_btn

    let column = ['come', 'late', 'jump', 'sick']

    console.log("check")


    db.query("UPDATE users SET come = 0, late = 0, jump = 0, sick = 0 WHERE username = ?", [username_id], (err, rs1) => {
        if (err) throw err

        console.log("RESET ALL")
        db.query("UPDATE users SET " + name_btn + " = ? WHERE username = ?", [1, username_id], (err, rs2) => {
            if (err) throw err

            res.json("Success")
        })
    })
})


app.post('/myself', (req, res) => {
    let username_email = req.body.username_email

    db.query("SELECT * FROM users WHERE username = ?", [username_email], (err, rs) => {
        if (err) throw err

        res.json(rs)
    })
})


app.post("/students_check", (req, res) => {
    let grade = req.body.grade
    let classes = req.body.classes
    let username_email = req.body.username_email
    let subject = req.body.subject

    db.query("SELECT * FROM users WHERE grade = ? AND classes = ?", [grade, classes], (err, rs) => {
        if (err) throw err

        // let come_count = rs.reduce((count, item)=>{
        //     return count + item.come
        // }, 0)

        // let late_count = rs.reduce((count, item)=>{
        //     return count + item.late
        // }, 0)

        // let jump_count = rs.reduce((count, item)=>{
        //     return count + item.jump
        // }, 0)

        // let sick_count = rs.reduce((count, item)=>{
        //     return count + item.sick
        // }, 0)

        let come_count = rs.filter((item) => {
            return item.come == 1
        })

        let late_count = rs.filter((item) => {
            return item.late == 1
        })

        let jump_count = rs.filter((item) => {
            return item.jump == 1
        })

        let sick_count = rs.filter((item) => {
            return item.sick == 1
        })

        console.log(rs)

        if (late_count) {
            late_count.map((item) => {
                let score = item.score
                score = score - 5

                db.query("UPDATE users SET score = ? WHERE username = ?", [score, item.username], (err, rs2) => {
                    if (err) throw err

                    console.log("Updated")
                })
            })
        }

        if (jump_count) {
            jump_count.map((item) => {
                let score = item.score
                score = score - 10

                db.query("UPDATE users SET score = ? WHERE username = ?", [score, item.username], (err, rs2) => {
                    if (err) throw err

                    console.log("Updated")
                })
            })
        }

        // 0 => come
        // 1 => late
        // 2 => jump
        // 3 => sick

        rs.map((items) => {
            if (items.come == 1) {
                db.query("INSERT INTO log(username_email, subject, status) VALUES (?, ?, ?)", [items.username, subject, 0], (err, rs) => {

                    if(err) throw err

                    console.log("Succeess")
                })
            } else if (items.late == 1) {
                db.query("INSERT INTO log(username_email, subject, status) VALUES (?, ?, ?)", [items.username, subject, 1], (err, rs) => {

                    if(err) throw err
                    console.log("Succeess")
                })
            } else if (items.jump == 1) {
                db.query("INSERT INTO log(username_email, subject, status) VALUES (?, ?, ?)", [items.username, subject, 2], (err, rs) => {

                    if(err) throw err
                    console.log("Succeess")
                })
            } else if (items.sick == 1) {
                db.query("INSERT INTO log(username_email, subject, status) VALUES (?, ?, ?)", [items.username, subject, 3], (err, rs) => {

                    if(err) throw err
                    console.log("Succeess")
                })
            }
        })


        // Reset Then Updated Data Check Students

        db.query("UPDATE users SET come = 0, late = 0, jump = 0, sick = 0", (err, rs) => {
            if (err) throw err

            res.json({success: true})
        })



    })
})


app.post("/log_user", (req, res)=>{

    let username_email = req.body.username_email
    console.log("username : ", username_email)

    db.query("SELECT * FROM log WHERE username_email = ? ORDER BY id DESC", [username_email], (err, rs)=>{
        if(err) throw err

        res.json(rs)
    })
})


app.post("/register", (req, res)=>{
    let email = req.body.email
    let password = req.body.password

    db.query("SELECT * FROM users WHERE username = ?", [email], (err, rs)=>{
        if(err) throw err

        if(rs.length > 0){
            res.json({success: false})
        }else[
            db.query("INSERT INTO (username, password, prefix, pre_name, last_name, role, grade, classes, subject, score, come, late, jump, sick) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [email, password])
        ]
    })
})


app.listen(3001, () => {
    console.log("Server is running on port 3001")
})