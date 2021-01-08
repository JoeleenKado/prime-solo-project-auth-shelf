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
  let queryText = 'SELECT * FROM item';
  
  pool.query(queryText).then((result) => {
      res.send(result.rows);
  }).catch((error) => {
      console.log(error);
      res.sendStatus(500);
  });
});


/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  console.log('made it to the shelf POST route')
  console.log(req.body)
  console.log('isAuthenticated?', req.isAuthenticated());
  let id = req.user.id;
  let queryText = `INSERT INTO item (description, image_url, user_id) VALUES ($1, $2, $3)`;
  pool.query( queryText, [req.body.description, req.body.image_url, id])
  .then(() => {
    res.sendStatus(201); //do 201 because 201 means created
  }).catch((error) => {
    console.log(error);
    res.sendStatus(500);
  });
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id/:user_id', rejectUnauthenticated, (req, res) => {
  // DELETE route code here
  console.log('made it to the shelf DELETE route');
  console.log('Payload in the route:', 'id:',req.params.id, 'user_id:', req.params.user_id)
  console.log('user_id not from a body at all', req.user.id)
  let itemID = req.params.id;
  let userID = req.params.user_id;
  //you can other compare item user_id from the item to the user that is logged in
  //or you can only render delete for items that match the logged in user_id 
  // req.body.user_id is from ITEM table
  // itemID is from USER table
  // if the item to delete matches the user logged in's ID, delete.
  let queryText ='';
  if(Number(userID) === req.user.id) { 
    queryText = `DELETE FROM item WHERE id = $1;`;
  }else {
    console.log('You are not allowed to delete another user\'s item!'); 
  }
  pool.query( queryText, [itemID])
  .then(() => {
    res.sendStatus(202); //do 201 because 202 means created //200 means deleted  200 = Okay, 202 = Aceepted
  }).catch((error) => {
    console.log(error);
    res.sendStatus(204); // do 204 becuase it means there was no content to delete
  });
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
