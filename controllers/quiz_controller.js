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


// GET /quizzes
exports.index = function(req, res, next) {
	

    if(req.query.search !== undefined){
    	var searchAux = req.query.search.replace("","%");
    	models.Quiz.findAll({where: {question: {$like: ('%' + searchAux + '%')}}}).then(
			function(quizzes) {
			res.render('quizzes/index.ejs', { quizzes: quizzes});
		})
		.catch(function(error) {
			next(error);
		});
	}else if(req.params.format == 'json'){
		models.Quiz.findAll()
		.then(
			function(quizzes) {
			res.send(quizzes);
		})
		.catch(function(error) {
			next(error);
		});
	}else{
	models.Quiz.findAll()
		.then(
			function(quizzes) {
			res.render('quizzes/index.ejs', { quizzes: quizzes});
		})
		.catch(function(error) {
			next(error);
		});

	}
};


// GET /quizzes/:id
exports.show = function(req, res, next) {
	if(req.params.format == "json"){
		models.Quiz.findById(req.params.quizId)
		.then(function(quiz) {
			if (quiz) {
				res.send(quiz);
			} else {
		    	throw new Error('No existe ese quiz en la BBDD.');
		    }
		})
		.catch(function(error) {
			next(error);
		});
	}else{
	models.Quiz.findById(req.params.quizId)
		.then(function(quiz) {
			if (quiz) {
				var answer = req.query.answer || '';

				res.render('quizzes/show', {quiz: quiz,
											answer: answer});
			} else {
		    	throw new Error('No existe ese quiz en la BBDD.');
		    }
		})
		.catch(function(error) {
			next(error);
		});
	}
};


// GET /quizzes/:id/check
exports.check = function(req, res) {
	models.Quiz.findById(req.params.quizId)
		.then(function(quiz) {
			if (quiz) {
				var answer = req.query.answer || "";

				var result = answer === quiz.answer ? 'Correcta' : 'Incorrecta';

				res.render('quizzes/result', { quiz: quiz, 
											   result: result, 
											   answer: answer });
			} else {
				throw new Error('No existe ese quiz en la BBDD.');
			}
		})
		.catch(function(error) {
			next(error);
		});	
};

/*exports.search = function(req,res,next){
	var busqueda= req.query.search;
	models.Quiz.findAll()
		.then(function(quizzes) {
			for(var i in quizzes){


			if(busqueda.test(quizzes[i].question)){
				var question = quizzes[i].question;
			} else{
				var question = "No se encontró ninguna pregunta";
			}
			}
			res.render('quizzes/search.ejs', { quizzes: quizzes, question: question});
		})
		.catch(function(error) {
			next(error);
		});
				

};*/