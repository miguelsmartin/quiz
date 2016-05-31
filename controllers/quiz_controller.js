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
			res.send(JSON.stringify(quizzes));
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
				res.send(JSON.stringify(quiz));
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

				res.render('quizzes/show', {quiz: req.quiz,
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


// Autoload el quiz asociado a :quizId
 exports.load = function(req, res, next, quizId) {
 	models.Quiz.findById(quizId)
   		.then(function(quiz) {
       		if (quiz) {
         		req.quiz = quiz;
         		next();
       		} else { 
       			next(new Error('No existe quizId=' + quizId));
       		}
         })
         .catch(function(error) { next(error); });
 };


 exports.new = function(req, res, next) {
   var quiz = models.Quiz.build({question: "", answer: ""});
   res.render('quizzes/new', {quiz: quiz});
 };
 
 // POST /quizzes/create
 exports.create = function(req, res, next) {
   var quiz = models.Quiz.build({ question: req.body.quiz.question, 
   	                             answer:   req.body.quiz.answer} );
 
 // guarda en DB los campos pregunta y respuesta de quiz
   quiz.save({fields: ["question", "answer"]})
   	.then(function(quiz) {
   		req.flash('success','Quiz creado con éxito.');
     	res.redirect('/quizzes');  // res.redirect: Redirección HTTP a lista de preguntas
     })
     .catch(function(error) {
     	req.flash('error', 'Error al crear un Quiz: '+error.message);
 		next(error);
 	});  
 };


// GET /quizzes/:id/check
exports.check = function(req, res) {
	models.Quiz.findById(req.params.quizId)
		.then(function(quiz) {
			if (quiz) {
				var answer = req.query.answer || "";

				var result = answer === quiz.answer ? 'Correcta' : 'Incorrecta';

				res.render('quizzes/result', { quiz: req.quiz, 
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
