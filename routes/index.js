const express = require('express');
const path = require('path');

const { check, validationResult } = require('express-validator');

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname +'/../views/report2.html'));
});

router.get('/form', (req, res) => {
  res.render('form');
});

router.post("/print_report",
[
  check('Hct_1').isInt()
  .withMessage("Please enter numeric value")
],
(req, res) => {
  const errors = validationResult(req);
  
  //console.log(req.body);
  console.log(errors);
  res.render("print_report", {data : req.body});
} 
);

router.post('/form', 
[
    check('name')
      .isLength({ min: 1 })
      .withMessage('Please enter a name'),
    check('email')
      .isLength({ min: 1 })
      .withMessage('Please enter an email'),
  ],
(req, res) => {
{
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      res.send('Thank you for your registration!');
    } else {
      res.render('form', {
        title: 'Registration form',
        errors: errors.array(),
        data: req.body,
      });
    }
  }
});

module.exports = router;
