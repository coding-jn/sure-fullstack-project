export const getOrders = () => {
  return fetch('http://localhost:8000/orders', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => response.json());
};

export const placeOrder = data => {
  return fetch('http://localhost:8000/orders/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => {
      return response.json();
    })
    .then(responseData => {
      console.log('Order placed:', responseData);
    })
    .catch(error => {
      console.log('An error occurred trying to place the order:', error);
    });
};
