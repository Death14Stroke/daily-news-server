const express = require('express');
const bodyParser = require('body-parser');
const newsRoutes = require('./routes/newsRoutes');

const app = express();

//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(newsRoutes);
app.disable('etag');

app.get('/', (req, res) => {
	res.send('Welcome to daily news!');
});

app.listen(3000, () => {
	console.log('Listening on port 3000');
});
