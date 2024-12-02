const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user');
const app = express();
require('dotenv').config();
const mongoURI = process.env.MONGO_URI;

const connectDb = async()=>{
    try {
        await mongoose.connect(mongoURI)
        console.log('mongodb is connected')
    } catch (error) {
        console.error(error.message)
        process.exit(1)
    }
}
    connectDb();

app.set('view engine','ejs');
app.set('views','views');

app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('This is the Home Page!!!')
});

app.get('/register',(req, res) => {
    res.render('register')
});

app.post('/register', async (req, res) => {
    const {username,password} = req.body;
    const hash = await bcrypt.hash(password,12);
    const user = User({
        username,
        password: hash
    })
    await user.save();
    res.redirect('/');
})
app.get('/login',(req, res) => {
    res.render('login')
});

app.post('/login', async(req, res) => {
    const {username,password} = req.body;
    const user = await User.findOne({username});
    const validPassword = await bcrypt.compare(password,user.password);
    if(validPassword){
        res.send('Welcome to the home');
    } else{
        res.send('try again');
    }
});


app.get('/secret', (req,res) => {
    res.send('It is a Secret!!');
});

app.listen(1000, () => {
    console.log('App is Starting');
})