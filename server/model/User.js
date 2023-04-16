const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    _id: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    pfp: {
        type: String,
    },
    email: {
        type: String,
    },
});


mongoose.model("User", userSchema);