let express = require('express');
let router = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'todo_app',
  authPlugin: 'none',
});

router.get('/', function (req, res, next) {
  connection.query(
    `select * from tasks;`,
    (error, results) => {
      console.log(error);
      console.log(results);
      res.render('index', {
        title: 'ToDo List App',
        todos: results,
      });
    }
  );
});

router.post('/', function(req, res, next) {
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting:', err);
    } else {
      console.log('Connected to MySQL server');
    }
  });
  const todo = req.body.add;
  connection.query(
    `insert into tasks (user_id, content) values (1, '${todo}');`,
    (error, results) => {
      console.log(error);
      res.redirect('/');
    }
  );
});

router.post('/delete/:id', function(req, res, next) {
  const id = req.params.id;
  connection.query(
    `delete from tasks where id = ?;`,
    [id],
    (error, results) => {
      console.log(error);
      if (error) {
        res.status(500).send('Error deleting task');
      } else {
        res.redirect('/');
      }
    }
  );
});

module.exports = router;
