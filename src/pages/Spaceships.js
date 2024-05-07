import Navbar from './Navbar';

export default
function Spaceships() {
  return (
    <>
      <Navbar activeType='Spaceships' />
      <div className="spaceships">
        <h1>Spaceships</h1>
        <p>Here are all the spaceships</p>
      </div>
    </>
  );
}
