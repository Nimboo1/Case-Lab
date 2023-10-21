import Task from './Task/Task';
import Server from './Server/Server';

class App {
  _urls = {
    todos: 0,
    users: 1,
  };
  _users;

  constructor() {
    this._server = new Server();
    this._toDoInput = document.querySelector('#new-todo');
    this._userSelect = document.querySelector('#user-todo');
    this._addButton = document.querySelector('button');
    this._toDoList = document.querySelector('#todo-list');
  }

  init() {
    this._server
      .read(this._urls.users)
      .then((data) => {
        this._users = data;

        for (let user in this._users) {
          const option = new Option(this._users[user], user);
          this._userSelect.append(option);
        }
      })
      .then(() => {
        this._server
          .read(this._urls.todos)
          .then((data) => {
            for (let i = 0; i < data.length; i++) {
              const todoItem = new Task(
                data[i].id,
                data[i].title,
                this._users[data[i].userId],
                data[i].completed,
                this._server
              );
              this._toDoList.append(todoItem.getElement());
            }
          })
          .catch((err) => {
            alert(err.message);
          });
      })
      .catch((err) => {
        alert(err.message);
      });

    this._addButton.addEventListener('click', (e) => {
      e.preventDefault();
      if (this._toDoInput.value === '' || this._userSelect.value == -1) {
        alert('Вы должны заполнить текст todo и выбрать пользователя');
        return;
      }
      this._server
        .create(this._userSelect.value, this._toDoInput.value)
        .then((data) => {
          const todoItem = new Task(data.id, data.title, this._users[data.userId], data.completed, this._server);
          this._toDoList.prepend(todoItem.getElement());
        })
        .catch((err) => {
          alert(err.message);
        });

      this._toDoInput.value = '';
      this._userSelect.value = -1;
    });
  }
}

export default App;
