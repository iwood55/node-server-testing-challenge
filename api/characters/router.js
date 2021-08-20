const router = require('express').Router()
const Characters = require('./model')

router.post('/', async (req, res, next) => {
try {
const newChar = await Characters.add(req.body)
   res.status(201).json(newChar)
} catch(err) {
    next(err)
}})

router.delete('/:id', async (req, res, next) => {
const { id } = req.params
   const remove = await Characters.deleteChar(id)
   res.status(200).json(remove)
   next()
})
module.exports = router