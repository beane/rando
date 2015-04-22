var express = require('express');
var router = express.Router();

/*
 * optional query params:
 *  count - the number of dice to be thrown
 *    min 1 (default)
 *    max 50
 *  size  - the number of sides on each die (ie d20)
 *    default 6
 *    min 2
 *    max 50
 * returns an array of pseudorandom numbers
 */
router.get('/dice', function(req, res, next) {
  var numDice = +req.query.count || 1;
  var dieSize = +req.query.size  || 6;

  if (numDice > 50) { res.status(422).send("too many dice, dickwad"); return; };
  if (numDice <= 0) { res.status(422).send("too few dice, dickwad"); return; };
  if (dieSize <  2) { res.status(422).send("dice too damn small, dickwad"); return; };
  if (dieSize > 50) { res.status(422).send("dice too damn big, dickwad"); return; };

  var diceRolls = []
  for(var i=0; i<numDice; i++) {
    diceRolls.push(Math.floor((Math.random() * dieSize)) + 1);
  }
  res.send(JSON.stringify(diceRolls));
});

module.exports = router;
