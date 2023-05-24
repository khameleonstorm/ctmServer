const express = require('express')
const { Trade, validateTrade } = require("../models/trade")
const { User } = require("../models/user")
const { Util } = require("../models/util")

const router  = express.Router()

// getting all trades
router.get('/', async(req, res) => {
  try {
    const trades = await Trade.find()
    res.send(trades)
  } catch (x) { return res.status(500).send({message: "Something Went Wrong..."}) }
})


// getting a trade
router.get('/:id', async(req, res) => {
  const { id } = req.params
  try {
    const trade = await Trade.findById(id)
    if (!trade) return res.status(404).send({message: "Trade not found..."})
    res.send(trade);
  } catch(e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
});


// getting all trades of a user
router.get('/user/:email', async(req, res) => {
  let trades = []
  const { email } = req.params
  try {
    trades = await Trade.find({ email })
    trades.sort((a, b) => b.startDate - a.startDate);
    if (!trades) return res.status(404).send({message: "Trade not found..."})
    res.send(trades);
  } catch(e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
});


// making a trade
router.post('/', async (req, res) => {
  const { email, amount } = req.body;
  const { error } = validateTrade(req.body);

  if (error) return res.status(400).send({message: error.details[0].message});

  const user = await User.findOne({ email });
  if (!user) return res.status(404).send({message: 'User not found'});

  if (user.trade < amount) return res.status(400).send({message: 'Insufficient funds'});

  user.trade -= amount;

  const { margin } = await Util.findById('64651c2d2d1c6590fc72daad');
  if(!margin) return res.status(404).send({message: 'Margin not found'})

  const spread = amount * margin
  
  try {
    const trade = new Trade({ email, amount, spread });
    await Promise.all([user.save(), trade.save()]);

    res.status(200).send({ trade, margin, spread });
  } catch (error) { for (i in error.errors) res.status(500).send({message: error.errors[i].message}) }
});


// updating a trade
router.put('/:id', async (req, res) => {
  const { email, amount, progress, status } = req.body;
  const { id } = req.params;
  const { error } = validateTrade(req.body);

  if (error) return res.status(400).send({message: error.details[0].message});

  const trade = await Trade.findById(id);
  if (!trade) return res.status(404).send({message: 'Trade not found'});

  try {
    trade.email = email;
    trade.amount = amount;
    trade.progress = progress;
    trade.status = status;

    await trade.save();
    res.send(trade);
  } catch (error) { for (i in error.errors) res.status(500).send({message: error.errors[i].message}) }

})


// deleting a trade
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const trade = await Trade.findByIdAndRemove(id);
    if (!trade) return res.status(404).send({message: 'Trade not found'});

    res.send(trade);
  } catch (error) { for (i in error.errors) res.status(500).send({message: error.errors[i].message}) }
})


module.exports = router