const express = require('express')
const { Deposit, Withdrawal, Transfer } = require("../models/transaction")

const router  = express.Router()



// getting single transaction
router.get('/:id', async(req, res) => {
  const { id } = req.params
  let transaction = null

  try {
    const deposit = await Deposit.findById(id)
    const withdrawal = await Withdrawal.findById(id)
    const transfer = await Transfer.findById(id)
    transaction = deposit || withdrawal || transfer

    if(!transaction) return res.status(400).send({message: "Transaction not found..."})   
    res.send(transaction);
  } 
  catch(e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
})



// getting all transactions
router.get('/', async (req, res) => {
  let transactions = []

  try {
    const deposits = Deposit.find();
    const withdrawals = Withdrawal.find();
    const transfers = Transfer.find();

    const arr = await Promise.all([deposits, withdrawals, transfers]);

    transactions = arr.flat();
    transactions.sort((a, b) => b.date - a.date);

    if (!transactions || transactions.length === 0) return res.status(400).send({message: "Transactions not found..."})
    res.send(transactions);
  } 
  catch(e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
});




// get all transactions by user
router.get('/user/:email', async(req, res) => {
  const { email } = req.params
  let transactions = []
  
  try {

    const deposits = Deposit.find({ from: email });
    const withdrawals = Withdrawal.find({ from: email });
    const transfers = Transfer.find({$or: [{from: email}, {to: email}]});

    const arr = await Promise.all([deposits, withdrawals, transfers]);

    transactions = arr.flat();
    transactions.sort((a, b) => b.date - a.date);

    if (!transactions || transactions.length === 0) return res.status(400).send({message: "Transactions not found..."})

    res.send(transactions);
  } 
  catch(e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
});


// Delete a transaction
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    let transaction = null;

    // Check if the transaction exists in the Deposit collection
    transaction = await Deposit.findById(id);
    if (transaction) {
      await Deposit.findByIdAndRemove(id);
      return res.send(transaction);
    }

    // Check if the transaction exists in the Withdrawal collection
    transaction = await Withdrawal.findById(id);
    if (transaction) {
      await Withdrawal.findByIdAndRemove(id);
      return res.send(transaction);
    }

    // Check if the transaction exists in the Transfer collection
    transaction = await Transfer.findById(id);
    if (transaction) {
      await Transfer.findByIdAndRemove(id);
      return res.send(transaction);
    }

    return res.status(404).send({message: "Transaction not found..."});
  } catch(e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
});



module.exports = router