const express = require('express');

const { PORT } = require('./config/app');
const routes = require('./routes/index');

const app = express();

app.use(express.json());

app.use((e, req, res, next) => {
	if (e) {
		const error = 'Could not decode request: JSON parsing failed';
		res.status(400).send({ error });
	} else {
		next();
	}
});
app.use('/', routes);

const server = app.listen(process.env.PORT || PORT, () => {
	console.log(`Info: server listening at port ${process.env.PORT || PORT}`);
});

module.exports = server;
