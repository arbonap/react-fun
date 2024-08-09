import { NavLink, useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { SpinnerCircular } from 'spinners-react';

export default function DetailFilm() {
  const { filmId } = useParams();
  const API_ENDPOINT = `https://swapi.dev/api/films/${filmId}`;

  const [error, setError] = useState(null);
  const [filmData, setFilmData] = useState(null);
  const [charactersData, setCharactersData] = useState([]);
  const [planetsData, setPlanetsData] = useState([]);
  const [speciesData, setSpeciesData] = useState([]);
  const [spaceshipData, setSpaceshipData] = useState([]);
  const [vehiclesData, setVehiclesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_ENDPOINT);
        const data = await response.json();
        setFilmData(data);

        const charactersPromises = data.characters.map(async (characterUrl) => {
          const characterResponse = await fetch(characterUrl);
          const characterData = await characterResponse.json();
          return { name: characterData.name, url: characterData.url }; // Only store the name & url (endpoint)
        });

        const planetsPromises = data.planets.map(async (planetUrl) => {
          const planetResponse = await fetch(planetUrl);
          const planetData = await planetResponse.json();
          return { name: planetData.name, url: planetData.url }; // Only store the name & url (endpoint)
        });

        const speciesPromises = data.species.map(async (specieUrl) => {
          const specieResponse = await fetch(specieUrl);
          const specieData = await specieResponse.json();
          return { name: specieData.name, url: specieData.url }; // Only store the name & url (endpoint)
        });

        const spaceshipPromises = data.starships.map(async (starshipUrl) => {
          const spaceshipResponse = await fetch(starshipUrl);
          const starshipData = await spaceshipResponse.json();
          return { name: starshipData.name, url: starshipData.url }; // Only store the name & url (endpoint)
        });

        const vehiclesPromises = data.vehicles.map(async (vehicleUrl) => {
          const vehicleResponse = await fetch(vehicleUrl);
          const vehicleData = await vehicleResponse.json();
          return { name: vehicleData.name, url: vehicleData.url }; // Only store the name & url (endpoint)
        });

        const charactersData = await Promise.all(charactersPromises);
        const planetsData = await Promise.all(planetsPromises);
        const speciesData = await Promise.all(speciesPromises);
        const spaceshipData = await Promise.all(spaceshipPromises);
        const vehiclesData = await Promise.all(vehiclesPromises);

        setCharactersData(charactersData);
        setPlanetsData(planetsData);
        setSpeciesData(speciesData);
        setSpaceshipData(spaceshipData);
        setVehiclesData(vehiclesData);

      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err);
      }
    };

    fetchData();
  }, [API_ENDPOINT]);

  function parseNumberFromString(str) {
    const number = parseInt(str.match(/\d+/)[0]);
    return number;
  }

  return (
    <>
      <Navbar activeType='Films' />
      <div className="detail-film">
        {error && <p className='error-message'>Error loading the films.</p>}

        {!error && !filmData && (
          <><SpinnerCircular size="50" secondaryColor='#a523bc'/> <p className='loading-message'>Loading film data...</p></>
        )}

        {filmData && (
          <>
            <h1>{filmData.title}, Episode: {filmId}</h1>
            <p>Opening Crawl</p>
            <p>{filmData.opening_crawl}</p>
          </>
        )}

        {filmData && (
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
                  <td>{filmData.created && new Date(filmData.created).toLocaleString()}</td>
                  <td>{filmData.edited && new Date(filmData.edited).toLocaleString()}</td>
                  <td>{filmData.director}</td>
                  <td><div className='another_scroll_div'>{filmData.producer}</div></td>
                  <td>{filmData.release_date}</td>
                </tr>
              </tbody>
            </table>
          </>
        )}

        {charactersData.length === 0 ? (
          <><SpinnerCircular size="50" secondaryColor='#a523bc'/> <p className='loading-message'>Loading character data...</p></>
        ) : (
          <div className='column scroll_div'>
            <table>
              <thead>
                <tr>
                  <th>Characters</th>
                </tr>
              </thead>
              <tbody>
                {charactersData.map((charObj, index) => (
                  <tr key={index}>
                    <td><Link to={`/people/${parseNumberFromString(charObj.url)}`}>{charObj.name}</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {planetsData.length === 0 ? (
          <><SpinnerCircular size="50" secondaryColor='#a523bc'/> <p className='loading-message'>Loading planet data...</p></>
        ) : (
          <div className='column scroll_div'>
            <table>
              <thead>
                <tr>
                  <th>Planets</th>
                </tr>
              </thead>
              <tbody>
                {planetsData.map((planetObj, index) => (
                  <tr key={index}>
                    <td>{planetObj.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {speciesData.length === 0 ? (
          <><SpinnerCircular size="50" secondaryColor='#a523bc'/> <p className='loading-message'>Loading species data...</p></>
        ) : (
          <div className='column scroll_div'>
            <table>
              <thead>
                <tr>
                  <th>Species</th>
                </tr>
              </thead>
              <tbody>
                {speciesData.map((specieObj, index) => (
                  <tr key={index}>
                    <td>{specieObj.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {spaceshipData.length === 0 ? (
          <><SpinnerCircular size="50" secondaryColor='#a523bc'/> <p className='loading-message'>Loading spaceship data...</p></>
        ) : (
          <div className='column scroll_div'>
            <table>
              <thead>
                <tr>
                  <th>Spaceships</th>
                </tr>
              </thead>
              <tbody>
                {spaceshipData.map((starshipObj, index) => (
                  <tr key={index}>
                    <td>{starshipObj.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {vehiclesData.length === 0 ? (
          <><SpinnerCircular size="50" secondaryColor='#a523bc'/> <p className='loading-message'>Loading vehicle data...</p></>
        ) : (
          <div className='column scroll_div'>
            <table>
              <thead>
                <tr>
                  <th>Vehicles</th>
                </tr>
              </thead>
              <tbody>
                {vehiclesData.map((vehicleObj, index) => (
                  <tr key={index}>
                    <td><Link to={`/vehicles/${parseNumberFromString(vehicleObj.url)}`}>{vehicleObj.name}</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <br />
        <NavLink to="/films">Back to all films</NavLink>
      </div>
    </>
  );
}
