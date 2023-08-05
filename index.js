const express = require('express');
const globalErrorHandler = require('./controllers/errorController');
require('dotenv').config();

const cronRoutes = require('./routes/cronRoutes');

const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use('/api/v1/crons', cronRoutes);

app.all('*', (req, res, next) => {
  res.status(404).send(`Can't find ${req.originalUrl} on this server!`);
});

app.use(globalErrorHandler);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
