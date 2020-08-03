var express = require('express');
var mongoose = require('mongoose');
// var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);


var app = express();
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var server = app.listen(3000, () => {
    console.log('Server is running on port ', server.address().port);
});

io.on('connection', () => {
    console.log('An user is connected !');
});

// const uri = "mongodb+srv://cathy_925:cathy005@cathyproject.vsvpi.azure.mongodb.net/eChat?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useUnifiedTopology: true, useNewUrlParser: true });
// client.connect(err => {
//     console.log('MongoDB is Connected');
//     const collection = client.db("eChat").collection("chat_1");

//     // perform actions on the collection object

//     client.close();
// });


var dbUrl = "mongodb+srv://cathy_925:cathy005@cathyproject.vsvpi.azure.mongodb.net/eChat?retryWrites=true&w=majority";
mongoose.connect(
    dbUrl, { useNewUrlParser: true, useUnifiedTopology: true },
    err => {
        console.log('MongoDB connected', err);
    }
);

var Message = mongoose.model('Message', { name: String, message: String });


app.get('/messages', (req, res) => {
    collection.find({}, (err, messages) => {
        res.send(messages);
    });
});

app.post('/messages', (req, res) => {
    var message = new Message(req.body);
    message.save((err) => {
        if (err) {
            sendStatus(500);
        }
        io.emit('message', req.body);
        res.sendStatus(200);

    });

});