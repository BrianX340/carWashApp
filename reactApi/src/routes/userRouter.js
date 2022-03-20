const router = require("express").Router();
const { createOperation, deleteOperation, updateOperation } = require("../controllers/userController");

const checkToken = require("../middlewares/checkToken");

router.post("/createOperation", checkToken, createOperation);
router.post('/deleteOperation', checkToken, deleteOperation);
router.post('/updateOperation', checkToken, updateOperation);

module.exports = router;