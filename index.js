const express = require('express');
const app = express();
const Handlebars = require('hbs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'hbs');

const methodOverride = require('method-override');

app.use(methodOverride('_method'));
const questionsController = require('./controllers/questions');

app.use('/questions', questionsController);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`App listening on port ${port}`));

Handlebars.registerHelper('trimString', function (passedString) {
	var theString = passedString.substring(0, 150);
	return new Handlebars.SafeString(theString);
});
