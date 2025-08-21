require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const audienceRoutes = require('./routes/audienceRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/audience', audienceRoutes);

app.get('/', (req, res) => res.send('Server is running!'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));