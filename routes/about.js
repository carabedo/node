var express = require('express');
var router = express.Router();


const { pool } = require('../pg');



/* GET users listing. */
router.get('/', async function(req, res, next) {

  const result = await pool.query(`SELECT * FROM participantes`);
  res.render('about', { title: 'Nosotros' , participantes : result.rows});
});

module.exports = router;