import { Link } from 'react-router-dom';

const RECORD_TYPES = [
  ['Films', '/films'],
  ['People', '/people'],
  ['Vehicles', '/vehicles'],
];

export default function Navbar({activeType}) {
  return (
    <header>
      <nav>
        <h1>Star Wars</h1>
        {RECORD_TYPES.map(([record, path]) => (
          <Link to={path} key={record} className={record === activeType ? 'active' : ''}>{record}</Link>
        ))}
      </nav>
    </header>
  );
}
