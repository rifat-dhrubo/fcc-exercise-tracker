const mongoose = require('mongoose');
const { User } = require('./user.model');
const exerciseLog = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: User,
	},
	description: {
		type: String,
		required: true,
	},
	duration: {
		type: Number,
		required: true,
	},

	date: {
		type: Date,
	},
});

const ExerciseLog = mongoose.model('exerciseLog', exerciseLog);

module.exports = { ExerciseLog };
