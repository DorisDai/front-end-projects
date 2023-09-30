import React from 'react';
import Nav from './components/Nav';
export default function Result ({ setToken }) {
  return (
    <>
      <Nav setToken={setToken}/>
      <hr/>
      <p>Top 5 users</p>
    </>
  )
}
