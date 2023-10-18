class Task {
  _id;
  _text;
  _user;

  _elem;
  _checkbox;
  _deleteBtn;
  _textElement;

  constructor(id, text, user, isComplete) {
    this._text = text;
    this._id = id;
    this._user = user;

    this._elem = document.createElement('div');
    this._elem.classList.add('todo-item');

    this._checkbox = document.createElement('input');
    this._checkbox.type = 'checkbox';
    this._checkbox.checked = isComplete;
    this._checkbox.name = id;
    //TODO: event

    this._textElement = document.createElement('div');
    this._textElement.classList.add('task-text');
    this._textElement.innerText = `${text} : ${user}`;

    this._deleteBtn = document.createElement('button');
    this._deleteBtn.classList.add('close');
    //TODO: event

    this._elem.append(this._checkbox, this._textElement, this._deleteBtn);
  }

  getElement() {
    return this._elem;
  }
}

export default Task;
