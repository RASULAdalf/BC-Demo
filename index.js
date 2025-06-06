const app = require('express')();
const server = require('http').createServer(app);
const path = require('path');
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
}
);
app.use(require('express').static('util'));
const options = {
        root: path.join(__dirname, '')
    };

const wordController = require('./controller/WordController');



app.get('/',(req,resp)=>{
  resp.sendFile('/util/index.html',options);
})

io.on('connection', (socket) => {
   console.log('new user'+socket.id);


socket.on('word',(data)=>{
    wordData = {
        text : data,
        letter_count : data.toString().length
    }
   wordController.printWord(socket,io,wordData);
})

})


server.listen(8080,()=>{console.log("Api is up");});