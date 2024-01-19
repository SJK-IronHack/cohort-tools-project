const router = require('express').Router();
const { isAuthenticated } = require('../middlewares/route-guard.middleware')

router.get('/', (req, res) => {
    res.json({status: "success", message: "All OK"});
})

const studentsRouter = require('./students.routes')
router.use('/students', studentsRouter);

const cohortsRouter = require('./cohorts.routes')
router.use('/cohorts', cohortsRouter);

const userRouter = require('./users.routes')
router.use('/users', isAuthenticated, userRouter);

module.exports = router