const express = require('express');
const mongoose = require('mongoose');
const { Heroku_Mongo_URI } = require('./config/keys');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();//initialize express

const PORT = process.env.PORT || 5000;

// mongoose.connect(ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => { console.log('Successfully connected to Mongodb Atlas'); })
//     .catch((err) => { console.log('error ' + err) });


mongoose.connect(Heroku_Mongo_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
    console.log('Successfully Connected to mongo db atlas');
});

mongoose.connection.on('error', (err) => {
    console.log('Error Connecting to Mongo DB Atlas ' + err);
});

require('./models/user');
require('./models/posts');

app.use(express.json());

app.get('/', (req, res) => {
    console.log('/ Route Handler executed...')
    res.status(200).json({ message: 'Welcome to My Instagram!' });
});

app.use(require('./routes/user-routes'));
app.use(require('./routes/posts-routes'));

// app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDoc));

// const someMiddleWare = (req, res, next) => {
//     console.log('Some Middleware!');
//     next();
// }

// app.use(someMiddleWare);


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})