const express = require('express');
const router = express.Router();
const { generateAudience } = require('../controllers/audienceController');

router.post('/generate', generateAudience);

module.exports = router;