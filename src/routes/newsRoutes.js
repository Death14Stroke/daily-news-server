const express = require('express');
const news = require('../api/news');
const categories = require('../data/categories');

const router = express.Router();

router.get('/categories', (req, res) => {
	const response = {
		categories
	};
	res.send(response);
});

router.get('/highlights', async (req, res) => {
	const { country } = req.query;

	try {
		let response = await news.get('/top-headlines', {
			params: {
				country
			}
		});
		res.send(response.data);
	} catch (err) {
		return res.status(422).send('Could not fetch news');
	}
});

router.get('/category-news', async (req, res) => {
	const { country, category } = req.query;

	try {
		let response = await news.get('/top-headlines', {
			params: {
				country,
				category
			}
		});
		res.send(response.data);
	} catch (err) {
		return res.status(422).send('Could not fetch news');
	}
});

router.get('/recents', async (req, res) => {
	const { country } = req.query;
	console.log(country);

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
