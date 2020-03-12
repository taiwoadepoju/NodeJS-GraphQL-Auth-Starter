const winston = require('winston');
const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');

dotenv.config();
app.use(cors())

require('./startup/logging');
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/validation')();

const port = process.env.port || 4000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));
