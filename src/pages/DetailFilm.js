import { NavLink, useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { SpinnerCircular } from 'spinners-react';


export default function DetailFilm() {
  const { filmId } = useParams();
  const API_ENDPOINT = `https://swapi.dev/api/films/${filmId}`;

  const [error, setError] = useState(null)
  const [filmData, setFilmData] = useState([])
  const [charactersData, setCharactersData] = useState([])
  const [planetsData, setPlanetsData] = useState([])
  const [planetsLoading, setPlanetsLoading] = useState(true);
  const [filmLoading, setFilmLoading] = useState(true);
  const [charactersLoading, setCharactersLoading] = useState(true);
  const [speciesData, setSpeciesData] = useState([]);
  const [speciesLoading, setSpeciesLoading] = useState(true);
  const [spaceshipData, setSpaceshipData] = useState([]);
  const [spaceshipLoading, setSpaceshipLoading] = useState(true);
  const [vehiclesData, setVehiclesData] = useState([]);
  const [vehiclesLoading, setVehiclesLoading] = useState(true);

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
        setCharactersLoading(false);

        setPlanetsData(planetsData);
        setPlanetsLoading(false);

        setSpeciesData(speciesData);
        setSpeciesLoading(false);

        setSpaceshipData(spaceshipData);
        setSpaceshipLoading(false);

        setVehiclesData(vehiclesData);
        setVehiclesLoading(false);

      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err);
        setFilmLoading(false);
        setCharactersLoading(false);
        setPlanetsLoading(false);
        setSpeciesLoading(false);
        setSpaceshipLoading(false);
        setVehiclesLoading(false);
      }
    };

    fetchData();
  }, [API_ENDPOINT]);

  function parseNumberFromString(str) {
    const number = parseInt(str.match(/\d+/)[0]);
    return number;
  }

  if (filmLoading) {
    return <><SpinnerCircular size="50" secondaryColor='#a523bc'/> <p className='loading-message'>Loading film data...</p></>;
  }
  else if (charactersLoading) {
    return <><SpinnerCircular size="50" secondaryColor='#a523bc'/> <p className='loading-message'>Loading character data...</p></>;
  }
  else if (planetsLoading) {
    return <><SpinnerCircular size="50" secondaryColor='#a523bc'/> <p className='loading-message'>Loading planet data...</p></>;
  }
  else if (speciesLoading) {
    return <><SpinnerCircular size="50" secondaryColor='#a523bc'/> <p className='loading-message'>Loading specie data...</p></>;
  }
  else if (spaceshipLoading) {
    return <><SpinnerCircular size="50" secondaryColor='#a523bc'/> <p className='loading-message'>Loading spaceship data...</p></>;
  }
  else if (vehiclesLoading) {
    return <><SpinnerCircular size="50" secondaryColor='#a523bc'/> <p className='loading-message'>Loading vehicle data...</p></>;
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
                    <Link to={`/people/${parseNumberFromString(charObj.url)}`}>{charObj.name}</Link>
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
                {filmData.planets && planetsData.map((planetObj, index) =>
                <tr key={index}>
                  <td>
                    {console.log(planetObj.url)}
                    {planetObj.name}
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
                {filmData.species && speciesData.map((specieObj, index) =>
                <tr key={index}>
                  <td>
                    {specieObj.name}
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
                {filmData.starships && spaceshipData.map((starshipObj, index) =>
                <tr key={index}>
                  <td>
                  {starshipObj.name}
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
                {filmData.vehicles && vehiclesData.map((vehicleObj, index) =>
                <tr key={index}>
                  <td>
                  <Link to={`/vehicles/${parseNumberFromString(vehicleObj.url)}`}>{vehicleObj.name}</Link>
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
