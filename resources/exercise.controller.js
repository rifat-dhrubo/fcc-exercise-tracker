const { User } = require('./user.model');
const { ExerciseLog } = require('./exerciseLog.model');
const { theSureThing } = require('../utils/helpers');

const createUsers = async (req, res) => {
	const { userName } = req.body;

	const [err, data] = await theSureThing(User.create({ name: userName }));
	console.error(err);
	if (err) {
		res.json({
			error: err,
		});
	} else {
		res.json({
			body: data,
		});
	}
};

const getAllUsers = async (req, res) => {
	const [err, data] = await theSureThing(User.find({}).exec());

	console.error(err);
	if (err) {
		res.json({
			error: err,
		});
	} else {
		res.json(data);
	}
};

const addExerciseLog = async (req, res) => {
	const { userId, description, duration, date } = req.body;

	const [errUser, dataUser] = await theSureThing(User.findById(userId).exec());

	const [errExerciseLog, dataExerciseLog] = await theSureThing(
		ExerciseLog.create({
			user: dataUser._id,
			description: description,
			duration: Number(duration),
			date: date === '' ? new Date() : date,
		})
	);
	if (errUser || errExerciseLog) {
		errUser ? console.error(errUser) : console.error(errExerciseLog);
	}
	res.json({
		username: dataUser.name,
		description: dataExerciseLog.description,
		duration: dataExerciseLog.duration,
		date: dataExerciseLog.date.toUTCString(),
	});
};

const getExerciseLog = async (req, res) => {
	const { id, from, to, limit } = req.params;
	console.log(`id: ${id} from: ${from} to: ${to} limit: ${limit}`);
	let errExerciseLog, dataExerciseLog;
	if (from !== undefined && to !== undefined) {
		[errExerciseLog, dataExerciseLog] = await theSureThing(
			ExerciseLog.find({
				user: id,
			})
				.where('date')
				.gte(from)
				.lte(to)
				.populate('user')
				.exec()
		);
	}

	if (limit !== undefined) {
		[errExerciseLog, dataExerciseLog] = await theSureThing(
			ExerciseLog.find({
				user: id,
			})
				.where('date')
				.limit(Number(limit))
				.populate('user')
				.exec()
		);
	}

	if (from === undefined && to === undefined && limit === undefined) {
		[errExerciseLog, dataExerciseLog] = await theSureThing(
			ExerciseLog.find({
				user: id,
			})
				.populate('user')
				.exec()
		);
	}
	if (errExerciseLog) {
		console.error(errExerciseLog);
		res.status(404).json({ error: 'Error' });
	} else {
		res.json(dataExerciseLog);
	}
};
module.exports = { createUsers, getAllUsers, addExerciseLog, getExerciseLog };
