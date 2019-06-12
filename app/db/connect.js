import mongoose from 'mongoose';
import config from '../config/index';

mongoose.Promise = global.Promise;

const connectToDb = async () => {
    return await mongoose.connect(config.db, { useNewUrlParser: true } );
};

export default connectToDb;