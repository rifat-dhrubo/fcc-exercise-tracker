const {
	createUsers,
	getAllUsers,
	addExerciseLog,
	getExerciseLog,
} = require('./exercise.controller');

const { Router } = require('express');

router = Router();

router.post('/new-user', createUsers);

router.post('/users', getAllUsers);

router.get('/log/:id', getExerciseLog);

module.exports = router;
