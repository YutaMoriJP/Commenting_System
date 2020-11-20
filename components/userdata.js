const UserData = {
  fetching(requestType) {
    return fetch(`https://jsonplaceholder.typicode.com/${requestType}`, {
      method: 'GET',
    }).then(response => response.json());
  },
};

export default UserData;
