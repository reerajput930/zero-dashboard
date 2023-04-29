const express = require("express");
const router = express.Router();
const userModel = require("../model/authentication");

const { login, signup, allusers } = require("../controller/user");
const {
  alltasks,
  singletask,
  singleupdate,
  addtask,
  updatetask,
  deletetask,
  descupdate,
} = require("../controller/task");

// ====== routes ======

// ========================== authentication====================
router.post("/login", login);
router.post("/signup", signup);
router.get("/allusers", allusers);
// =============================================================

// ================= TASK MANAGER CRUD OPERTION =================
router.get("/alltasks", alltasks);
router.get("/singletask/:id",singletask);
router.put("/singleupdate/:id",singleupdate);
router.post("/addtask", addtask);
router.put("/update", updatetask);
router.delete("/delete", deletetask);
router.put("/desc/update", descupdate);
//===============================================================

// ============== user profile ================
// fetch
router.get("/userdata/:email", async (req, res) => {
  console.log(req.params.email);
  try {
    const user = await userModel.findOne({
      email: req.params.email,
    });
    res.status(200).json({ status: "success", userData: user });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ status: "failed" });
  }
});

// update the data
router.put("/updatedata", async (req, res) => {
  console.log(req.body);
  const {
    firstName,
    lastName,
    linkedin,
    userdesc,
    status,
    image,
    email,
    
  } = req.body;
  try {
    const user = await userModel.findByIdAndUpdate(req.body._id, {
      firstName: firstName,
      lastName:lastName,
      linkedin:linkedin,
      status:status,
      userdesc:userdesc
    });
    console.log(user);

    res.status(200).json({ status: "success" });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ status: "failed" });
  }
});

module.exports = router;
