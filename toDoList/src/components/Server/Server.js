class Server {
  _urls = ['https://jsonplaceholder.typicode.com/todos', 'https://jsonplaceholder.typicode.com/users'];
  //async create(userId, text) {}

  async read(urlNumber) {
    let response = await fetch(this._urls[urlNumber]);
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
      alert(`HTTP error: ${response.status}`);
      return 0;
    }
  }
  //async update() {}

  //async delete() {}
}

export default Server;
