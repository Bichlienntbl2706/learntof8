const express = require("express");
const router = express.Router();

const siteController = require('../app/controllers/SiteController')

router.use('/search', newsController.search);
router.use('/', newsController.index);


module.exports = router;