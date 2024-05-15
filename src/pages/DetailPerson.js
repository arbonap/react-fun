import { NavLink, useParams, Link } from 'react-router-dom';
import Navbar from './Navbar';
import { useState, useEffect } from 'react';
import { SpinnerCircular } from 'spinners-react';


export default function DetailPerson() {
  const { personId } = useParams();
  const API_ENDPOINT = `https://swapi.dev/api/people/${personId}`;

  const [error, setError] = useState(null)
  const [personData, setPersonData] = useState([])
  const [personLoading, setPersonLoading] = useState(true);
  const [filmsData, setFilmsData] = useState([])
  const [planetData, setPlanetData] = useState([])
  const [planetLoading, setPlanetLoading] = useState(true);
  const [filmsLoading, setFilmsLoading] = useState(true);
  const [vehiclesData, setVehiclesData] = useState([]);
  const [vehiclesLoading, setVehiclesLoading] = useState(true);
  const [speciesData, setSpeciesData] = useState([]);
  const [speciesLoading, setSpeciesLoading] = useState(true);
  const [starshipsData, setStarshipsData] = useState([]);
  const [starshipsLoading, setStarshipsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_ENDPOINT);
        const data = await response.json();
        setPersonData(data);
        setPersonLoading(false);

        const filmsPromises = data.films.map(async (filmUrl) => {
          const filmResponse = await fetch(filmUrl);
          const filmData = await filmResponse.json();
          return { title: filmData.title, url: filmData.url };
        });

        const vehiclesPromises = data.vehicles.map(async (vehicleUrl) => {
          const vehicleResponse = await fetch(vehicleUrl);
          const vehicleData = await vehicleResponse.json();
          return { name: vehicleData.name, url: vehicleData.url };
        });

        const speciesPromises = data.species.map(async (specieUrl) => {
          const specieResponse = await fetch(specieUrl);
          const specieData = await specieResponse.json();
          return { name: specieData.name, url: specieData.url };
        });

        const starshipsPromises = data.starships.map(async (starshipUrl) => {
          const starshipResponse = await fetch(starshipUrl);
          const starshipData = await starshipResponse.json();
          return { name: starshipData.name, url: starshipData.url };
        });

        const planetUrl = data.homeworld
        const planet = await fetch(planetUrl);
        const planetData = await planet.json();



        const filmsData = await Promise.all(filmsPromises);
        const vehiclesData = await Promise.all(vehiclesPromises);
        const speciesData = await Promise.all(speciesPromises);
        const starshipsData = await Promise.all(starshipsPromises);

        setPlanetData(planetData);
        setPlanetLoading(false);

        setFilmsData(filmsData);
        setFilmsLoading(false);

        setVehiclesData(vehiclesData);
        setVehiclesLoading(false);

        setSpeciesData(speciesData);
        setSpeciesLoading(false);

        setStarshipsData(starshipsData);
        setStarshipsLoading(false);

      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err);
        setFilmsLoading(false);
        setPersonLoading(false);
        setPlanetLoading(false);
        setVehiclesLoading(false);
        setSpeciesLoading(false);
        setStarshipsLoading(false);
      }
    };

    fetchData();
  }, [API_ENDPOINT]);

  function parseNumberFromString(str) {
    const number = parseInt(str.match(/\d+/)[0]);
    return number;
  }

  if (personLoading) {
    return <><SpinnerCircular size="50" secondaryColor='#a523bc'/> <p className='loading-message'>Loading person / character data...</p></>;
  }
  else if (filmsLoading) {
    return <><SpinnerCircular size="50" secondaryColor='#a523bc'/> <p className='loading-message'>Loading films data...</p></>;
  }
  else if (planetLoading) {
    return <><SpinnerCircular size="50" secondaryColor='#a523bc'/> <p className='loading-message'>Loading planet data...</p></>;
  }
  else if (speciesLoading) {
    return <><SpinnerCircular size="50" secondaryColor='#a523bc'/> <p className='loading-message'>Loading species data...</p></>;
  }
  else if (vehiclesLoading) {
    return <><SpinnerCircular size="50" secondaryColor='#a523bc'/> <p className='loading-message'>Loading vehicle data...</p></>;
  }
  else if (starshipsLoading) {
    return <><SpinnerCircular size="50" secondaryColor='#a523bc'/> <p className='loading-message'>Loading starship data...</p></>;
  }

  return (
    <>
    <Navbar activeType='People' />
    <div className="detail-people">
      {
        !error && personData.length === 0
        ? <p className='error-message'>No person found.</p>
        :
        <>
          <h1>{personData.name}, ID: {personId}</h1>
        </>
      }
      </div>
      {error && <p className='error-message'>Error loading the person/ character.</p>}

      {!error && personData.length === 0
        ? <p className='error-message'>No person/ character found.</p>
        :
        <>
        <table className='films-detail-table'>
        <thead>
          <tr>
            <th>Birth Year</th>
            <th>Eye Color</th>
            <th>Hair Color</th>
            <th>Skin Color</th>
            <th>Height</th>
            <th>Mass</th>
            <th>Gender</th>
            <th>Homeworld Planet</th>
            <th>Created</th>
            <th>Edited</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {personData.birth_year}
            </td>
            <td>
              {personData.eye_color}
            </td>
            <td>
              {personData.hair_color}
            </td>
            <td>
              {personData.skin_color}
            </td>
            <td>
              {personData.height}
            </td>
            <td>
              {personData.mass}
            </td>
            <td>
              {personData.gender}
            </td>
            <td>
              {planetData.name}
            </td>
            <td>
              {personData.created && new Date(personData.created).toLocaleString()}
            </td>
            <td>
              {personData.edited && new Date(personData.edited).toLocaleString()}
            </td>
            <td>

            </td>
            <td>
              {personData.release_date}
            </td>
          </tr>
        </tbody>
        </table>

        <div className='row'>
          <div className='column scroll_div' >
            <table>
              <thead>
                <tr>
                  <th>Films</th>
                </tr>

              </thead>
              <tbody>
              <div className='another_scroll_div'>
                {personData.films && filmsData.map((filmObj, index) =>
                    <td className='another_scroll_div'>
                      <Link to={`/films/${parseNumberFromString(filmObj.url)}`}>{filmObj.title}</Link>
                    </td>
                  )}
              </div>

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
                <tr>
                  <td>
                    {personData.species.length > 1 ? speciesData.map((specieObj, index) =>
                    <td className='another_scroll_div'>
                      {specieObj.name}
                    </td>
                    ) : 'N/A'}
                  </td>
                </tr>
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
                <tr>
                  <td>
                    {personData.starships.length > 1 ? starshipsData.map((starshipObj, index) =>
                    <td className='another_scroll_div'>
                      {starshipObj.name}
                    </td>
                    ) : 'N/A'}
                  </td>
                </tr>
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
                {personData.vehicles.length > 1 ? personData.vehicles && vehiclesData.map((vehicleObj, index) =>
                <tr key={index}>
                  <td>
                    <Link to={`/vehicles/${parseNumberFromString(vehicleObj.url)}`}>{vehicleObj.name}</Link>
                  </td>
                </tr>
                ) : 'N/A'}
              </tbody>
            </table>
          </div>
        </div>
      </>
      }
      <br/>
      <NavLink to="/people">Back to all people</NavLink>    </>
  );
}
