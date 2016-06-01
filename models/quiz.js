module.exports = function(sequelize, DataTypes){ //Datos de la BBDD que se modifican en quiz_controller
	return sequelize.define('Quiz',
							{ question: {type: DataTypes.STRING,
										 validate: {notEmpty: {msg:"Falta Pregunta"}}
							},
						    answer: {type: DataTypes.STRING,
									   validate: {notEmpty: {msg: "Falta Respuesta"}}
							}
						});
};