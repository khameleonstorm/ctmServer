const express = require('express')
const { Withdrawal, validateWithdrawal } = require("../models/transaction")
const { User } = require("../models/user")
const { alertAdmin } = require("../utils/mailer")


const router  = express.Router()



// getting all withdrawals
router.get('/', async(req, res) => {
  try {
    const withdrawals = await Withdrawal.find()
    res.send(withdrawals)
  } catch(e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
})


// getting single withdrawal
router.get('/:id', async(req, res) => {
  const { id } = req.params
  
  try {
    const withdrawal = await Withdrawal.findById(id)
    if(!withdrawal) return res.status(400).send({message: "Withdrawal not found..."})
    res.send(withdrawal);
  }
  catch(e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
})



// get all withdrawals by user
router.get('/user/:email', async(req, res) => {
  const { email } = req.params

  try {
    const withdrawals = await Withdrawal.find({ from: email });
    if (!withdrawals || withdrawals.length === 0) return res.status(400).send({message: "Withdrawals not found..."})
    res.send(withdrawals);
  }
  catch(e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
})


// making a withdrawal
router.post('/', async (req, res) => {
  const { type, from, method, wallet, amount } = req.body;
  const { error } = validateWithdrawal(req.body);

  if (error) return res.status(400).send({message: error.details[0].message})

  const user = await User.findOne({ email: from });
  if (!user) return res.status(404).send({message: 'User not found'})
  console.log(amount)

  if (user.balance < amount) return res.status(400).send({message: 'Insufficient balance'})
  
  try {
    // Create a new Withdrawal instance
    const withdrawal = new Withdrawal({ type, from, method, wallet, amount });
    await withdrawal.save();
    const date = withdrawal.createdAt;

    alertAdmin(from, amount, date, type)
    res.send(withdrawal);
  } catch(e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
})


// updating a withdrawal
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { from, amount, status } = req.body;
  const { error } = validateWithdrawal(req.body);

  if (error) return res.status(400).send({message: error.details[0].message})

  const withdrawal = await Withdrawal.findById(id);
  if (!withdrawal) return res.status(404).send({message: 'Withdrawal not found'})

  const user = await User.findOne({ email: from });
  if (!user) return res.status(404).send({message: 'User not found'})

  if (user.balance < amount) return res.status(400).send({message: 'Insufficient balance'})
  
  try {
    user.balance -= amount;
    user.withdraw += amount;
    withdrawal.status = status;

    await Promise.all([user.save(), withdrawal.save()]);

    res.send(user);
  } catch(e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
});



module.exports = router;



