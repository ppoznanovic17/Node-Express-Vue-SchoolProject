const express = require('express');
const auth = require('./routes/auth');
const home = require('./routes/home');
const profile = require('./routes/profile');
const welcome = require('./routes/welcome');
const history = require('connect-history-api-fallback');
const path = require('path');


const app = express();


app.use('/auth' , auth);
app.use('/home' , home);
app.use('/wel' , welcome);

app.use('/profile' , profile);

const staticMiddleware = express.static(path.join(__dirname, 'dist'));

app.use(staticMiddleware);
app.use(history());
app.use(staticMiddleware);

app.listen(8080);


