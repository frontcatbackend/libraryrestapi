const Router = require('express')
const router = new Router()

const catalogRouter = require('./catalogRouter')
const userRouter = require('./userRouter')

router.use('/catalog', catalogRouter)
router.use('/user', userRouter)

module.exports = router