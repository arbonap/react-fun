import { NavLink, useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';

export default function DetailFilm() {
  const { filmId } = useParams();
  const API_ENDPOINT = `https://swapi.dev/api/films/${filmId}`;

  const [error, setError] = useState(null)
  const [filmData, setFilmData] = useState([])
  const [charactersData, setCharactersData] = useState([])
  const [filmLoading, setFilmLoading] = useState(true);
  const [charactersLoading, setCharactersLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_ENDPOINT);
        const data = await response.json();
        setFilmData(data);
        setFilmLoading(false);

        const charactersPromises = data.characters.map(async (characterUrl) => {
          const characterResponse = await fetch(characterUrl);
          const characterData = await characterResponse.json();
          return { name: characterData.name, url: characterData.url }; // Only store the name & url (endpoint)
        });

        const charactersData = await Promise.all(charactersPromises);
        setCharactersData(charactersData);
        setCharactersLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err);
        setFilmLoading(false);
        setCharactersLoading(false);
      }
    };

    fetchData();
  }, [API_ENDPOINT]);

  function parseNumberFromString(str) {
    const number = parseInt(str.match(/\d+/)[0]);
    return number;
  }

  if (filmLoading) {
    return <p className='loading-message'>Loading film data...</p>;
  }
  else if (charactersLoading) {
    return <p className='loading-message'>Loading character data...</p>;
  }

  return (
    <>
      <Navbar activeType='Films' />
      <div className="detail-film">
      {
        !error && filmData.length === 0
        ? <p className='error-message'>No films found.</p>
        :
        <>
          <h1>{filmData.title}, Episode: {filmId}</h1>
          <p>Opening Crawl</p>
          <p> {filmData.opening_crawl}</p>
        </>
      }
      </div>
      {error && <p className='error-message'>Error loading the films.</p>}

      {!error && filmData.length === 0
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
            <td>
              <div className='another_scroll_div'>
              {filmData.producer}
              </div>
            </td>
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
                {filmData.characters && charactersData.map((charObj, index) =>
                  <tr key={index}>
                  <td>
                    <Link to={`/person/${parseNumberFromString(charObj.url)}`}>{charObj.name}</Link>
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
