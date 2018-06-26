
const path=require('path');

const express=require('express');

const port=process.env.PORT||3001

console.log(__dirname+'/../public');

const publicPath=path.join(__dirname,'../public');
console.log(publicPath);

var app=express();

app.use(express.static(publicPath));

app.listen(port,()=>{
	console.log(`server started at port {port}`);
});