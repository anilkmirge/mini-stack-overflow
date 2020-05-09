const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mini-stack', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

module.exports = mongoose;
