const Service = require("../controller/controller");

const router = require("express").Router();

router.post("/create", Service.create);
router.post("/add", Service.add);
router.get("/find", Service.findAll);
router.get("/find/:id", Service.findById);
router.put("/update", Service.update);
router.delete("/delete/:id", Service.removeById);
router.post("/findname", Service.findByName);
router.post("/bulk", Service.bulk);





module.exports = router;