import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Pagination } from "@mui/material";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { SpinnerCircular } from 'spinners-react';

import Navbar from './Navbar';

const API_ENDPOINT = 'https://swapi.dev/api/planets/';

export default function Planets() {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [planets, setPlanets] = useState([])
  const [page, setPage] = useState(1);

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
        setPlanets(data.results);
        setLoading(false);

      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  if (loading) {
    return <><SpinnerCircular size="50" secondaryColor='#a523bc'/><p className='loading-message'>Loading planet data...</p></>;
  }

  return (
    <>
    <Navbar activeType='Planets' />
      <div className="planets">
        <h1>Planets</h1>
          {error && <p className='error-message'>Error loading the planets.</p>}
          {!loading && !error && planets.length === 0
        ? <p className='error-message'>No planets found.</p>
        :
        <TableContainer sx={{width: '85%'}} component={Paper}>
          <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 650 }}>
          <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Climate</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Edited</TableCell>
            <TableCell>Diameter</TableCell>
            <TableCell>Films</TableCell>
            <TableCell>Gravity</TableCell>
            <TableCell>Orbital Period</TableCell>
            <TableCell>Population</TableCell>
            <TableCell>Residents</TableCell>
            <TableCell>Rotation Period</TableCell>
            <TableCell>Surface Water</TableCell>
            <TableCell>Terrain</TableCell>
            </TableRow>
           </TableHead>
         <TableBody>
         </TableBody>
         </Table>
         </TableContainer>
       }
       <Pagination
        count={6} // total number of planet pages
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
