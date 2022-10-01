const express = require('express');
const path = require('path');

const { check, validationResult } = require('express-validator');
const {printView, generatePdfParent} = require("../controller/homeController");

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname +'/../views/report2.html'));
});

router.get('/form', (req, res) => {
  res.render('form');
});

router.post("/print_report",
generatePdfParent
);

router.post("/download",
generatePdfParent
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
