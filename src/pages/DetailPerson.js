import { NavLink, useParams, Link } from 'react-router-dom';
import Navbar from './Navbar';
import { useState, useEffect } from 'react';
import { SpinnerCircular } from 'spinners-react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


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
  // const [specieData, setSpecieData] = useState([]);
  // const [specieLoading, setSpecieLoading] = useState(true);

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
          return { title: filmData.title, url: filmData.url }; // Only store the name & url (endpoint)
        });

        const vehiclesPromises = data.vehicles.map(async (vehicleUrl) => {
          const vehicleResponse = await fetch(vehicleUrl);
          const vehicleData = await vehicleResponse.json();
          return { name: vehicleData.name, url: vehicleData.url }; // Only store the name & url (endpoint)
        });

        const planetUrl = data.homeworld
        const planet = await fetch(planetUrl);
        const planetData = await planet.json();



        const filmsData = await Promise.all(filmsPromises);
        const vehiclesData = await Promise.all(vehiclesPromises);
        // const speciesUrl = data.species
        // const specie = await fetch(speciesUrl);
        // const specieData = await specie.json();

        setPlanetData(planetData);
        setPlanetLoading(false);

        setFilmsData(filmsData);
        setFilmsLoading(false);

        setVehiclesData(vehiclesData);
        setVehiclesLoading(false);

        // setSpecieData(specieData);
        // setSpecieLoading(false);

      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err);
        setFilmsLoading(false);
        setPersonLoading(false);
        setPlanetLoading(false);
        setVehiclesLoading(false);
        // setSpecieLoading(false);
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
  // else if (specieLoading) {
  //   return <><SpinnerCircular size="50" secondaryColor='#a523bc'/> <p className='loading-message'>Loading specie data...</p></>;
  // }
  else if (vehiclesLoading) {
    return <><SpinnerCircular size="50" secondaryColor='#a523bc'/> <p className='loading-message'>Loading vehicle data...</p></>;
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
              <Link to={`/planet/${parseNumberFromString(personData.homeworld)}`}>{planetData.name}</Link>
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
                {/* {personData.characters && charactersData.map((charObj, index) =>
                  <tr key={index}>
                  <td>
                    <Link to={`/person/${parseNumberFromString(charObj.url)}`}>{charObj.name}</Link>
                  </td>
                </tr>
                )} */}
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

          {/* <div className='column scroll_div'>
            <table>
              <thead>
                <tr>
                  <th>Species</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>
                    <Link to={`/specie/${parseNumberFromString(specieData.url)}`}>{specieData.name}</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div> */}

          {/* <div className='column scroll_div'>
            <table>
              <thead>
                <tr>
                  <th>Spaceships</th>
                </tr>
              </thead>

              <tbody>
                {personData.starships && personData.starships.map((starship, index) =>
                <tr key={index}>
                  <td>
                    <NavLink to={`${starship}`}>{starship}</NavLink>
                  </td>
                </tr>
                )}
              </tbody>
            </table>
          </div> */}

          {/* <div className='column scroll_div'>
            <table>
              <thead>
                <tr>
                  <th>Vehicles</th>
                </tr>
              </thead>

              <tbody>
                {personData.vehicles && personData.vehicles.map((vehicle, index) =>
                <tr key={index}>
                  <td>
                    <NavLink to={`${vehicle}`}>{vehicle}</NavLink>
                  </td>
                </tr>
                )}
              </tbody>
            </table>
          </div> */}
        </div>
      </>
      }
      <br/>
      <NavLink to="/people">Back to all people</NavLink>    </>
  );
}
