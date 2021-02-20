class Github {
  constructor() {
    this.client_id = '567c5ed03d8fe9997861';
    this.client_secret = 'f34c1ac648b5bd0225eb2d04ab48c8fd7ce5c33d';
  }

  async getUsers(query, numOfResults) {
    const usersResponse = await fetch(
      `https://api.github.com/search/users?q=${query}&per_page=${numOfResults}`,
      {
        method: 'GET',
        headers: {
          Authorization:
            'Basic ' + btoa(`${this.client_id}:${this.client_secret}`),
        },
      }
    );
    //format results in json
    const usersResult = await usersResponse.json();
    //transform results into an object with text and value to match the states data format
    let users = usersResult.items;
    const transformedUsers = users.map((item) => {
      let userData = {};
      userData.text = item.login;
      userData.value = item.id;

      return userData;
    });

    return transformedUsers;
  }
}

export default new Github();
