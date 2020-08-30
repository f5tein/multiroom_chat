module.exports.iniciaChat = function(application, req, res){
	
	var chat = req.body;
	
	req.assert('apelido', 'Nome ou apelido é obrigatório').notEmpty();
	req.assert('apelido', 'Nome ou apelido deve conter entre 3 a 15 caracteres').len(3,15);
	
	var validationErrors = req.validationErrors();
	
	if(validationErrors){
		res.render('index', {validacao: validationErrors});
		return;
	}

	application.get('io').emit(
		'messageToClient', 
		{'apelido': chat.apelido, 'mensagem': ' acabou de entrar no chat'}
	);

	res.render('chat', {chat: chat});
};