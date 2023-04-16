const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DocumentSchema = new Schema({
    _id: String,
    userid: String,
    cdate: Date,
    data: Object
})

mongoose.model("Document", DocumentSchema);