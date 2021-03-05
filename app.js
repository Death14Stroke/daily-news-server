const express = require('express');
const bodyParser = require('body-parser');
const newsRoutes = require('./src/routes/newsRoutes');

const app = express();

app.use(bodyParser.json());
app.use(newsRoutes);

app.get('/', (_, res) => {
	res.send('Welcome to daily news!');
});

app.listen(process.env.PORT || 3000, () => {
	console.log('Listening on port 3000');
});
