var express = require('express');
var router = express.Router();
const ObjectId = require('mongodb').ObjectId;

router.get('/appointments', (req, res, next) => {
  req.collection.find({})
    .toArray() //transform to array
    .then(results => res.json(results))
    .catch(error => res.send(error))
})

router.post('/appointments', (req, res, next) => {
  const { appointmentDate, name, email } = req.body;
  if(!appointmentDate || !name || !email) {
    return res.status(400).json({
      message: 'Appointment date, name, and email are required',
    });
  }

  const payload = { appointmentDate, name, email }
  req.collection.insertOne(payload)
  .then(result => res.json(result.ops[0]))
  .catch(error => res.send(error));
});

router.delete('/appointments/:id', (req, res, next) => {
  const { id } = req.params;
  const _id = ObjectID(id);

  req.collection.deleteOne({_id})
    .then(result => res.json(result))
    .catch(error => res.send(error));
})

module.exports = router;


/* GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
*/