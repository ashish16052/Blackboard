const express = require('express')
const mongoose = require("mongoose");
const cors = require("cors");
const session = require('express-session');
const passport = require('passport');
require("dotenv").config();
const fs = require("fs");
const app = express()
const passportSetup = require('./lib/passport');

var corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json({ limit: "50mb" }));
app.use(
    express.urlencoded({
        limit: "50mb",
        extended: true,
        parameterLimit: 1000000,
    })
);

app.set("trust proxy", 1);

app.use(session(
    {
        secret: 'pqrxyz',
        resave: false,
        saveUninitialized: true,
    }
));
app.use(passport.initialize());
app.use(passport.session());

const connectDB = async () => {
    try {
        mongoose.connect(process.env.DB);
    } catch (error) {
        console.log(error);
    }
}

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Server started at port: " + process.env.PORT);
    });
})

mongoose.connection.on("connected", () => {
    console.log("Connected to production database");
}).on("error", (err) => {
    console.log("Error in database connection" + err);
});

fs.readdirSync("./model").forEach(function (file) {
    require("./model/" + file);
});

fs.readdirSync("./controller").forEach(function (file) {
    if (file.indexOf(".js") !== -1) {
        var route = require("./controller/" + file);
        route.controllerFunction(app);
    }
});

//Socket part

const Document = mongoose.model("Document");


const io = require("socket.io")(3001, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ['GET', 'POST']
    }
})

const findOrCreate = async (id) => {
    if (!id)
        return
    const document = await Document.findById(id)
    if (document)
        return document
    else
        return await Document.create({ _id: id, data: "", cdate: Date.now() })
}

io.on('connection', socket => {
    socket.on('join', async (id) => {
        const document = await findOrCreate(id)
        socket.join(id)
        socket.emit('load-doc', { title: document.title, data: document.data })
        socket.on('send-changes', delta => {
            socket.to(id).emit('recv-changes', delta)
        })
        socket.on('save', async (data) => {
            await Document.findByIdAndUpdate(id, { title: data.title, data: data.data })
        })
    })
})