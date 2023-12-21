import { useState, useEffect } from 'react';
import { getPlayerData } from './requests/getPlayerData';
import React from 'react';
import LeaugeTable from './pages/Table';

function App() {

  return (
    <>
    <LeaugeTable />
    </>
  );
}

export default App;
