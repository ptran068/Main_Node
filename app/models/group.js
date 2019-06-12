import mongoose from 'mongoose';
import User from '../models/user';
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;
let groupSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required field'],
        maxlength:  [255, 'Name is too long'],
        minlength: [3, 'Name is too short']
        
    },
    lastMessage: {
        type: ObjectId,
        required: true
    },
    author: {
        type: ObjectId,
        ref: 'User'

    },
    members: [{
        type: [ObjectId],
        ref: 'User'
    }],
    deleteAt: {
        type: Date,
        default: null
    }
});

groupSchema.pre('find', function () {
    const query = this.getQuery();
    query['$or'] = [
        {
            deleteAt: null
        }
    ];
}, { timestamps: true});
groupSchema.pre('findById', function () {
    const query = this.getQuery();
    query['$or'] = [
        {
            deleteAt: null
        }
    ]
    
});



// groupSchema.pre('save', async function (next) {
    
//     const group = await Group.findOne({author:this.members});
//     if (group) {
//         return next( new Error('member is exist'));
//     }
  
// });


module.exports = mongoose.model('group',groupSchema);