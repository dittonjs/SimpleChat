import { Link } from 'react-router-dom';

export const Room = ({ children, to, action }) => {
  if (to) {
    return (
      <Link className="room" to={to}>
        {children}
      </Link>
    );
  }
  if (action) {
    return (
      <button className="room action" onClick={action}>
        {children}
      </button>
    );
  }
  return null;
};
