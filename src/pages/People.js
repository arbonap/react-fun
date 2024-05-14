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

import Navbar from './Navbar';

const API_ENDPOINT = 'https://swapi.dev/api/people/';

export default function People() {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [people, setPeople] = useState([])
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
        setPeople(data.results);
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
    return <p className='loading-message'>Loading people data...</p>;
  }

  return (
    <>
    <Navbar activeType='People' />
      <div className="people">
        <h1>People</h1>
          {error && <p className='error-message'>Error loading the people.</p>}
          {!loading && !error && people.length === 0
        ? <p className='error-message'>No people found.</p>
        :
        <TableContainer sx={{width: '85%'}} component={Paper}>
          <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 650 }}>
          <TableHead>
          <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Gender (Sex)</TableCell>
          <TableCell>Birth Year</TableCell>
          <TableCell>Eye Color</TableCell>
          <TableCell >Films</TableCell>
          <TableCell>Hair Color</TableCell>
          <TableCell>Height</TableCell>
          <TableCell>Mass</TableCell>
          <TableCell>Homeworld</TableCell>
             </TableRow>
           </TableHead>
         <TableBody>
           {people.map((person, index) =>
           <TableRow
           key={person.name}
           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
         >
            <TableCell>
            <Link to={`${parseNumberFromString(person.url)}`} style={{ color: 'purple' }}>{person.name}</Link>
            </TableCell>
            <TableCell>
              {person.gender}
            </TableCell>
            <TableCell>
              {person.birth_year}
            </TableCell>
            <TableCell>
              {person.eye_color}
            </TableCell>
            <TableCell style={{ maxWidth: 200, overflowX: 'auto' }}>
              {person.films}
            </TableCell>
            <TableCell>
              {person.hair_color}
            </TableCell>
            <TableCell>
              {person.height}
            </TableCell>
            <TableCell>
              {person.mass}
            </TableCell>
            <TableCell>
              {person.homeworld}
            </TableCell>
           </TableRow>
           )}
         </TableBody>
         </Table>
         </TableContainer>
       }
       <Pagination
        count={9} // total number of pages
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
