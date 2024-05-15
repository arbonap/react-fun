import { NavLink, useParams, Link } from 'react-router-dom';
import Navbar from './Navbar';
import { useState, useEffect } from 'react';
import { SpinnerCircular } from 'spinners-react';


export default function DetailVehicle() {
  const { vehicleId } = useParams();
  const API_ENDPOINT = `https://swapi.dev/api/vehicles/${vehicleId}`;

  const [error, setError] = useState(null)
  const [vehicleLoading, setVehicleLoading] = useState(true);
  const [vehicleData, setVehicleData] = useState([])
  const [filmsData, setFilmsData] = useState([])
  const [filmsLoading, setFilmsLoading] = useState(true);
  const [pilotsData, setPilotsData] = useState([])
  const [pilotsLoading, setPilotsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_ENDPOINT);
        const data = await response.json();
        setVehicleData(data);
        setVehicleLoading(false);

        const filmsPromises = data.films.map(async (filmUrl) => {
          const filmResponse = await fetch(filmUrl);
          const filmData = await filmResponse.json();
          return { title: filmData.title, url: filmData.url };
        });

        const filmsData = await Promise.all(filmsPromises);

        const pilotsPromises = data.pilots.map(async (pilotUrl) => {
          const pilotResponse = await fetch(pilotUrl);
          const pilotData = await pilotResponse.json();
          return { name: pilotData.name, url: pilotData.url };
        });

        const pilotsData = await Promise.all(pilotsPromises);

        setFilmsData(filmsData);
        console.log(filmsData);
        setFilmsLoading(false);

        setPilotsData(pilotsData)
        console.log(pilotsData);
        setPilotsLoading(false);

      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err);
        setVehicleLoading(false);
        setFilmsLoading(false);
      }
    };

    fetchData();
  }, [API_ENDPOINT]);

  function parseNumberFromString(str) {
    const number = parseInt(str.match(/\d+/)[0]);
    return number;
  }

  if (vehicleLoading) {
    return <><SpinnerCircular size="50" secondaryColor='#a523bc'/> <p className='loading-message'>Loading vehicle data...</p></>;
  }
  else if (filmsLoading) {
    return <><SpinnerCircular size="50" secondaryColor='#a523bc'/> <p className='loading-message'>Loading films data...</p></>;
  }
  else if (pilotsLoading) {
    return <><SpinnerCircular size="50" secondaryColor='#a523bc'/> <p className='loading-message'>Loading pilots data...</p></>;
  }


  return (
    <>
      <Navbar activeType='Vehicles' />
      <div className="detail-vehicle">
        {
        !error && vehicleData.length === 0
        ? <p className='error-message'>No vehicles found.</p>
        :
          <h1>{vehicleData.name}, vehicle ID: {vehicleId}</h1>
      }
      </div>
      {error && <p className='error-message'>Error loading the films.</p>}

      {!error && vehicleData.length === 0
        ? <p className='error-message'>No vehicles found.</p>
        :
        <>
        <table className='vehicless-detail-table'>
        <thead>
          <tr>
            <th>Model</th>
            <th>Max Speed</th>
            <th>Cargo Capacity</th>
            <th>Consumables</th>
            <th>Created At</th>
            <th>Edited At</th>
            <th>Cost in Credits</th>
            <th>Crew</th>
            <th>Passengers</th>
            <th>Vehicle Class</th>
            <th>Length</th>
            <th>Manufacturer</th>
            <th>Pilots</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {vehicleData.model}
            </td>
            <td>
              {vehicleData.max_atmosphering_speed}
            </td>
            <td>
              {vehicleData.cargo_capacity}
            </td>
            <td>
              {vehicleData.consumables}
            </td>
            <td>
              {vehicleData.created && new Date(vehicleData.created).toLocaleString()}
            </td>
            <td>
              {vehicleData.edited && new Date(vehicleData.edited).toLocaleString()}
            </td>
            <td>
              {vehicleData.cost_in_credits}
            </td>
            <td>
              {vehicleData.crew}
            </td>
            <td>
              {vehicleData.passengers}
            </td>
            <td>
              {vehicleData.vehicle_class}
            </td>
            <td>
              {vehicleData.length}
            </td>
            <td>
              {vehicleData.manufacturer}
            </td>
            <td>
              {vehicleData.pilots.length > 1 ? vehicleData.pilots && pilotsData.map((pilotObj, index) =>

                    <Link to={`/people/${parseNumberFromString(pilotObj.url)}`}>{pilotObj.name}</Link>

                ) : 'N/A'}
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
                {vehicleData.films && filmsData.map((filmObj, index) =>
                  <tr key={index}>
                  <td>
                    <Link to={`/films/${parseNumberFromString(filmObj.url)}`}>{filmObj.title}</Link>
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
      <NavLink to="/vehicles">Back to all Vehicles</NavLink>

    </>
  );
}
