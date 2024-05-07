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

// layout
import RootLayout from './layouts/RootLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout/>}>
      <Route index element={<Films />} />
      <Route path="/films" element={<Films />} />
      <Route path='films/:filmId' element={<DetailFilm />} />
      <Route path="people" element={<People />} >
        {/* <Route path="detail" element={<DetailLayout />} /> */}
      </Route>
      <Route path="vehicles" element={<Vehicles />} />
      <Route path="spaceships" element={<Spaceships />} />
      <Route path="species" element={<Species />} />
      <Route path="planets" element={<Planets />} />

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
