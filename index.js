const express = require('express');
const cronRoutes = require('./routes/cronRoutes');

const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extend: true, limit: '10kb' }));

app.use('/api/v1/crons', cronRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
