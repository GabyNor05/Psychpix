import logo from './logo.svg';
import React from 'react';

function Home() {
  return (
    <div className="grid-container">
        <div className="box" style={{gridArea: 'box-1'}}></div>
        <div className="box" style={{gridArea: 'box-1'}}></div>
        <div className="box" style={{gridArea: 'box-1'}}></div>
        <div className="box" style={{gridArea: 'box-1'}}></div>
        <div className="box" style={{gridArea: 'box-1'}}></div>
        <div className="box" style={{gridArea: 'box-1'}}></div>
        <div className="box" style={{gridArea: 'box-1'}}></div>
    </div>
  );
}

export default Home;