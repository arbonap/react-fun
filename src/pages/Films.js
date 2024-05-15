import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from './Navbar';
import { SpinnerCircular } from 'spinners-react';

const API_ENDPOINT = 'https://swapi.dev/api/films/';

export default function Films() {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [films, setFilms] = useState([])



  useEffect(() => {
    fetch(API_ENDPOINT)
      .then(response => response.json())
      .then(data => {
        setFilms(data.results)
        // console.log(films)
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
      <div className="films">
        <h1>Films</h1>
        {loading && <><SpinnerCircular size="50" secondaryColor='#a523bc'/><p className='loading-message'>Loading film data...</p></>}
      {error && <p className='error-message'>Error loading the films.</p>}

      {!loading && !error && films.length === 0
        ? <p className='error-message'>No films found.</p>
        :
        <table className='films-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Episode Number</th>
            <th>Director</th>
            <th>Release Date</th>
            <th>Producer</th>
          </tr>
        </thead>
        <tbody className='flex-table'>
          {films.map((film, index) =>
          <tr key={index}>
            <td>
              <NavLink to={`${film.episode_id}`}>{film.title}</NavLink>
            </td>
            <td>
              {film.episode_id}
            </td>
            <td>
              {film.director}
            </td>
            <td>
              {film.release_date}
            </td>
            <td>
              {film.producer}
            </td>
          </tr>
          )}
        </tbody>
        </table>
      }
      </div>
    </>
  );
}
