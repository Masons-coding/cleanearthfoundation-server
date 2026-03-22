require('dotenv').config();
const PORT = process.env.DB_LOCAL_PORT || 8000;

const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const usersRouter = require('./routes/usersRouter.js');
const cleanUpsRouter = require('./routes/cleanUpsRouter.js');
const socialPostRoute = require('./routes/socialPost.js');
const requireApiKey = require("./middleware/requireApiKey.js");

app.use(cors());
app.use(express.json());
app.use(requireApiKey);

app.use('/users', usersRouter);
app.use('/cleanups', cleanUpsRouter);

// New upload + post routes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/social-post', socialPostRoute);

app.listen(PORT, () => {
    console.log(`Application running on ${PORT}`);
});
