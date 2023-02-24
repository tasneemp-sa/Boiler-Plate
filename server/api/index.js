// apiRoutes/index.js
const router = require('express').Router();

router.use('/auth', require('./auth')); // matches all requests to  /api/puppies/


// Sloths?!?! Get outta town!
router.use(function (req, res, next) {
    const err = new Error('Not found.');
    err.status = 404;
    next(err);
  });

 

module.exports = router;