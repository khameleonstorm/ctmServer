const express = require('express')
const { Nin, validateNin } = require("../models/nin")
const { User } = require("../models/user")

const router  = express.Router()

// getting all nins
router.get('/', async(req, res) => {
  try {
    const nins = await Nin.find()
    res.send(nins)
  } catch (x) { return res.status(500).send({message: "Something Went Wrong..."}) }
})


// getting a nin
router.get('/:id', async(req, res) => {
  const { id } = req.params
  try {
    const nin = await Nin.findById(id)
    if (!nin) return res.status(404).send({message: "Nin not found..."})
    res.send(nin);
  } catch(e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
})


// creating a nin
router.post('/', async (req, res) => {
  const { name, email, nin } = req.body;
  const { error } = validateNin(req.body);

  if (error) return res.status(400).send({message: error.details[0].message});
  console.log(req.body)

  // check if nin already exists
  let userNin = await Nin.findOne({ $or: [{email}, {nin}] })
  if (userNin) return res.status(400).send({message: 'Nin already exists'});

  const newNin = new Nin({ name, email, nin });
  try {
    const result = await newNin.save();
    res.send(result);
  }
  catch (e) { for(i in e.errors) res.status(500).send({message: e.errors[i].message}) 
}

});


// approving a nin
router.put('/', async (req, res) => {
  const { email, nin } = req.body;

  
  try {
    let user = await User.findOne({ email });
    let userNin = await Nin.findOne({ $or: [{email}, {nin}] })
    if (!user) return res.status(404).send({message: "User not found..."})
    if (!userNin) return res.status(404).send({message: "Nin not found..."})
    
    userNin.status = true;
    user.idVerified = true;
    console.log(userNin, user)

    await Promise.all([user.save(), userNin.save()]);
    res.send({message: "Nin approved successfully..."});
  } catch (e) { for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
});


module.exports = router;