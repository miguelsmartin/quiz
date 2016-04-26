var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});


router.get('/author', function(req, res, next) {
  res.render('author', { title: 'Quiz' });
  //res.render('author', {authors: 'Miguel Sánchez Martín y José María Carmona Pérez'});
});

router.get('/question', quizController.question);
router.get('/check', quizController.check);

/*router.get('/question', function(req, res, next) {
  res.render('question', { title: 'Quiz' });
  //res.render('author', {authors: 'Miguel Sánchez Martín y José María Carmona Pérez'});
});

router.get('/result', function(req, res, next) {
  res.render('result', { title: 'Quiz' });
  //res.render('author', {authors: 'Miguel Sánchez Martín y José María Carmona Pérez'});
});*/



module.exports = router;
