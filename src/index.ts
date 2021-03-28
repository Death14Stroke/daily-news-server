import express from 'express';
import newsRoutes from './routes/newsRoutes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(newsRoutes);

app.listen(3000, () => {
	console.log('Listening on port 3000');
});
