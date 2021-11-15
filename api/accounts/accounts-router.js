const router = require('express').Router();
const mdw = require('./accounts-middleware');
const Account = require('./accounts-model');

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const accounts = await Account.getAll()
    res.json(accounts)
  }
  catch (err) {
    next()
  }
})

router.get('/:id', mdw.checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  
  res.json(req.account)
  
})

router.post('/', mdw.checkAccountNameUnique, mdw.checkAccountPayload, async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const newAcc = await Account.create({name: req.body.name.trim(), budget: req.body.budget})
    res.status(201).json(newAcc)
  }
  catch (err) {
    next()
  }
})

router.put('/:id', mdw.checkAccountId, mdw.checkAccountNameUnique, mdw.checkAccountPayload, async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const updatedAcc = await Account.updateById(req.params.id, req.body)
    res.status(updatedAcc)
  }
  catch (err) {
    next()
  }
});

router.delete('/:id', mdw.checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    await Account.deleteById(req.params.id)
    res.json(req.account)
  }
  catch (err) {
    next()
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({message: err.message})
})

module.exports = router;
