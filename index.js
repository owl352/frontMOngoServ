var fs = require('fs');
var mongoose = require('mongoose');
var http = require('http');
let Schema = mongoose.Schema;
const express = require("express");
require('dotenv').config()




var mongoUrl = process.env.MONGO_URL ? process.env.MONGO_URL : 'sad';
var options = {
    sslValidate: false,
};
mongoose.connect(mongoUrl, options);
const connection = mongoose.connection;
connection.once("open", async function () {
    console.log("MongoDB database connection established successfully");
    // const kittySchema = new mongoose.Schema({
    //     name: String
    // });
    // const Kitten = mongoose.model('Kitten', kittySchema);
    // const silence = new Kitten({ name: 'Silence' });
    //   await silence.save()
    // const fq = await Kitten.find();
    // console.log(fq);
});



// mongoose.disconnect()




let userSchema = new Schema({
    discordID: { type: String, default: '' },
    telegramId: String,
    walletAddress: String,
    EMail: String,
    roles: String,
    level: { type: Number, min: 0, max: 10000000 },
    favoriteTasks: { type: [Schema.Types.ObjectId], default: mongoose.Types.ObjectId.createFromHexString('000000000000000000000000') },
    workOnTask: String,
    banned: Boolean,
    gettedTask: { type: Schema.Types.ObjectId, default: mongoose.Types.ObjectId.createFromHexString('000000000000000000000000') },
    listingTaskIndex: { type: Number, default: -1 }
})
let taskSchema = new Schema({
    shortDescription: String,
    longDescription: String,
    photosLongDescription: String,
    isOnceTask: Boolean,
    bounty: Number,
    bountyExp: Number,
    bank: Number,
    bankConst: Number,
    minLevel: { type: Number, min: 0, max: 10, required: true, default: 0 },
    isActive: Boolean,
    userWhoComplete: [String],
})
let cashoutTaskSchema = new Schema({
    taskBounty: Number,
    userWhoCompleteMail: String,
    userWhoComplete: String,
    shortDescription: String,
    longDescription: String,
    photosLongDescription: String,
    paid: { type: Boolean, default: false },
    date: { type: Date, default: Date.now() }
})

let cashoutTaskModel = mongoose.model('cashoutTask', cashoutTaskSchema);
let taskModel = mongoose.model('TaskModel', taskSchema);
let userModel = mongoose.model('UserModel', userSchema);

const app = express();


app.get('/find', async function (req, res) {
    if (req.query.pass == process.env.PASS) {
        let findQuery = {}
        if ((req.query.fq != null)){
            if (isJsonString(req.query.fq)){
                findQuery = JSON.parse(req.query.fq);
            }
        }
        if (req.query.reqType == 'users') {
            let fq = await userModel.find(findQuery);
            res.send(fq)
        } else if (req.query.reqType == 'tasks') {
            let fq = await taskModel.find(findQuery);
            res.send(fq)
        } else if (req.query.reqType == 'cashoutTasks') {
            let fq = await cashoutTaskModel.find(findQuery);
            res.send(fq)
        } else {
            res.send('404')
        }

    }
});


app.get('/updateOne', async function (req, res) {
    if (req.query.pass == process.env.PASS) {
        console.log(req.query)
        if (req.query.reqType == 'users') {
            if ((req.query.fq != null && req.query.uq != null)) {
                if (isJsonString(req.query.fq) && isJsonString(req.query.uq)) {
                    let fq = JSON.parse(req.query.fq)
                    let uq = JSON.parse(req.query.uq)
                    if ((Object.keys(fq).length > 0 && Object.keys(uq).length > 0)) {
                        userModel.updateOne(fq, uq).then((v) => {
                            res.send('ok')
                        });
                    } else {
                        res.send('err')
                    }
                } else {
                    res.send('err')
                }
            } else {
                res.send('err')
            }
        } else if (req.query.reqType == 'tasks') {
            if ((req.query.fq instanceof Object && req.query.uq instanceof Object)) {
                if (isJsonString(req.query.fq) && isJsonString(req.query.uq)) {
                    let fq = JSON.parse(req.query.fq)
                    let uq = JSON.parse(req.query.uq)
                    if ((Object.keys(fq).length > 0 && Object.keys(uq).length > 0)) {
                        taskModel.updateOne(fq, uq).then((v) => {
                            res.send('ok')
                        });
                    } else {
                        res.send('err')
                    }
                } else {
                    res.send('err')
                }
            } else {
                res.send('err')
            }
        } else if (req.query.reqType == 'cashoutTasks') {
            if ((req.query.fq instanceof Object && req.query.uq instanceof Object)) {
                if (isJsonString(req.query.fq) && isJsonString(req.query.uq)) {
                    let fq = JSON.parse(req.query.fq)
                    let uq = JSON.parse(req.query.uq)
                    if ((Object.keys(fq).length > 0 && Object.keys(uq).length > 0)) {
                        cashoutTaskModel.updateOne(fq, uq).then((v) => {
                            res.send('ok')
                        });
                    } else {
                        res.send('err')
                    }
                } else {
                    res.send('err')
                }
            } else {
                res.send('err')
            }
        } else {
            res.send('404')
        }
    }
});


app.get('/replaceOne', async function (req, res) {
    if (req.query.pass == process.env.PASS) {
        if (req.query.reqType == 'users') {
            if ((req.query.fq != null && req.query.uq != null)) {
                if (isJsonString(req.query.fq) && isJsonString(req.query.uq)) {
                    let fq = JSON.parse(req.query.fq)
                    let uq = JSON.parse(req.query.uq)
                    if ((Object.keys(fq).length > 0 && Object.keys(uq).length > 0)) {
                        userModel.replaceOne(fq, uq).then((v) => {
                            res.send('ok')
                        });
                    } else {
                        res.send('err')
                    }
                } else {
                    res.send('err')
                }
            } else {
                res.send('err')
            }
        } else if (req.query.reqType == 'tasks') {
            if ((req.query.fq instanceof Object && req.query.uq instanceof Object)) {
                if (isJsonString(req.query.fq) && isJsonString(req.query.uq)) {
                    let fq = JSON.parse(req.query.fq)
                    let uq = JSON.parse(req.query.uq)
                    if ((Object.keys(fq).length > 0 && Object.keys(uq).length > 0)) {
                        taskModel.replaceOne(fq, uq).then((v) => {
                            res.send('ok')
                        });
                    } else {
                        res.send('err')
                    }
                } else {
                    res.send('err')
                }
            } else {
                res.send('err')
            }
        } else if (req.query.reqType == 'cashoutTasks') {
            if ((req.query.fq instanceof Object && req.query.uq instanceof Object)) {
                if (isJsonString(req.query.fq) && isJsonString(req.query.uq)) {
                    let fq = JSON.parse(req.query.fq)
                    let uq = JSON.parse(req.query.uq)
                    if ((Object.keys(fq).length > 0 && Object.keys(uq).length > 0)) {
                        cashoutTaskModel.replaceOne(fq, uq).then((v) => {
                            res.send('ok')
                        });
                    } else {
                        res.send('err')
                    }
                } else {
                    res.send('err')
                }
            } else {
                res.send('err')
            }
        } else {
            res.send('404')
        }
    }
});
// 
app.listen(process.env.PORT || 3000);



function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}