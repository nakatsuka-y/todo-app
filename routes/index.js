var express = require('express');
var router = express.Router();

/* GET home page. */
/* router.get('/', function(req, res, next) {
  res.render('index', { title: 'ToDo List App' });
}); */
router.get('/', function(req, res, next) {
  res.redirect("todolist")
});

/* GET todo list */
router.get('/todolist', function(req, res, next) {
  var db = req.db;
  var collection = db.get('todocollection');
  collection.find({},{},function(e,docs){
    res.render('todolist', {
	  "todolist": docs
	});
  });
});

/* GET new task */
router.get('/newtask', function(req, res, next) {
  res.render('newtask', { title: 'Add New Task' });
});

/* POST add task */
router.post('/addtask', function(req, res, next) {
  // Set internal DB variable
  var db = req.db;

  // Get form values
  var task = req.body.task;

  // Set collection
  var collection = db.get('todocollection');

  // Submit to DB
  collection.insert({
    "checked": false,
    "task": task
  }, function(err, doc){
    if (err) {
	  // If failed, return error
	  req.send("There was a problem adding the information to the database");
	}
	else {
	  // Forward to success page
	  res.redirect("todolist");
	}
  });
});

/* POST update task */
router.post('/updatetask', function(req, res, next) {
  // Set internal DB variable
  var db = req.db;

  // Get form values
  var task = req.body.task;
  var checked = req.body.checked;
  console.log(req.body)

  // Set collection
  var collection = db.get('todocollection');

  // Submit to DB
  collection.findOneAndUpdate(
    {"task": task},
    {$set: {"checked": checked, "task": task}},
    function(err, doc){
      if (err) {
        // If failed, return error
        req.send("There was a problem adding the information to the database");
      }
      else {
        // Forward to success page
        res.redirect("todolist");
      }
    }
  );
});

/* POST delete task */
router.post('/deletetask', function(req, res, next) {
  // Set internal DB variable
  var db = req.db;

  // Get form values
  var task = req.body.task;
  var checked = req.body.checked;
  console.log(req.body)

  // Set collection
  var collection = db.get('todocollection');

  // Submit to DB
  collection.remove(
    {"task": task},
    function(err, doc){
      if (err) {
        // If failed, return error
        req.send("There was a problem adding the information to the database");
      }
      else {
        // Forward to success page
        res.redirect("todolist");
      }
    }
  );
});

module.exports = router;
