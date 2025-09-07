import { useContext } from 'react';
import UserContext from './components/UserContext';

function UserDetails() {
  const userData = useContext(UserContext);

  return (
    <div style={{ border: '1px solid gray', padding: '10px', margin: '10px', maxWidth: '300px' }}>
      <p><strong>Name:</strong> {userData.name}</p>
      <p><strong>Email:</strong> {userData.email}</p>
    </div>
  );
}

export default UserDetails;
