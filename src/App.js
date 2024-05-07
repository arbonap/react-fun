import './App.css';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

// pages
import Films from './pages/Films';
import People from './pages/People';
import Vehicles from './pages/Vehicles';
import Spaceships from './pages/Spaceships';
import Species from './pages/Species';
import Planets from './pages/Planets';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
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
        <Routes>
          <Route index element={<Films />} />
          <Route path="people" element={<People />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="spaceships" element={<Spaceships />} />
          <Route path="species" element={<Species />} />
          <Route path="planets" element={<Planets />} />

        </Routes>
      </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
