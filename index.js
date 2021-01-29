const app = require('express')();
const http = require('http').Server(app);
const data = require('./data');
const io = require('socket.io')(http);

const port = 3000;

const interval = 1000; // new data every second 

const intitalPoints = 10 * 60; // 10 min of data 

// add initial data on start up
for(i = 0; i < intitalPoints; i++) {
    data.updateData(interval)
}

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/api/data', (req, res) => {
  res.send(data.dataPoints);
});

setInterval(function () {
    data.updateData(interval);
    io.sockets.emit('data', data.dataPoints[0]);
  }, interval);
  
  io.on('connection', function (socket) {
    console.log('a user connected');
  });
  

http.listen(port, () => {
  console.log(`Listening on *:${port}`);
});
