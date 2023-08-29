const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/routes');

const path = require('path');

const app = express();
app.use(cors());
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.use((error, req, res, next) => {
    // console.log('<<<<<<<<<<<<IN EEEEEEEEEEEEEERRRRRRRRRRRRRRRROOOOOOOOOOOOORRRRRRRR')
    const status = error.statusCode || 500;
    const message = error.message || 'Something went wrong!';
    res.render('404', { message });
})


app.listen(3000, () => {
    console.log('Server is running, access on http://localhost:3000');
});