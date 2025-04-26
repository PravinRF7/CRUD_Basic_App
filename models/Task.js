const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: {type: String,required : true},
    done: {type: Boolean,default : false},
    created : {type: Date , default : Date.now}
});

module.exports = mongoose.model('Task',taskSchema);