const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// show user connection status in terminal
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// broadcast connection status message to users
io.on('connection', (socket) => {
    io.emit('chat message', 'a user connected');
    socket.on('disconnect', () => {
        io.emit('chat message', 'a user disconnected');
    });
});

//io.on('connection', (socket) => {
//    socket.on('chat message', (msg) => {
//        console.log('message: ' + msg);
//    });
//});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

http.listen(3000, () => {
    console.log('listening on port 3000');
});
