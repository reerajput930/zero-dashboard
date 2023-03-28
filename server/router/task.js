const express = require("express")
const router = express.Router()

const { login,signup,allusers } = require( "../controller/user")
const { alltasks,
    addtask,
    updatetask,
    deletetask,
    descupdate} = require("../controller/task")


// ====== routes ======
 
// ========================== authentication====================
router.post('/login',login)
router.post('/signup', signup)
router.get ('/allusers',allusers) 
// ============================================================= 


// ================= TASK MANAGER CRUD OPERTION =================
router.get('/alltasks',alltasks )
router.post('/addtask',addtask) 
router.put('/update',updatetask)
router.delete('/delete',deletetask)
router.put('/desc/update',descupdate)
//===============================================================


module.exports = router  