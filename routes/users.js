var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/saludos/', function(req, res, next) {
  res.render('saludos_vista', { title: 'Creando Vistas' });
});

module.exports = router;