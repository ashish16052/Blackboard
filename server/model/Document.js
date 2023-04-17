const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DocumentSchema = new Schema({
    _id: String,
    cdate: Date,
    data: Object
})

mongoose.model("Document", DocumentSchema);