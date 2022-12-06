require('dotenv').config();
const PORT = process.env.DB_LOCAL_PORT || 8000;

const usersRouter = require('./routes/usersRouter.js');
// const cleanUpsRouter = require('./routes/cleanUpsRouter.js');

const express = require('express');
const app = express();

const cors = require('cors');

app.use(cors());

app.use(express.json());

app.use('/users', usersRouter);
// app.use('/cleanups', cleanUpsRouter);

app.listen(PORT, () => {
    console.log(`Application running on ${PORT}`);
});
