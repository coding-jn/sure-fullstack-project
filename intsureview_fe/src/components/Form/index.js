import './styles.css';

const Form = () => {
  const today = new Date().toISOString().split('T')[0];

  return (
    <form action='/place-order' method='post' class='form'>
      <div class='form-group'>
        <label for='name'>Name:</label>
        <input type='text' id='name' name='name' required />
      </div>

      <div class='form-group'>
        <label for='phone'>Phone Number:</label>
        <input type='phone' id='phone' name='phone' required />
      </div>

      <label for='updates'>Would you like to sign up for text updates?</label>
      <select id='updates' name='updates'>
        <option value='yes'>Yes</option>
        <option value='no'>No</option>
      </select>

      <div class='form-group'>
        <label for='pickup-date'>Pickup Date:</label>
        <input
          type='date'
          id='pickup-date'
          name='pickup-date'
          min={today}
          value='YYYY-MM-DD'
        />
      </div>

      <div class='form-group'>
        <label for='pickup-time'>Pickup Time:</label>
        <input type='time' id='pickup-time' name='pickup-time' />
      </div>

      <div class='form-group'>
        <input type='submit' value='Place Order' />
      </div>
    </form>
  );
};

export default Form;
