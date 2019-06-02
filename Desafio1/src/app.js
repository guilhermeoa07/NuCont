const express = require('express');
const bodyParser = require('body-parser');
const normalizePort = require('normalize-port');
const config = require('./app/config/config.json');
const port = normalizePort(process.env.PORT || '3000');

require('./app/database/Database')(config.database);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.status(200).sendFile(__dirname + '/app/html/index.html');
});

//Controllers
require('./app/controller/Transform')(app);
require('./app/controller/User')(app);

app.listen(port, () => {
	console.log('API rodando na porta ' + port);
});

module.exports = app;
