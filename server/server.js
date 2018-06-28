
const path=require('path');
const express=require('express');
const socketIO=require('socket.io');
const http=require('http');
const port=process.env.PORT||3000
const {generateMessage}=require('./util/message');
console.log(__dirname+'/../public');

const publicPath=path.join(__dirname,'../public');
console.log(publicPath);

var app=express();
app.use(express.static(publicPath));

var server=http.createServer(app);
server.listen(port,()=>{
	console.log(`server started at port ${port}`);
});

var io=socketIO(server);
io.on('connection',(socket)=>{
	
	console.log('new user connected');

	socket.emit('newMessage',generateMessage('admin','welcome'));

	socket.broadcast.emit('newMessage',generateMessage('admin','new joined'));

	socket.on('createMessage',(message,callback)=>{
		console.log('create msg request',message);
		/*
		socket.broadcast.emit('newMsg',{
			from:msg.from,
			text:msg.text,
			createdAt:new Date().getTime()
		});*/

		io.emit('newMessage',generateMessage(message.from,message.text));
		callback('this is from server');
	});

	socket.on('disconnect',()=>{
		console.log('user disconnected');
	});
});


