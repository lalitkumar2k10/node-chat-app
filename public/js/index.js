var socket=io();


socket.on('connect',function(){
			console.log('connected to server');
		});

socket.on('disconnect',function(){
			console.log('disconnect');
		});	

/*socket.emit('createMsg',{
	to:'client2',
	text:'xyz'
});*/

socket.on('newMsg',function(msg){
	console.log('new msg',msg)
});
/*
socket.on('connect',function(){
			console.log('connected to server');
		});

socket.on('disconnect',function(){
			console.log('disconnect');
		});	

socket.on('newEmail',function(newEmail){
			console.log('new mail',newEmail)
		});

socket.emit('createEmail',{
	to:'xyz',
	text:'yu'
});*/