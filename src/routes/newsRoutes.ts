import express, { Request } from 'express';
import { AxiosPromise } from 'axios';
import news from '../api/news';
import categories from '../data/categories';
import { capitalize } from '../utils/strings';

type HighlightParams = { country: string; category: string };

const router = express.Router();

router.get('/highlights', async (req, res) => {
	const { country, page, pageSize, category } = req.query;

	try {
		let { data } = await news.get('/top-headlines', {
			params: {
				country,
				category,
				page,
				pageSize
			}
		});
		res.send(data);
	} catch (err) {
		console.log(err);
		return res.status(422).send('Could not fetch news');
	}
});

router.get('/recents', async (req: Request, res) => {
	const { country } = req.query;

	if (typeof country !== 'string') {
		return res.status(422).send('Invalid or missing arguments');
	}

	try {
		const results = await Promise.all(
			categories.map(category => getTopHighlight({ category, country }))
		);
		const response = {
			recents: results.map((result, index) => {
				return {
					category: capitalize(categories[index]),
					...result.data.articles[0]
				};
			})
		};
		res.send(response);
	} catch (err) {
		console.log(err);
		return res.status(422).send('Could not fetch news');
	}
});

router.get('/sources', async (req, res) => {
	const { country, category, language } = req.query;

	try {
		const { data } = await news.get('/sources', {
			params: {
				country,
				category,
				language
			}
		});
		res.send(data);
	} catch (err) {
		console.log(err);
		return res.status(422).send('Could not fetch news');
	}
});

router.get('/search', async (req, res) => {
	const { query, language, page, pageSize } = req.query;

	try {
		const { data } = await news.get('/everything', {
			params: {
				q: query,
				language,
				page,
				pageSize
			}
		});
		res.send(data);
	} catch (err) {
		console.log(err);
		return res.status(422).send('Could not fetch news');
	}
});

const getTopHighlight = ({
	category,
	country
}: HighlightParams): AxiosPromise => {
	return news.get('/top-headlines', {
		params: {
			country,
			category,
			pageSize: 1
		}
	});
};

export default router;
