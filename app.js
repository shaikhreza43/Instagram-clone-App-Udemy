const express = require('express');
const mongoose = require('mongoose');
const { ATLAS_URI } = require('./config/keys');

const app = express();//initialize express

const PORT = 5555;

// mongoose.connect(ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => { console.log('Successfully connected to Mongodb Atlas'); })
//     .catch((err) => { console.log('error ' + err) });


mongoose.connect(ATLAS_URI,{useNewUrlParser:true,useUnifiedTopology:true});
mongoose.connection.on('connected',()=>{
    console.log('Successfully Connected to mongo db atlas');
});

mongoose.connection.on('error',(err)=>{
    console.log('Error Connecting to Mongo DB Atlas '+err);
});

require('./models/user');
require('./models/posts');

app.use(express.json());

app.use(require('./routes/user-routes'));
app.use(require('./routes/posts-routes'));


const someMiddleWare = (req, res, next) => {
    console.log('Some Middleware!');
    next();
}

app.use(someMiddleWare);


app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Instagram App.' });
});

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})