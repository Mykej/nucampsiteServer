const express = require('express');
const campsiteRouter = express.Router();

campsiteRouter.route('/:campsiteId') //When you see a "/:" it can be any value in the URL "Postman"
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text-plain');
    next();
})
.get((req, res, next) => {
res.end(`Will send details of the campsite: ${req.params.campsiteId} to you`);
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`);
})
.put((req, res, next) => {
    res.write(`Updating the campsite: ${req.params.campsiteId}/n`);
    res.end(`Will update the campsite: ${req.body.name}
        with description: ${req.body.description}`);
})
.delete((req, res, next) => {
    res.end(`Deleting campsite: ${req.params.campsiteId}`);
});

campsiteRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send all the campsites to you');
})
.post((req, res) => {
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /campsites');
})
.delete((req, res) => {
    res.end('Deleting all campsites');
});

module.exports = campsiteRouter;

//declare route parameters for "Express router"
//app.get('/campsites/:campsiteId',() =>{});