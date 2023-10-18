import Task from './Task/Task';
import Server from './Server/Server';

class App {
  _urls = {
    todos: 0,
    users: 1,
  };
  _users;
  _tasks = [];
  _tasksElements = [];

  constructor() {
    this._server = new Server();
    this._toDoInput = document.querySelector('#new-todo');
    this._userSelect = document.querySelector('#user-todo');
    this._addButton = document.querySelector('button');
    this._toDoList = document.querySelector('#todo-list');
  }

  init() {
    this._server.read(this._urls.users).then((data) => {
      if (data !== 0) this._users = data;

      for (let user in this._users) {
        const option = new Option(this._users[user], this._users[user]);
        this._userSelect.append(option);
      }
    });

    this._server.read(this._urls.todos).then((data) => {
      if (data !== 0) {
        for (let i = 0; i < data.length; i++) {
          const todoItem = new Task(data[i].id, data[i].title, this._users[data[i].userId], data[i].completed);
          this._toDoList.append(todoItem.getElement());
        }
      }
    });
  }
}

export default App;
