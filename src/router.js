const express = require('express');
const userController = require('./controllers/user/index'); // the "/index" part of the path is technically not required here, by default, when provided with a folder, the index file will be imported
const taskController = require('./controllers/tasks/index')
const addModelsToRequest = require('./middleware/add-models-to-request');
const checkAuthentication = require('./middleware/check-authentication');

const Router = express.Router();
Router.use(addModelsToRequest);

//users
Router.get('/users', userController.list);
Router.post('/users', userController.create);
Router.get('/users/:id', userController.show);
Router.delete('/users/:userId', checkAuthentication, userController.deleteUser);

Router.post('/login', userController.login);
Router.delete('/logout', userController.logout);
Router.get('/me', userController.showMe);

//tasks
Router.post('/users/:userId/tasks', checkAuthentication, taskController.createTask);
Router.get('/users/:userId/tasks', taskController.listTasks);
Router.put('/tasks/:taskId', taskController.updateTask);
Router.delete('/tasks/:taskId', checkAuthentication, taskController.deleteTask);



// These actions require authentication (only valid logged in users can do these things)
// The checkAuthentication middleware will only run for these specified routes.
Router.patch('/users/:id', checkAuthentication, userController.update);
Router.get('/logged-in-secret', checkAuthentication, (req, res) => {
  res.send({ msg: 'The secret is: there is no secret.' });
});

module.exports = Router;

