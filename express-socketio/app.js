const express = require('express');
const socket =require('socket.io');

const app=express();

const server = app.listen(2020,()=>{
console.log('Server is listening on port 2020!');
});


//serve static html files from a directory called public
app.use(express.static('public'));

//setup socketio
const io=socket(server);

//when socket connection is established btw server and client
io.on('connection',(socket)=>{
console.log('A connection was established',socketid);
});
