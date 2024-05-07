import Navbar from './Navbar';

export default
function Species() {
  return (
    <>
      <Navbar activeType='Species' />
      <div className="species">
        <h1>Species</h1>
        <p>Here are all the species</p>
      </div>
    </>
  );
}
