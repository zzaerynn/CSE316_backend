let  mongoose = require('mongoose');

let Schema = mongoose.Schema;

let NoteSchema = new Schema(
    {
        text:{type: String},
        lastUpdatedDate: {type:Date, required:true},
    }
);

module.exports = mongoose.model('Note', NoteSchema);