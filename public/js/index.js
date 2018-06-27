var socket=io();


socket.on('connect',function(){
			console.log('connected to server');
		});

socket.on('disconnect',function(){
			console.log('disconnect');
		});	



socket.on('newMsg',function(msg){
	console.log('new msg',msg)
});