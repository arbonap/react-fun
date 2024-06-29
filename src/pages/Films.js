import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from './Navbar';
import { SpinnerCircular } from 'spinners-react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

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
        <TableContainer sx={{width: '85%'}} component={Paper}>
          <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Episode Number</TableCell>
            <TableCell>Director</TableCell>
            <TableCell>Release Date</TableCell>
            <TableCell>Producer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {films.map((film, index) =>
          <TableRow key={index}>
            <TableCell>
              <NavLink to={`${film.episode_id}`} style={{ color: 'purple' }}>{film.title}</NavLink>
            </TableCell>
            <TableCell>
              {film.episode_id}
            </TableCell>
            <TableCell>
              {film.director}
            </TableCell>
            <TableCell>
              {film.release_date}
            </TableCell>
            <TableCell>
              {film.producer}
            </TableCell>
          </TableRow>
          )}
        </TableBody>
          </Table>
        </TableContainer>
      }
      </div>
    </>
  );
}
