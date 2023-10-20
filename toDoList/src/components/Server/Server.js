class Server {
  _urls = ['https://jsonplaceholder.typicode.com/todos', 'https://jsonplaceholder.typicode.com/users'];

  async create(userId, text) {
    const response = await fetch(this._urls[0], {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        userId,
        title: text,
        completed: false,
      }),
    });

    if (response.ok) {
      let data = await response.json();
      return data;
    } else {
      throw new Error(`HTTP error ${response.status}`);
    }
  }

  async read(urlNumber) {
    const response = await fetch(this._urls[urlNumber]);
    if (response.ok) {
      const data = await response.json();

      if (urlNumber === 1) {
        const users = {};
        data.forEach((el) => {
          users[el.id] = el.name;
        });
        return users;
      } else {
        return data;
      }
    } else {
      throw new Error(`HTTP error ${response.status}`);
    }
  }

  async update(todoId, isComplete) {
    const response = await fetch(this._urls[0] + `/${todoId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        completed: isComplete,
      }),
    });

    if (response.ok) {
      let data = await response.json();
      return data;
    } else {
      throw new Error(`HTTP error ${response.status}`);
    }
  }

  async delete(todoId) {
    const response = await fetch(this._urls[0] + `/${todoId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      return response.ok;
    } else {
      throw new Error(`HTTP error ${response.status}`);
    }
  }
}

export default Server;
