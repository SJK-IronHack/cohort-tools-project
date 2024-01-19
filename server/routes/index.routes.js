const router = require('express').Router();


router.get('/', (req, res) => {
    res.json('All OK')
})

const studentsRouter = require('./students.routes')
router.use('/students', studentsRouter);

const cohortsRouter = require('./cohorts.routes')
router.use('/cohorts', cohortsRouter);

module.exports = router