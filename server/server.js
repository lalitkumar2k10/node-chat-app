
const path=require('path');
const express=require('express');
const socketIO=require('socket.io');
const http=require('http');
const port=process.env.PORT||3000
const {generateMessage,generateLocationMessage}=require('./util/message');
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
		
		io.emit('newMessage',generateMessage(message.from,message.text));
		callback();
	});

	socket.on('createLocationMessage',(coords)=>{
		io.emit('newLocationMessage',generateLocationMessage('Admin',`${coords.latitude}`,`${coords.longitude}`));
	});

	socket.on('disconnect',()=>{
		console.log('user disconnected');
	});
});


