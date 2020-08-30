// importar o módulo express 
var express = require('express');

// importar o módulo consign
var consign = require('consign');

// importar o módulo body parser
var bodyParser = require('body-parser');

// importar o módulo express-validator
var expressValidator = require('express-validator');

// iniciar o objeto do express
var app = express();

// setar variáveis 'view engine' e 'views'do express
app.set('view engine', 'ejs');
app.set('views', './app/views');

// configurar middleware express.static
app.use(express.static('./app/public'));

// configurar middleware body-parser
app.use(bodyParser.urlencoded({extended: true}));

// configurar middleware express-validator
app.use(expressValidator());

// efetuar o autoload das rotas, models e controllers para o objeto app
consign()
	.include('app/routes')
	.then('app/models')
	.then('app/controllers')
	.into(app);

// exportar o objeto app
module.exports = app;