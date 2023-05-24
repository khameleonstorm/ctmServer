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

  // check if nin and user already exists
  if (Nin.findOne({ nin })) return res.status(400).send({message: 'Nin already exists'});
  if (User.findOne({ email })) return res.status(400).send({message: 'User already exists'});


  const newNin = new Nin({ name, email, nin });
  try {
    const result = await newNin.save();
    res.send(result);
  }
  catch (e) { for(i in e.errors) res.status(500).send({message: e.errors[i].message}) 
}

});


module.exports = router;