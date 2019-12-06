const express = require('express');

const app=express();

const server = app.listen(2020,()=>{
console.log('Server is listening on port 2020!');
});


//serve static html files from a directory called public
app.use(express.static('public'));
