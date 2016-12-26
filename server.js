const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const webpackMiddleWare = require('./webpackDevMiddleware');

const app = express();
const root = `${__dirname}/client/public`;
const port = 3000

webpackMiddleWare(app);

app.use(cookieParser());
app.use(bodyParser.json())
app.use(express.static(root));

app.listen(port, () =>{
	console.log(`Listening on: ${port}`);
});

module.exports = app;
