let mongoose      = require('mongoose');
let Schema 	      = mongoose.Schema;
let db 	 	      = require('../config/db');

let timezone = require('mongoose-timezone');

let process         = new Schema(
    {
        uuid : { type: String, required: true, index: true, unique: true },
        start_time : { type: Date,  required: true, index: true },
        duration : { type: Number, default: null },
        method : { type : String, required: true, index: true },
        headers : { type: Schema.Types.Mixed, default: null },
        query : { type : Schema.Types.Mixed, default: null },
        body : { type : Schema.Types.Mixed, default: null }
    },
    {
        timestamps : true,
        strict     : false
    }
);

process.plugin(timezone);
module.exports = db.model('process', process);