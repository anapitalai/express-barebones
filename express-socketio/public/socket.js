//establish socket connection
const socket = io.connect('http://localhost:2020');


//grab all the handles
const taskHandle=document.getElementById('task-input');
const displayHandle=document.getElementById('task-display');
const btnHandle=document.getElementById=('send');

//emit event to the server
btnHandle.addEventListener('click',()=>{
   
  //emits this message to the serve where the server emits to all connected clients
  socket..emit('task',{
    task:taskHandle.value
      });

});

//listen for events emitted frm the server containing the data-taskdata
socket.on('task',()=>{
   displayHandle.innerHTML +='<li>'+ taskdata.task + '</li>';
});
