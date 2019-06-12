import express from 'express';
import bodyParser from 'body-parser';
import connectToDb from './app/db/connect';
import {group} from './app/routes';

const app = express();

connectToDb().then(() => console.log('Connected db')).catch(e => {
	console.error(e);
	process.exit();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


app.use(group);


app.use((e, req, res, next) => {
	console.log(e);
	return res.status(400).json({
		isSuccess: false,
		message: e.message || 'Have error', // Get message from new Error()
		error: e.stack || e
	})
});
app.listen(3000, () => {
    console.log('Server started at: 3000');
});
