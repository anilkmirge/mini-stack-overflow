const MiniStack = require('../models/schema');
const seedData = require('./seeds.json');

MiniStack.deleteMany()
	.then(() => {
		return MiniStack.collection.insertMany(seedData);
	})
	.then(() => {
		console.log('Database created with sample data');
		process.exit();
	});

module.exports = MiniStack;
