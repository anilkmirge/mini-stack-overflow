const mongoose = require('../db/connection');

const MiniStackOSchema = new mongoose.Schema({
	title: String,
	description: String,
	date: { type: Date, default: Date.now },
	answers: [
		{
			title: String,
			vote: { type: Number, default: 0 },
			date: { type: Date, default: Date.now },
		},
	],
});

const MiniStack = mongoose.model('MiniStack', MiniStackOSchema);

module.exports = MiniStack;
