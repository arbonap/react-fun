import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Pagination } from "@mui/material";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Navbar from './Navbar';
import { SpinnerCircular } from 'spinners-react';

const API_ENDPOINT = 'https://swapi.dev/api/vehicles/';

export default function Vehicles() {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [vehicles, setVehicles] = useState([])
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams()

  function parseNumberFromString(str) {
    const number = parseInt(str.match(/\d+/)[0]);
    console.log('parseNumberFromString:', str)
    console.log('number:', number);
    return number;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpointWithPageParam = `${API_ENDPOINT}?page=${page}`;
        const response = await fetch(endpointWithPageParam);
        const data = await response.json();
        const params = `?page=${page}`;

        setVehicles(data.results);
        setLoading(false);
        setSearchParams(params);


      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [page, searchParams, setSearchParams]);

  if (loading) {
    return <><SpinnerCircular size="50" secondaryColor='#a523bc'/> <p className='loading-message'>Loading vehicles data...</p></>;
  }

  return (
    <>
    <Navbar activeType='Vehicles' />
      <div className="vehicles">
        <h1>Vehicles</h1>
          {error && <p className='error-message'>Error loading vehicles.</p>}
          {!loading  && !error && vehicles.length === 0
        ? <p className='error-message'>No vehicles found.</p>
        :
        <TableContainer sx={{width: '85%'}} component={Paper}>
          <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 650 }}>
          <TableHead>
          <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Model</TableCell>
          <TableCell>Cost in Credis</TableCell>
          <TableCell>Max Speed</TableCell>
          <TableCell>Crew</TableCell>
          <TableCell>Passengers</TableCell>
          <TableCell>Films</TableCell>
          <TableCell>Vehicle Class</TableCell>
          <TableCell>Vehicle Length</TableCell>
             </TableRow>
           </TableHead>
         <TableBody>
           {vehicles.map((vehicle, index) =>
           <TableRow
           key={vehicle.name}
           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
         >
            <TableCell>
            <Link to={`${parseNumberFromString(vehicle.url)}`} style={{ color: 'purple' }}>{vehicle.name}</Link>
            </TableCell>
            <TableCell>
              {vehicle.model}
            </TableCell>
            <TableCell>
              {vehicle.cost_in_credits}
            </TableCell>
            <TableCell>
              {vehicle.max_atmosphering_speed}
            </TableCell>
            <TableCell>
              {vehicle.crew}
            </TableCell>
            <TableCell>
              {vehicle.passengers}
            </TableCell>
            <TableCell style={{ maxWidth: 200, overflowX: 'auto' }}>
              {vehicle.films.map((film, index) =>(
                <>
                <Link to={`/films/${parseNumberFromString(film)}`} key={index} style={{ color: 'purple' }}>{film}</Link>
                <br/>
                </>
                )
              )}
            </TableCell>
            <TableCell>
              {vehicle.vehicle_class}
            </TableCell>
            <TableCell>
              {vehicle.length}
            </TableCell>
           </TableRow>
           )}
         </TableBody>
         </Table>
         </TableContainer>
       }
       <Pagination
        count={4} // total number of pages
        page={page}
        size="large"
        onChange={(event, value) => {
          console.log('value:', value);
          setPage(value);
        }}
        sx={{ '& .MuiPaginationItem-root': { color: 'white' } }}
        />
       </div>
    </>
  );
}
