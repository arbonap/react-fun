import { Outlet, NavLink } from 'react-router-dom';

export default function DetailLayout() {
  return (
    <div className="detail-layout">

      <h2>Detail</h2>
      <p>Here is the detail</p>

      {/* <nav>
        <NavLink to="films">Films</NavLink>
        <NavLink to="people">People</NavLink>
      </nav> */}
      <Outlet/>
    </div>
  );
}
