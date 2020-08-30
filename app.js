// importar configurações do servidor
var app = require('./config/server');

// parametrizar a porta de escuta
var server = app.listen(3000, function(){
	console.log('Server online');
});

var io = require('socket.io').listen(server);

app.set('io', io);

// criar a conexão por websocket
io.on('connection', function(socket){
	console.log('User connected');

	socket.on('disconnect', function(){
		console.log('User disconnected');
	});

	socket.on('messageToServer', function(data){

		// dialogo
		socket.emit(
			'messageToClient', 
			{apelido: data.apelido, mensagem: data.mensagem
		});

		socket.broadcast.emit(
			'messageToClient', 
			{apelido: data.apelido, mensagem: data.mensagem
		});

		// participantes
		if(parseInt(data.apelido_atualizado_clientes) == 0){
			socket.emit(
				'participantesParaCliente', 
				{apelido: data.apelido}
			);			

			socket.broadcast.emit(
				'participantesParaCliente', 
				{apelido: data.apelido}
			);
		}
	});
});