import { NavLink, Outlet } from 'react-router-dom';


export default function RootLayout() {
  return (
    <div className="root-layout">
      <header>
        <nav>
          <h1>Star Wars</h1>
          <NavLink to="/">Films</NavLink>
          <NavLink to="/people">People</NavLink>
          <NavLink to="/vehicles">Vehicles</NavLink>
          <NavLink to="/spaceships">Spaceships</NavLink>
          <NavLink to="/species">Species</NavLink>
          <NavLink to="/planets">Planets</NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  )
}
