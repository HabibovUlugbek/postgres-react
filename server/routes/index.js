const { Router } = require("express");
const router = Router();

router.use("/company", require("./company"));
router.use("/technology", require("./technology"));

module.exports = router;
