class Server {
  _urls = ['https://jsonplaceholder.typicode.com/todos', 'https://jsonplaceholder.typicode.com/users'];

  async create(userId, text) {
    let response = await fetch(this._urls[1], {
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
      alert(`HTTP error: ${response.status}`);
      return 0;
    }
  }

  async read(urlNumber) {
    let response = await fetch(this._urls[urlNumber]);
    console.log(response.status, this._urls[urlNumber]);
    if (response.ok) {
      const data = await response.json();

      if (urlNumber === 1) {
        const users = {};
        data.forEach((el) => {
          users[el.id] = el.name;
        });
        return users;
      } else {
        console.log(data);
        return data;
      }
    } else {
      alert(`HTTP error: ${response.status}`);
      return 0;
    }
  }
  //async update() {}

  //async delete() {}
}

export default Server;
