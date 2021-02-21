const express = require('express');
const news = require('../api/news');
const categories = require('../data/categories');
const highlights = require('../dummy/highlights.json');
const recents = require('../dummy/recents.json');

const router = express.Router();

router.get('/categories', (req, res) => {
	const response = {
		categories
	};
	res.send(response);
});

router.get('/highlights', async (req, res) => {
	const { country, page, pageSize, category } = req.query;
	console.log('get highlights:', country, category, page, pageSize);

	res.send(highlights);

	// try {
	// 	let {data} = await news.get('/top-headlines', {
	// 		params: {
	// 			country,
	//			category,
	// 			page,
	// 			pageSize
	// 		}
	// 	});
	// 	console.log(data);
	// 	res.send(data);
	// } catch (err) {
	// 	return res.status(422).send('Could not fetch news');
	// }
});

router.get('/recents', async (req, res) => {
	const { country } = req.query;

	// try {
	// 	const results = await Promise.all(
	// 		categories.map(category => getTopHighlight({ category, country }))
	// 	);
	// 	const response = {
	// 		recents: results.map((result, index) => {
	// 			return {
	// 				category: capitalize(categories[index]),
	// 				...result.data.articles[0]
	// 			};
	// 		})
	// 	};
	// 	console.log(response);
	// 	res.send(response);
	// } catch (err) {
	// 	console.log(err);
	// 	return res.status(422).send('Could not fetch news');
	// }

	res.send(recents);
});

router.get('/sources', async (req, res) => {
	const { country, category, language } = req.query;

	try {
		const { data } = await news.get('/sources', {
			params: {
				//country,
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

const getTopHighlight = ({ category, country }) => {
	return news.get('/top-headlines', {
		params: {
			country,
			category,
			pageSize: 1
		}
	});
};

const capitalize = str => {
	return str[0].toUpperCase() + str.slice(1);
};

module.exports = router;
