const express = require('express')
const fs = require('fs')
const path = require('path')
let allUsers = {
    "users": [
        {
            "name": "Kolbe",
            "userId": "kolbejz",
            "email": "kolbejz@gmail.com",
            "age": "18"
        },
        {
            "name": "Kade",
            "userId": "kaderz",
            "email": "kaderz@gmail.com",
            "age": 18
        },
        {
            "name": "Zach",
            "userId": "zachtheman",
            "email": "zach@gmail.com",
            "age": 20
        }
    ]
}
fs.writeFile('users.json', JSON.stringify(allUsers), (err, data) => {
        if (err) throw err
    })
let app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    
    fs.readFile('users.json', (err, data) => {
        let users = JSON.parse(data).users
        res.render('index', {users: users})
    })
})

app.get('/create', (req, res) => {
    res.render('form')
})

app.post('/create', (req, res) => {
    let newUser = {}
    newUser.name = req.body.name
    newUser.userId = req.body.userId
    newUser.email = req.body.email
    newUser.age = req.body.age

    fs.readFile('users.json', (err, data) => {
        let users = JSON.parse(data).users
        users.push(newUser)
        fs.writeFile('users.json', JSON.stringify({users: users}), err => {
            if (err) throw err
        })
    })
    res.redirect('/')
})

app.get('/users/:index', (req, res) => {
    fs.readFile('users.json', (err, data) => {
        let user = JSON.parse(data).users[req.params.index]
        res.render('edit', {user: user, index: req.params.index})
    })
})

app.post('/edit/:index', (req, res) => {
    fs.readFile('users.json', (err, data) => {
        let users = JSON.parse(data).users
        let newObject = {
            name: req.body.name,
            userId: req.body.userId,
            email: req.body.email,
            age: req.body.age
        }
        users[req.params.index] = newObject
        fs.writeFile('users.json', JSON.stringify({users: users}), err => {
            if (err) throw err
        })
        res.redirect('/')
    })
})

app.post('/delete/:index', (req, res) => {
    fs.readFile('users.json', (err, data) => {
        let users = JSON.parse(data).users
        users.splice(req.params.index, 1)
        fs.writeFile('users.json', JSON.stringify({users: users}), err => {
            if (err) throw err
        })
        res.redirect('/')
    })
})


app.listen(3000, () => {
    console.log("Listening on port 3000.")
})