const MiniStack = require('../models/schema');
const express = require('express');

const router = express.Router();

// **index operation**: Will process GET requests on `/questions`
router.get('/', (req, res) => {
	MiniStack.find({})
		.then((questions) => {
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

router.post('/', (req, res) => {
	// Use create and pass it the data from our request body
	// it's already been turned into an object that we can work
	// with by the middleware we added in the index.js when we
	// added this line: `app.use(express.urlencoded({ extended: true }));`
	MiniStack.create(req.body)
		.then((question) => {
			console.log(question);
			// When the document done being created we can redirect back to the list of all todos
			res.redirect('/questions');
			// OR we can redirect to the newly updated document with:
			// res.redirect(`/questions/${question._id}`)
		})
		.catch(console.error);
});
// Use the findOneAndRemove method and use the id of from
// the request params to filter the results in the query
// Both findOneAndRemove and findOneAndUpdate will now throw deprecation
// errors, so we need to add `useFindAndModify: false` to our mongoose
// connect options in the db/connection.js file if we want that to go away.

router.post('/:id', (req, res) => {
	MiniStack.findById(req.params.id)
		.then((question) => {
			question.answers.push({ title: req.body.title });
			return question.save(question);
		})
		.then(() => {
			res.redirect(`/questions/${req.params.id}`);
		})
		.catch((error) => {
			console.log(error);
		});
});

router.put('/answers/edit/:parentId/:id/:title', (req, res) => {
	const title = req.params.title;
	console.log('title ', title);
	res.render('edit', {
		parentId: req.params.parentId,
		id: req.params.id,
		title: title,
	});
});

router.put('/answers/edit/:parentId/:id', (req, res) => {
	MiniStack.findById(req.params.parentId)
		.then((question) => {
			question.answers.map((answer) => {
				return (answer.title =
					answer.id === req.params.id ? req.body.title : answer.title);
			});
			question.save(question);
		})
		.then(() => {
			res.redirect(`/questions/${req.params.parentId}`);
		})
		.catch((error) => {
			console.log(error);
		});
});

router.delete('/answers/:parentId/:id', (req, res) => {
	MiniStack.findById(req.params.parentId)
		.then((question) => {
			const updatedAnswers = question.answers.filter((answer) => {
				return answer.id !== req.params.id;
			});
			question.answers = updatedAnswers;
			question.save(question);
		})
		.then(() => {
			res.redirect(`/questions/${req.params.parentId}`);
		})
		.catch((error) => {
			console.log(error);
		});
});

module.exports = router;
