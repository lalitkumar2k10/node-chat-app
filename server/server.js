
const path=require('path');
const express=require('express');
const socketIO=require('socket.io');
const http=require('http');
const port=process.env.PORT||3000

const {generateMessage,generateLocationMessage}=require('./util/message');
const {isRealString}  = require('./util/validation');
const {Users} = require('./util/users');
// not to use below path
console.log(__dirname+'/../public');
// var moment=require('moment');
// console.log(moment().valueOf())
const publicPath=path.join(__dirname,'../public');
console.log(publicPath);

var app=express();
app.use(express.static(publicPath));
var server=http.createServer(app);
var io=socketIO(server);
var users = new Users();


server.listen(port,()=>{
	console.log(`server started at port ${port}`);
});


io.on('connection',(socket)=>{
	
	console.log('new user connected');

	
	socket.on('join',(params, callback)=>{
		if (! isRealString(params.name) || !isRealString(params.room)){
			callback('Name and Room are required.');
		}
		socket.join(params.room);
		// add people list ----------------

		// remove from previous rooms
		users.removeUser(socket.id);
		// add people
		users.addUser(socket.id, params.name, params.room);

		io.to(params.room).emit('updateUserList', users.getUserList(params.room));
		// add people list ends ----------------

		// socket.leave(params.room);

		// io.emit- to every user
		// --
		// io.to(params.room).emit

		// socket.broadcast.emit - except current user
		// scoket.broadcast.to('room name').emit

		// socket.emit - specific user
		socket.emit('newMessage',generateMessage('admin','welcome'));

		socket.broadcast.to(params.room).emit('newMessage',generateMessage('admin',`${params.name} has joined`));

		callback();
	});
	socket.on('createMessage',(message,callback)=>{
		// console.log('create msg request',message);
		var user = users.getUser(socket.id);
		if(user && isRealString(message.text)){
			io.to(user.room).emit('newMessage',generateMessage(user.name,message.text));
		}

		callback();
	});

	socket.on('createLocationMessage',(coords)=>{
		var user = users.getUser(socket.id);

		if(user){
			io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,`${coords.latitude}`,`${coords.longitude}`));
		}

		
	});

	socket.on('disconnect',()=>{
		// console.log('user disconnected');
		var user = users.removeUser(socket.id);

		if (user){
			io.to(user.room).emit('updateUserList', users.getUserList(user.room));
			io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));

		}
	});
});


