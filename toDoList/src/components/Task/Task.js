class Task {
  _id;
  _text;
  _user;

  _server;

  _elem;
  _checkbox;
  _deleteBtn;
  _textElement;

  constructor(id, text, user, isComplete, server) {
    this._text = text;
    this._id = id;
    this._user = user;
    this._server = server;

    this._elem = document.createElement('div');
    this._elem.classList.add('todo-item');

    this._checkbox = document.createElement('input');
    this._checkbox.type = 'checkbox';
    this._checkbox.checked = isComplete;
    this._checkbox.name = id;
    this._checkbox.addEventListener('click', (e) => {
      e.preventDefault();
      this._server
        .update(this._id, this._checkbox.checked)
        .then((data) => {
          this._checkbox.checked = data.completed;
          this._textElement.classList.toggle('complete');
        })
        .catch((err) => {
          alert(err.message);
        });
    });

    this._textElement = document.createElement('div');
    this._textElement.className = isComplete ? 'task-text complete' : 'task-text';
    this._textElement.innerText = `${text} : ${user}`;

    this._deleteBtn = document.createElement('button');
    this._deleteBtn.innerText = '\u02DF';
    this._deleteBtn.classList.add('close');
    this._deleteBtn.addEventListener('click', () => {
      this._server.delete(this._id).then((isSuccess) => {
        if (isSuccess) this._elem.remove();
      });
    });

    this._elem.append(this._checkbox, this._textElement, this._deleteBtn);
  }

  getElement() {
    return this._elem;
  }
}

export default Task;
