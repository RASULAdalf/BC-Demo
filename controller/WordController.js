const printWord = (socket,io,data)=>{
    console.log(data.text);
    io.emit('on_word',data);
}

module.exports = {printWord};