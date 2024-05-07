import Navbar from './Navbar';

export default function People() {
  return (
    <>
    <Navbar activeType='People' />
      <div className="people">
        <h1>People</h1>
        <p>Here are all the people</p>
      </div>
    </>
  );
}
