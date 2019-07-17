const dao = require('../dao');
const utils = require('../utils');

const max = process.env.MAX;
const min = process.env.MIN;

let controller = {}

controller.serveGET = (req, res, next) => {    

    const duration = utils.randomIntFromInterval(parseInt(min), parseInt(max));

    setTimeout(() => {

        let result = {
            uuid: req.uuid,
            headers: req.headers || null,
            query: req.query || null,
            body: null,
            method: 'GET',
            duration
        }

        dao.updateDuration(req.uuid, duration, (err, resp) => {
            console.log(err || resp);
        });

        return res.status(200).send(result);

    }, duration );
}

controller.servePOST = (req, res, next) => {    

    const duration = utils.randomIntFromInterval(parseInt(min), parseInt(max));

    setTimeout(() => {

        let result = {
            uuid: req.uuid,
            headers: req.headers || null,
            query: req.query || null,
            body: req.body || null,
            method: 'POST',
            duration
        }

        dao.updateDuration(req.uuid, duration, (err, resp) => {
            console.log(err || resp);
        });

        return res.status(200).send(result);

    }, duration );
}

controller.servePUT = (req, res, next) => {    

    const duration = utils.randomIntFromInterval(parseInt(min), parseInt(max));

    setTimeout(() => {

        let result = {
            uuid: req.uuid,
            headers: req.headers || null,
            query: req.query || null,
            body: req.body || null,
            method: 'PUT',
            duration
        }

        dao.updateDuration(req.uuid, duration, (err, resp) => {
            console.log(err || resp);
        });

        return res.status(200).send(result);

    }, duration );
}

controller.serveDELETE = (req, res, next) => {    

    const duration = utils.randomIntFromInterval(parseInt(min), parseInt(max));

    setTimeout(() => {

        let result = {
            uuid: req.uuid,
            headers: req.headers || null,
            query: req.query || null,
            body: req.body || null,
            method: 'DELETE',
            duration
        }

        dao.updateDuration(req.uuid, duration, (err, resp) => {
            console.log(err || resp);
        });

        return res.status(200).send(result);

    }, duration );
}

module.exports = controller;