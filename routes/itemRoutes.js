const express = require('express'); // Express
const router = express.Router(); // Router
const Item = require('../model/Item'); // Model
const auth = require('../middleware/auth');

// Routes
router.get('/', (req, res) => {
    Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items))
})

router.post('/', auth, (req, res) => {
    const item = new Item({
        name: req.body.name
    });
    item.save()
    .then(() => {
        res.status(200).send(item)
    })
    .catch((err) => {
        res.status(400).send(err)
    })
})

router.delete('/:id', auth, (req, res) => {
    const item = Item.findByIdAndDelete(req.params.id);
    item
    .then(() => {
        res.status(200).send()
    })
    .catch(err => {
        res.status(400).send()
    })
})


module.exports = router 