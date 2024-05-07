import { NavLink, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { useState, useEffect } from 'react';


export default function DetailPerson() {
  const { personId } = useParams();
  // const film = films.find((film) => film.id === filmId);
  const API_ENDPOINT = `https://swapi.dev/api/films/${personId}`;

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [filmData, setFilmData] = useState([])
  return (
    <>
      <Navbar activeType='People' />
      <div className="detail-people">
        <h1>Detail People</h1>
        <p>Here is the detail for person {personId}</p>
        <NavLink to="/people">Back to all people</NavLink>
      </div>
    </>
  );
}
