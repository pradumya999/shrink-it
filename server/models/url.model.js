const mongoose = require("mongoose");
const schema = mongoose.Schema;
const ObjectID = mongoose.Types.ObjectId;

const urlSchema = new schema({
    userID: { 
        type: ObjectID,
        ref: 'users',
        default: null
    },
    anonID: {
        type: String,
        default: null
    },
    urlkey: {
        type: String,
        required: true,
        unique: true
    },
    originalURL: {
        type: String,
        required: true,
        unique: false
    },
    clicks: {
        type: Number,
        default: 0
    }
}, {timestamps : true});

const urlModel = mongoose.model('urls', urlSchema);

module.exports = urlModel;