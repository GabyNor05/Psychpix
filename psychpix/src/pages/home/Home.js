import React from 'react';
import './Home.css';

function Home() {
  return (
    <>
      <div className='HeroSection'>
          <div className="grid-container">
            <div className="box" style={{gridArea: 'box-1'}}></div>
            <div className="box" style={{gridArea: 'box-2'}}></div>
            <div className="box" style={{gridArea: 'box-3'}}></div>
            <div className="box" style={{gridArea: 'box-4'}}></div>
            <div className="box" style={{gridArea: 'box-5'}}></div>
            <div className="box" style={{gridArea: 'box-6'}}></div>
            <div className="box" style={{gridArea: 'box-7'}}></div>
        </div>
      </div>

      <div className="linkScroll">
        <div><h1>link 1</h1></div>
        <div><h1>link 2</h1></div>
        <div><h1>link 3</h1></div>
        <div><h1>link 4</h1></div>
        <div><h1>link 5</h1></div>
        <div><h1>link 6</h1></div>
        <div><h1>link 7</h1></div>
      </div>
    </>
  );
}

export default Home;