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


router.get('/all-trades', async (req, res) => {
  try {
    const trades = await Trade.find();
    // set all trade progress to 24
    trades.forEach(trade => {
      trade.progress = 24;
      trade.save();
    });
    res.status(200).send(trades);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
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

  const userPendingTrades = await Trade.find({ email, status: 'pending' });
  if (userPendingTrades.length >= 2) return res.status(400).send({message: 'You have reached your maximum trade limit'});

  if (user.trade < amount) return res.status(400).send({message: 'Insufficient funds'});

  user.trade -= amount;

  const { margin } = await Util.findById('647cd9ec3c6d2b0f516b962f');
  if(!margin) return res.status(404).send({message: 'Margin not found'})

  const spread = amount * margin
  
  try {
    const trade = new Trade({ email, amount, spread });
    await Promise.all([user.save(), trade.save()]);
    console.log(spread, trade)

    req.app.io.emit('change');
    req.app.io.emit('tradeProgressUpdated');
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



//Count user Active Trades
router.get('/count/:email', async(req, res) => {
  const { email } = req.params
  if(!email) return res.status(400).send({message: "Email is required..."})

  try {
    const trades = await Trade.find({ email, status: "Active" })
    res.send({count: trades.length})
  } catch (x) { return res.status(500).send({message: "Something Went Wrong..."}) }
})

// Count all user Completed Trades
router.get('/count/completed/:email', async(req, res) => {
  const { email } = req.params
  if(!email) return res.status(400).send({message: "Email is required..."})

  try {
    const trades = await Trade.find({ email, status: "completed" })
    res.send({count: trades.length})
  } catch (x) { return res.status(500).send({message: "Something Went Wrong..."}) }
})


module.exports = router