const express = require('express')
const { Deposit, validateDeposit } = require("../models/transaction")
const { User } = require("../models/user")

const router  = express.Router()


// getting all deposits
router.get('/', async(req, res) => {
  try {
    const deposits = await Deposit.find()
    res.send(deposits)
  } catch(e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
})


// getting single deposit
router.get('/:id', async(req, res) => {
  const { id } = req.params

  try {
    const deposit = await Deposit.findById(id)
    if(!deposit) return res.status(400).send({message: "Deposit not found..."})
    res.send(deposit);
  }
  catch(e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
})



// get all deposits by user
router.get('/user/:email', async(req, res) => {
  const { email } = req.params

  try {
    const deposits = await Deposit.find({ from: email });
    if (!deposits || deposits.length === 0) return res.status(400).send({message: "Deposits not found..."})
    res.send(deposits);
  }
  catch(e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
})


// making a deposit
router.post('/', async (req, res) => {
  const { type, from, method, hash, amount } = req.body;
  const { error } = validateDeposit(req.body);

  if (error) return res.status(400).send({message: error.details[0].message})

  const user = await User.findOne({ email: from });
  if (!user) return res.status(404).send({message: 'User not found'})
  
  try {
    // Create a new Deposit instance
    const deposit = new Deposit({ type, from, method, hash, amount });
    await deposit.save();

    res.send({message: 'Deposit successful', deposit});
  } catch(e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
});


// updating a deposit
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { from, amount, status } = req.body;
  const { error } = validateDeposit(req.body);

  if (error)  return res.status(400).send({message: error.details[0].message})

  const deposit = await Deposit.findById(id);
  if (!deposit) return res.status(404).send({message: 'Deposit not found'})

  const user = await User.findOne({ email: from });
  if (!user) return res.status(404).send({message: 'User not found'})
  
  try {
    const [updatedDeposit, updatedUser] = await Promise.all([
      Deposit.findByIdAndUpdate(id, { from, amount, status }, { new: true }),
      User.findOneAndUpdate({ email: from }, { $inc: { balance: amount } }, { new: true })
    ]);

    if (!updatedDeposit || !updatedUser) throw new Error('Failed to update deposit and user')

    res.send(updatedDeposit);
  } catch(e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
});


module.exports = router;
