import { NavLink, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { useState, useEffect } from 'react';


export default function DetailPlanet() {
  const { planetId } = useParams();
  const API_ENDPOINT = `https://swapi.dev/api/planets/${planetId}`;

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [planetData, setPlanetData] = useState([])
  return (
    <>
      <Navbar activeType='Planets' />
      <div className="detail-planet">
        <h1>Detail Planet</h1>
        <p>Here is the detail for planet {planetId}</p>
        <NavLink to="/planets">Back to all planets</NavLink>
      </div>
    </>
  );
}
