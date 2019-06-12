import mongoose from 'mongoose';
// import Group from '../models/group'
// import { fileURLToPath } from 'url';
const Schema = mongoose.Schema;
let userSchema = new Schema({
    gender: Boolean,
    fullName: {
        firstName: {
            type: String,
            maxlength: [255, 'Firstname is too long']
        },
        lastName: {
            type: String,
            maxlength: [255, 'Lastname is too long']
        }
    },
    email: {
        type: String,
        required: [true, 'Email is required field'],
        unique: true,
        //unique : k cho trung email khi create new user
        maxlength: [255, 'Email is too long']
    },
    password: {
        type: String,
        required: [true, 'Password is required firld'],
        maxlength: [255, 'Password is too long']
    },
    refNames: {
        type: String
    },
    deleteAt: {
        type: Date,
        default: null

    }
});
// userSchema.pre('find', function() {
// 	const query = this.getQuery();
//     query['$or'] = [
//         {
//             isDelete: false
//         },
//         {
//             isDelete: null
//         }
//     ]
// });

// userSchema.pre('findOne', function() {
// 	const query = this.getQuery();
//     query['$or'] = [
//         {
//             isDelete: false
//         },
//         {
//             isDelete: null
//         }
//     ]
// });

// userSchema.post('findOne', function(doc) {
// 	// doc.version = 1;
//   console.log('post find is executing...');
// });

userSchema.pre('find', function() {
    preFindMiddleware(this.getQuery());
});

userSchema.pre('findOne', function() {
    preFindMiddleware(this.getQuery());
});

userSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        return next(new Error('this email has been using'));
    }
    return  next(error);
});

function preFindMiddleware(query) {
    return query.deletedAt = null;
}




module.exports = mongoose.model('User',userSchema);