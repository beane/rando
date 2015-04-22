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

  var diceRolls = [];
  for(var i=0; i<numDice; i++) {
    diceRolls.push(Math.floor((Math.random() * dieSize)) + 1);
  }
  res.send(JSON.stringify(diceRolls));
});

/*
 * optional query params:
 *  count - the number of coins to be tossed
 *    min 1 (default)
 *    max 50
 * returns an array of 1s and 0s
 */
router.get('/coins', function(req, res, next) {
  var numCoins = +req.query.count || 1;

  if (numCoins > 50) { res.status(422).send("too many coins, dickwad"); return; };
  if (numCoins <= 0) { res.status(422).send("too few coins, dickwad"); return; };

  var coinFlips = [];
  for(var i=0; i<numCoins; i++) {
    coinFlips.push(Math.floor((Math.random() * 2)));
  }
  res.send(JSON.stringify(coinFlips));
});

router.get('/shuffle', function(req, res, next) {
  var items = req.query.items || [];
  if(items.length > 50) { res.status(422).send("too many items, dickwad"); return; };
  var temp = items[0];
  // how to enforce that items must be an array?

  for(var i=0, n=items.length; i<n; i++) {
    // j is an index where i <= j < n.
    // basically, it's any index between
    // itself and the end of the array
    var j = Math.floor(Math.random() * (n-i)) + i;
    temp = items[i];
    items[i] = items[j];
    items[j] = temp;
  }
  res.json(items);
});

router.post('/odds', function(req, res, next) {
  res.json("never tell me the odds")
});

module.exports = router;

