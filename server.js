"use strict";

const http = require('http');
const finalhandler = require('finalhandler');
const Router = require('router')
const bodyParser = require('body-parser')

const router = new Router();

let messages = []
let nextId = 1

class Message {
    constructor(messsage) {
        this.id = nextId
        this.message = messsage
        nextId++
    }
}

router.use(bodyParser.json())

router.get('/', (req, res) => {
    // A good place to start!
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.end('Hello Node World!')
})


router.post('/message', (req, res) => {


    // Save the message and send the message id back to the client
    let newMessage;


    res.setHeader('Content-Type', 'application/json; charset=utf-8');


    newMessage = new Message(req.body.message);


    messages.push(newMessage);


    res.end(JSON.stringify(newMessage.id));

})


const server = http.createServer((request, response) => {
    router(request, response, finalhandler(request, response));
});

exports.listen = function (port, callback) {
    server.listen(port, callback);
};

exports.close = function (callback) {
    server.close(callback);
};
