import { NavLink, Link, useParams } from 'react-router-dom';

export default function DetailFilm() {
  const { filmId } = useParams();
  console.log("DetailFilm!!!! filmId:")
  console.log(filmId);
  // const film = films.find((film) => film.id === filmId);
  return (
    <div className="detail-film">
      <h1>Detail Film</h1>
      <p>Here is the detail for film {filmId}</p>
      <NavLink to="/">Back to all films</NavLink>
    </div>
  );
}
