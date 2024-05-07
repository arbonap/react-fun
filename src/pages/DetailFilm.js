import { NavLink, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';

export default function DetailFilm() {
  const { filmId } = useParams();
  const API_ENDPOINT = `https://swapi.dev/api/films/${filmId}`;

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [filmData, setFilmData] = useState([])
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    fetch(API_ENDPOINT)
      .then(response => response.json())
      .then(data => {
        setFilmData(data)
        setCharacters(data.characters)
        console.log(API_ENDPOINT)
        console.log(filmData)
        }
      )
      .catch(err => {
        console.log(err)
        setError(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <>
      <Navbar activeType='Films' />
      <div className="detail-film">
      {
        !loading && !error && filmData.length === 0
        ? <p className='error-message'>No films found.</p>
        :
        <>
          <h1>{filmData.title}, Episode: {filmId}</h1>
          <p>Opening Crawl</p>
          <p> {filmData.opening_crawl}</p>
        </>
      }
      </div>
      {loading && <p className='loading-message'>Loading...</p>}
      {error && <p className='error-message'>Error loading the films.</p>}

      {!loading && !error && filmData.length === 0
        ? <p className='error-message'>No films found.</p>
        :
        <>
        <table className='films-detail-table'>
        <thead>
          <tr>
            <th>Created</th>
            <th>Edited</th>
            <th>Director</th>
            <th>Producer</th>
            <th>Release Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {filmData.created && new Date(filmData.created).toLocaleString()}
            </td>
            <td>
              {filmData.edited && new Date(filmData.edited).toLocaleString()}
            </td>
            <td>
              {filmData.director}
            </td>
            <div className='another_scroll_div'>
            <td>
              {filmData.producer}
            </td>
            </div>
            <td>
              {filmData.release_date}
            </td>
          </tr>
        </tbody>
        </table>

        <div className='row'>
            <div className='column scroll_div' >
            <table>
              <thead>
                <tr>
                  <th>Characters</th>
                </tr>

              </thead>
              <tbody>
                {filmData.characters && filmData.characters.map((character, index) =>
                <tr key={index}>
                  <td>
                    <NavLink to={`${character}`}>{character}</NavLink>
                  </td>
                </tr>
                )}

              </tbody>
            </table>
          </div>

          <div className='column scroll_div'>
            <table>
              <thead>
                <tr>
                  <th>Planets</th>
                </tr>
              </thead>

              <tbody>
                {filmData.planets && filmData.planets.map((planet, index) =>
                <tr key={index}>
                  <td>
                    <NavLink to={`${planet}`}>{planet}</NavLink>
                  </td>
                </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className='column scroll_div'>
            <table>
              <thead>
                <tr>
                  <th>Species</th>
                </tr>
              </thead>

              <tbody>
                {filmData.species && filmData.species.map((specie, index) =>
                <tr key={index}>
                  <td>
                    <NavLink to={`${specie}`}>{specie}</NavLink>
                  </td>
                </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className='column scroll_div'>
            <table>
              <thead>
                <tr>
                  <th>Spaceships</th>
                </tr>
              </thead>

              <tbody>
                {filmData.starships && filmData.starships.map((starship, index) =>
                <tr key={index}>
                  <td>
                    <NavLink to={`${starship}`}>{starship}</NavLink>
                  </td>
                </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className='column scroll_div'>
            <table>
              <thead>
                <tr>
                  <th>Vehicles</th>
                </tr>
              </thead>

              <tbody>
                {filmData.vehicles && filmData.vehicles.map((vehicle, index) =>
                <tr key={index}>
                  <td>
                    <NavLink to={`${vehicle}`}>{vehicle}</NavLink>
                  </td>
                </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </>
      }
      <br/>
      <NavLink to="/films">Back to all films</NavLink>
    </>
  );
}
