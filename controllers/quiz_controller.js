// Get question
/*
exports.question = function(req, res, next){
	res.render('quizzes/question', {question: 'Capital de Italia'});
};

exports.check = function(req, res, next){
	var result = req.query.answer === 'Roma' ? 'Correcta' : 'Incorrecta';
	res.render('quizzes/result', {result: result});
};
*/

var models = require('../models');

exports.question = function(req,res,next){
	models.Quiz.findOne().then(function(quiz){
		if(quiz){
			var answer = req.query.answer || '';
			res.render('quizzes/question', {question: quiz.question, answer: answer});
		} else{
			throw new Error('No hay preguntas en la BBDD.');
		}
	}).catch(function(error){next(error);});
};

exports.check = function(req,res,next){
	models.Quiz.findOne().then(function(quiz){
		if(quiz){
			var answer = req.query.answer || "";
			var result = answer === quiz.answer ? 'Correcta' : 'Incorrecta';
			res.render('quizzes/result',{result: result, answer: answer});
		} else{
			throw new Error('No hay preguntas en la BBDD.');
		}
	}).catch(function(error){next(error);});
};