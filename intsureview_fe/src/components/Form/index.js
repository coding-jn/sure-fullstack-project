import { useCallback, useEffect, useState } from 'react';
import { getOrders, placeOrder } from '../../actions/orders';
import './styles.css';

const defaultOrder = {
  name: '',
  phone_number: '',
  is_text_enabled: false,
  pickup_date: '',
  pickup_time: '',
};

const Form = () => {
  const today = new Date().toISOString().split('T')[0];
  const [order, setOrder] = useState(defaultOrder);
  const [orders, setOrders] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      const existingOrders = await getOrders();
      setOrders(existingOrders);
    })();
  }, []);

  const updateOrder = useCallback((field, e) => {
    setOrder(prevOrder => {
      const updatedOrder = { ...prevOrder };

      // the select element does not directly support boolean values
      if (field === 'is_text_enabled' && e.target.value === 'true') {
        updatedOrder[field] = true;
      } else if (field === 'is_text_enabled' && e.target.value === 'false') {
        updatedOrder[field] = false;
      } else {
        updatedOrder[field] = e.target.value;
      }

      return updatedOrder;
    });
  }, []);

  const handlePlaceOrder = useCallback(async event => {
    try {
      event.preventDefault();
      // there's an issue right now where the order that's sent here is not the latest state
      // my best guess is there's probably a race condition somewhere but this is odd since the input values update as expected as we update state
      await placeOrder(order);

      const existingOrders = await getOrders();
      setOrders(existingOrders);
    } catch (error) {
      setIsError(true);
    }
  }, []);

  return (
    <div>
      <form onSubmit={handlePlaceOrder} className='form'>
        <div className='form-group'>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            id='name'
            name='name'
            value={order.name}
            onChange={e => updateOrder('name', e)}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='phone'>Phone Number:</label>
          <input
            type='tel'
            id='phone_number'
            name='phone_number'
            value={order.phone_number}
            onChange={e => updateOrder('phone_number', e)}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='updates'>
            Would you like to sign up for text updates?
          </label>
          <select
            id='is_text_enabled'
            name='is_text_enabled'
            onChange={e => updateOrder('is_text_enabled', e)}
          >
            <option value='true'>Yes</option>
            <option value='false'>No</option>
          </select>
        </div>

        <div className='form-group'>
          <label htmlFor='pickup_date'>Pickup Date:</label>
          <input
            type='date'
            id='pickup_date'
            name='pickup_date'
            min={today}
            value={order.pickup_date}
            onChange={e => updateOrder('pickup_date', e)}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='pickup_time'>Pickup Time:</label>
          <input
            type='time'
            id='pickup_time'
            name='pickup_time'
            value={order.pickup_time}
            onChange={e => updateOrder('pickup_time', e)}
            required
          />
        </div>

        <div className='form-group'>
          <input type='submit' value='Place Order' />
        </div>

        {isError && (
          <p class='error-message'>
            An error occurred trying to place the order. Please try again later.
          </p>
        )}
      </form>

      <div>
        <h2 className='order-list-header'>All Orders</h2>

        <ul className='order-list'>
          {orders.length ? (
            orders.map(order => {
              return (
                <li className='list-item' key={order.id}>
                  <p className='item-field'>
                    <span className='field-name'>Customer Name:</span>{' '}
                    {order.name}
                  </p>
                  <p className='item-field'>
                    <span className='field-name'>Customer Phone Number:</span>
                    {order.phone_number}
                  </p>
                  <p className='item-field'>
                    <span className='field-name'>Text Updates Enabled?</span>
                    {order.is_text_enabled ? 'Yes' : 'No'}
                  </p>
                  <p className='item-field'>
                    <span className='field-name'>Pickup:</span>
                    {order.pickup_date} at {order.pickup_time}
                  </p>
                </li>
              );
            })
          ) : (
            <p>There are currenly no orders</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Form;
