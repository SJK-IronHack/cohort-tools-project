const router = require('express').Router();

router.get('/', (req, res) => {
    res.json({status: "success", message: "All OK"});
})

const studentsRouter = require('./students.routes')
router.use('/students', studentsRouter);

const cohortsRouter = require('./cohorts.routes')
router.use('/cohorts', cohortsRouter);

const userRouter = require('./user.routes')
router.use('/user', userRouter);

module.exports = router