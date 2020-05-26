const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const wordRoutes = require('./word.route');
const contractorRoutes = require('./contractor.route');



const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/word', wordRoutes);
router.use('/contractor', contractorRoutes);



module.exports = router;
