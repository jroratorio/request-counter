const dao = require('../dao');
const moment = require('moment');

let controller = {};

controller.getStats = async (req, res, next) => {

    let arr = [];
    
    arr.push( dao.getStat1() );
    arr.push( dao.getStat2() );

    const one_hour_back = moment(new Date()).subtract(1, 'h').toDate();
    const one_minute_back = moment(new Date()).subtract(1, 'm').toDate();

    arr.push( dao.getStat3_4(one_hour_back, 'one hour') );
    arr.push( dao.getStat3_4(one_minute_back, 'one minute' ) );

    try {
        arr = await Promise.all(arr);

        return res.status(200).send(arr);

    } catch(err) {
        return next(err);
    }
}

module.exports = controller;