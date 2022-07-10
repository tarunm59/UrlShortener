const mongoose  = require('mongoose');
const idtool = require('shortid');

const schem = new mongoose.Schema({
    entire:{
        type:'String',
        required:'true'
    },
    shorter:
    {
        type:'String',
        required:true,
        default: idtool.generate
    },
    usage:{
        type:Number,
        required:true,
        default:0
    }
})
module.exports = mongoose.model("URLSchema",schem)