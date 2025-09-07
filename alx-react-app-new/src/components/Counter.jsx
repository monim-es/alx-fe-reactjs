import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{
      border: '1px solid gray',
      padding: '20px',
      margin: '20px auto',
      width: '200px',
      textAlign: 'center',
      borderRadius: '10px',
      backgroundColor: '#f9f9f9'
    }}>
      <h2 style={{color:'black'}}>Counter App</h2>
      <p style={{ fontSize: '20px', fontWeight: 'bold', color: 'black' }}>Current Count: {count}</p>
      <button onClick={() => setCount(count + 1)} style={{ margin: '5px' }}>Increment</button>
      <button onClick={() => setCount(count - 1)} style={{ margin: '5px' }}>Decrement</button>
      <button onClick={() => setCount(0)} style={{ margin: '5px' }}>Reset</button>
    </div>
  );
}

export default Counter;
