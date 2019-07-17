const Process = require('../model/process');
const uuid = require('uuid');
const moment = require('moment');

const MAX = process.env.MAX;

const addUUIDandStartTimeToDB = (req, res, next) => {
    
    req.uuid = uuid();

    const req_obj = {
        uuid : req.uuid,
        start_time : new Date(),
        headers: req.headers,
        body: req.body,
        query: req.query,
        method: req.method 
    }
   
    addCurrentRequest(req_obj, (err, resp) => {
        console.log(err || resp);
    });

    return next();
}

const clearTimeoutRequests = (req, res, next) => {

    const old_timestamp = moment(new Date()).subtract(parseInt(MAX), 'ms').toDate();
    
    //delete pending requests
    Process.remove({ start_time: { $lt: old_timestamp }, duration: null }, (err, resp) => {
        console.log(err || resp);
    });

    return next();
}

const addCurrentRequest = (req_obj, cb) => {
    Process.create(req_obj, (err, data) => {
        cb(err, data);
    });
}

const updateDuration = (uuid, duration, cb) => {
    Process.updateOne({ uuid }, { $set: { duration } }, (err, resp) => {
        cb(err, resp);
    });
}

const getStat1 = () => {

    return new Promise((resolve, reject) => {
        Process.aggregate([
            {
                $match: {
                    duration: { $ne: null }
                }
            },
            {
                $group: {
                    _id: "$method",
                    avg_resp: {
                        $avg: "$duration"
                    },
                    count: {
                        $sum: 1
                    }
                }
            },
            {
                $project: {
                    method: "$_id",                    
                    avg_resp: 1,
                    count: 1,
                    _id: 0
                }
            }
        ], (err, data) => {
            if(err) {
                reject(err);
            } else{
                resolve({ message: 'Total requests made since server startup and avg response time', data });
            }
        });
    }); 
}

const getStat2 = () => {

    return new Promise((resolve, reject) => {
        Process.aggregate([
            {
                $match: {
                    duration: null
                }
            },
            {
                $group: {
                    _id: "$method",                
                    count: {
                        $sum: 1
                    }
                }
            },
            {
                $project: {
                    method: "$_id",                    
                    avg_resp: 1,
                    count: 1,
                    _id: 0
                }
            }
        ], (err, data) => {
            if(err) {
                reject(err);
            } else{
                if(!data || !data.length) {
                    resolve("No ACTIVE requests");
                }
                resolve({ message: 'Active number of requests, grouped by request type', data });
            }
        });
    }); 
    
}

const getStat3_4 = (time, diff) => {
        
    return new Promise((resolve, reject) => {
        Process.aggregate([
            {
                $match: {
                    duration: { $ne: null },
                    start_time: { $gte: new Date(time) }
                }
            },
            {
                $group: {
                    _id: "$method",
                    avg_resp: {
                        $avg: "$duration"
                    },
                    count: {
                        $sum: 1
                    }
                }
            },
            {
                $project: {
                    method: "$_id",                    
                    avg_resp: 1,
                    count: 1,
                    _id: 0
                }
            }
        ], (err, data) => {
            if(err) {
                reject(err);
            } else{
                if(!data || !data.length) {
                    resolve(`No requests in last ${diff}`);
                }
                resolve({ message: `Number of requests made in last ${diff}`, data } );
            }
        });
    });
}

module.exports = {    
    addUUIDandStartTimeToDB,
    updateDuration,
    clearTimeoutRequests,
    getStat1,
    getStat2,
    getStat3_4 
}