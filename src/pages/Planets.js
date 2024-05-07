import Navbar from './Navbar';

export default function Planets() {
  return (
    <>
      <Navbar activeType='Planets' />
      <div className="planets">
        <h1>Planets</h1>
        <p>Here are all the planets</p>
      </div>
    </>
  );
}
