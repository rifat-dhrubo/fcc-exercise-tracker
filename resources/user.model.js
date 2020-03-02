const mongoose = require('mongoose');

const user = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
});

const User = mongoose.model('user', user);

module.exports = { User };
