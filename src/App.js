import './App.css';
import { createBrowserRouter,
        Route,
        createRoutesFromElements,
        RouterProvider,
        Navigate } from 'react-router-dom';

// pages
import Films from './pages/Films';
import People from './pages/People';
import Vehicles from './pages/Vehicles';
import Spaceships from './pages/Spaceships';
import Species from './pages/Species';
import Planets from './pages/Planets';
import DetailFilm from './pages/DetailFilm';
import DetailPerson from './pages/DetailPerson';
import DetailVehicle from './pages/DetailVehicle';
import DetailSpaceship from './pages/DetailSpaceship';
import DetailSpecie from './pages/DetailSpecie';
import DetailPlanet from './pages/DetailPlanet';
// layout
import RootLayout from './layouts/RootLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Films />} />
      <Route path="/films" element={<Films />} />
      <Route path='films/:filmId' element={<DetailFilm />} />
      <Route path="people" element={<People />} />
      <Route path="people/:personId" element={<DetailPerson />} />
      <Route path="vehicles" element={<Vehicles />} />
      <Route path="vehicles/:vehicleId" element={<DetailVehicle />} />
      <Route path="spaceships" element={<Spaceships />} />
      <Route path="spaceships/:spaceshipId" element={<DetailSpaceship />} />
      <Route path="species" element={<Species />} />
      <Route path="species/:specieId" element={<DetailSpecie/>} />
      <Route path="planets" element={<Planets />} />
      <Route path="planets/:planetId" element={<DetailPlanet />} />

      <Route path="*" element={<Navigate to="/films" replace/>} />
    </Route>

  )
);
function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
