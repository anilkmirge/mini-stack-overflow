const MiniStack = require('../models/schema');
const express = require('express');

const router = express.Router();

// **index operation**: Will process GET requests on `/questions`
router.get('/', (req, res) => {
	MiniStack.find({})
		.then((questions) => {
			console.log('questions ', questions);
			res.render('index', {
				questions,
				heading: 'Popular Questions',
			});
		})
		.catch((err) => console.log(err));
});

// The show operation will display a single resource
// Will process GET requests on `/questions/someid`
router.get('/:id', (req, res) => {
	MiniStack.findById(req.params.id)
		.then((question) => {
			res.render('show', question);
		})
		.catch(console.error);
});

// Will process GET requests on `/questions/someid/edit`
// router.get('/:id/edit', (req, res) => {
//     MiniStack.findById(req.params.id).then((question) => {
// 			res.render('edit', question);
// 		});
// });

module.exports = router;
