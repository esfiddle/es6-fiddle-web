var mongoose = require('./mongoose'),
    Schema = mongoose.Schema;

var fiddlesSchema = new Schema({

    userId:{    
        type:mongoose.Schema.Types.ObjectId,
    },
    fiddle:{
        type:String,
        require:true
    },
    value:{
        type:String,
        require:true
    },
    starCounter:{
        type:Number,
        default: 0
    },
    isPrivate:{
        type:Boolean,
        default: false
    }


});

var Fiddles = mongoose.model('Fiddles', fiddlesSchema);

module.exports = Fiddles

