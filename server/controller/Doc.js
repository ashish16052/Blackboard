const express = require("express");
const mongoose = require("mongoose");

const mainRouter = express.Router();
const mainModel = mongoose.model("Document");


module.exports.controllerFunction = function (app) {

    mainRouter.get("/readall", async (req, res, next) => {
        mainModel.find(function (err, doc) {
            if (err) {
                return res.send(err);
            } else {
                res.send(doc);
            }
        });
    })

    mainRouter.get("/readDoc/:id", async (req, res, next) => {
        mainModel.findOne({ _id: req.params.id }, function (err, doc) {
            if (err) {
                return res.send(err);
            } else {
                res.send(doc);
            }
        });
    })

    mainRouter.get("/readOne/:id", async (req, res, next) => {
        mainModel.findById(req.params.id, function (err, doc) {
            if (err) {
                return res.send(err);
            } else {
                res.send(doc);
            }
        });
    });

    mainRouter.post("/create", async (req, res, next) => {
        const userid1 = req.body.user1;
        const userid2 = req.body.user2;
        const _id = (Math.min(userid1, userid2)).toString() + (Math.max(userid2, userid1)).toString()
        mainModel.findOneAndUpdate({ _id: _id }, { _id: _id },
            { upsert: true, new: true },
            function (err, doc) {
                if (err) {
                    console.log(err);
                    return res.send(err);
                } else {
                    res.send(doc)
                }
            })
    });

    mainRouter.post("/sendmessage/:id", async (req, res, next) => {
        mainModel.findByIdAndUpdate(req.params.id, { $push: { messages: req.body } },
            { upsert: true, new: true },
            function (err, doc) {
                if (err)
                    return res.send(err);
                else
                    res.send(doc);
            });
    });

    mainRouter.post("/deletemessage/:id", async (req, res, next) => {
        mainModel.findByIdAndUpdate(req.params.id, { $pull: { messages: req.body.messsageId } },
            { upsert: true, new: true },
            function (err, doc) {
                if (err)
                    return res.send(err);
                else
                    res.send(doc);
            });
    });

    mainRouter.post("/update/:id", async (req, res, next) => {
        mainModel.findByIdAndUpdate(req.params.id, req.body,
            { upsert: true, new: true },
            function (err, doc) {
                if (err)
                    return res.send(err);
                else
                    res.send(doc);
            });
    });

    mainRouter.post("/delete/:id", async (req, res, next) => {
        mainModel.findByIdAndDelete(req.params.id, function (err, doc) {
            if (err) {
                return res.send(err);
            } else {
                res.send(doc);
            }
        });
    });

    app.use("/chat", mainRouter);
};
