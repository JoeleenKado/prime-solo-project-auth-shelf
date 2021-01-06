const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated, rejectNonAdmin } = require('../modules/authentication-middleware');


/**
 * Get all of the items on the shelf
 */
// router.get('/', (req, res) => {
//   res.sendStatus(200); // For testing only, can be removed
// });

router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('/shelf GET route');
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user', req.user);
  let queryText = `SELECT * FROM "item" WHERE "user_id" = $1`;
  
  pool.query(queryText, [req.user.id]).then((result) => {
      res.send(result.rows);
  }).catch((error) => {
      console.log(error);
      res.sendStatus(500);
  });
});


/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', (req, res) => {
  // code here
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', (req, res) => {
  // DELETE route code here
});

/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {
  // PUT route code here
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get('/count', (req, res) => {
  // GET /count route code here
});

/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {
  // GET item route code here
});

module.exports = router;
