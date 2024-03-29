let express = require('express');
let router = express.Router();
const connection = require('mysql2-promise')();

connection.configure({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'todo_app',
  authPlugin: 'none',
});

router.get('/', async (req, res) => {
  try {
    const [results] = await connection.query('select * from tasks;');
    console.log(results);
    res.render('index', {
      title: 'ToDo List App',
      todos: results,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving tasks');
  }
});

router.post('/', async (req, res) => {
  try {
    const todo = req.body.add;
    const [results] = await connection.query(
      `insert into tasks (user_id, content) values (1, '${todo}');`
    );
    console.log(results);
    console.log('Task added successfully');
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding task' });
  }
});

router.post('/delete/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await connection.query('delete from tasks where id = ?;', [id]);
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting task');
  }
});

module.exports = router;
