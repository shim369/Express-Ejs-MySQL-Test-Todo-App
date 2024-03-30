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
    res.status(500).send('Error retrieving tasks', error);
  }
});

router.post('/', async (req, res) => {
  try {
    const content = req.body.content;
    const [results] = await connection.query(
      `insert into tasks (user_id, content) values (1, '${content}');`
    );
    res.send({ message: 'Task added successfully', todos: results });
  } catch (error) {
    res.status(500).json({ message: 'Error adding task', error });
  }
});

router.post('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await connection.query('delete from tasks where id = ?;', [id]);
    res.redirect('/');
  } catch (error) {
    res.status(404).send('Task not found', error);
  }
});

module.exports = router;
