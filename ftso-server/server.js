const express = require('express');
const app = express();
const http = require('http').createServer(app);
const cors = require('cors');
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  }
});

app.use(cors());
app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Пользователь подключился');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Сервер работает на порту ${PORT}`);
});
