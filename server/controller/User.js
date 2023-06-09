const express = require("express");
const mongoose = require("mongoose");

const mainRouter = express.Router();
const mainModel = mongoose.model("User");
const docModel = mongoose.model("Document");


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

    mainRouter.get("/readdoc/:id", async (req, res, next) => {
        mainModel.findById(req.params.id, async function (err, doc) {
            if (err) {
                return res.send(err);
            } else if (doc) {
                var docarr = []
                for (var i = 0; i < doc.Documents.length; i++) {
                    const d = await docModel.findById(doc.Documents[i])
                    docarr.push(d)
                }
                res.send(docarr);
            }
            else {
                return res.send(doc);
            }
        });
    })

    mainRouter.post("/adddoc/:id", async (req, res, next) => {
        mainModel.findByIdAndUpdate(req.params.id,
            { $addToSet: { Documents: req.body.docid } },
            { upsert: true, new: true },
            function (err, doc) {
                if (err) {
                    return res.send(err);
                }
                else {
                    return res.send(doc);
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

    mainRouter.get("/email", async (req, res, next) => {
        mainModel.findOne({ email: req.body.email }, function (err, doc) {
            if (err) {
                return res.send(err);
            } else {
                res.send(doc);
            }
        });
    });

    mainRouter.post("/create", async (req, res, next) => {
        const newModel = new mainModel({
            name: req.body.name,
        });

        newModel.save(function (err, doc) {
            if (err) {
                return res.send(err);
            } else {
                res.send(doc)
            }
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

    app.use("/user", mainRouter);
};
