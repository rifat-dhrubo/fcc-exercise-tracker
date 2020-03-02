const {
	createUsers,
	getAllUsers,
	addExerciseLog,
	getExerciseLog,
} = require('./exercise.controller');

const { Router } = require('express');

router = Router();

router.post('/new-user', createUsers);

router.get('/users', getAllUsers);

router.post('/add', addExerciseLog);

router.get('/log/:id/:from?/:to?/:limit?', getExerciseLog);

module.exports = router;
