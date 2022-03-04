const express = require('express')
const { OK } = require('http-status-codes')

const wrap = require('../wrap.js')
const { routers } = require('../constants')

const { userController } = require('../controllers')

const router = express.Router()

router.get(routers.USER+"/contar", wrap(userController.contarUsers))

router.get(routers.USER, wrap(userController.listUsers))

router.post(routers.USER, wrap(userController.createUser))

router.put(routers.USER, wrap(userController.updateUser))

router.delete(routers.USER, wrap(userController.deleteUser))

router.get(routers.HEALTH, wrap(async (req, res) => {
    res.status(OK).json({ message: 'OK' })
}));
router.get("/test_users_ci", wrap(async (req, res) => {
    res.status(OK).json({ message: 'THis a test for users ci' })
}));

module.exports = router;