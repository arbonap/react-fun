import Navbar from './Navbar';

export default
function Vehicles() {
  return (
    <>
    <Navbar activeType='Vehicles' />
    <div className="vehicles">
      <h1>Vehicles</h1>
      <p>Here are all the vehicles</p>
    </div>
    </>
  );
}
