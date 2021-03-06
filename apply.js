const express = require('express');
const { check, validationResult } = require('express-validator/check');
const { insert } = require('./db');

const router = express.Router();


const validation = [
  check('name').isLength({ min: 1 }).withMessage('Nafn má ekki vera tómt'),
  check('email').isLength({ min: 1 }).withMessage('Netfang má ekki vera tómt'),
  check('email').isEmail().withMessage('Netfang verður að vera netfang'),
  check('phone').matches(/^[0-9]{3}(-| )?[0-9]{4}$/).withMessage('Símanúmer verður að vera gilt'),
  check('text').isLength({ min: 6 }).withMessage('Kynning verður að innihalda amk. 100 orð'),
  check('job').isLength({ min: 1 }).withMessage('Velja þarf eitt starf'),
];

const sanitazion = [

];

function form(req, res) {
  res.render('index', {
    title: 'Atvinnuumsókn', name: '', email: '', phone: '', text: '', job: '', errors: [], validRed: [],
  });
}

async function apply(req, res) {
  const {
    body: {
      name, email, phone, text, job,
    } = {},
  } = req;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array();
    const isError = [];
    errorMessages.forEach((error) => {
      isError.push(error.param);
    });
    res.render('index', {
      name, email, phone, text, job, errors: errorMessages, validRed: isError,
    });
  } else {
    try {
      await insert(name, email, phone, text, job, 'false');
    } catch (err) {
      res.render('error');
      throw err;
    }
    res.render('thanks');
  }
}

router.get('/', (form));
router.post('/apply', validation, sanitazion, (apply));

module.exports = router;
