import React, { useEffect, useState } from 'react';
import { getPlayerData } from '../requests/getPlayerData';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './Table.css';

type ManagerList = {
  [key: string]: string;
};

type MonthList = {
  [key: string]: {
    start: number;
    end: number;
  };
};

type ValueNumberPair = [string, number];

const managerList: ManagerList = {
  Aaron: '2675959',
  Curtis: '67277',
  Mike: '760692',
  Alex: '1418098',
  Jeremiah: '4577575',
  George: '1996958',
  Matt: '2612009',
  Liam: '6257277'
};

const setMonths: MonthList = {
  first: {
    start: 1,
    end: 7,
  },
  second: {
    start: 8,
    end: 13,
  },
  third: {
    start: 14,
    end: 22,
  },
  fourth: {
    start: 23,
    end: 30,
  },
  fifth: {
    start: 31,
    end: 38,
  },
};

const LeaugeTable = () => {
  const [selectedValue, setSelectedValue] = useState('2');
  const [pointsList, setPointsList] = useState<ValueNumberPair[]>([]);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let start: number;
        let end: number;

        switch (selectedValue) {
          case '1':
            start = setMonths.first.start;
            end = setMonths.first.end;
            break;
          case '2':
            start = setMonths.second.start;
            end = setMonths.second.end;
            break;
          case '3':
            start = setMonths.third.start;
            end = setMonths.third.end;
            break;
          case '4':
            start = setMonths.fourth.start;
            end = setMonths.fourth.end;
            break;
          case '5':
            start = setMonths.fifth.start;
            end = setMonths.fifth.end;
            break;
          default:
            start = 0;
            end = 0;
        }

        const promises = Object.entries(managerList).map(([manager, managerId]) =>
          getPlayerData(start, end, managerId).then((data) => ({ manager, data }))
        );

        const results = await Promise.all(promises);

        const sortedPairs = results
          .map(({ manager, data }) => [manager, data] as ValueNumberPair)
          .sort((a, b) => a[1] - b[1]).reverse();

        setPointsList(sortedPairs);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [selectedValue]);

  return (
    <div className="main-container">
      <div className='title-container'>
        <h2 className='title'>J F(antasy) K Leauge Table 2023/24</h2>
      </div>
      <div className='select-month-container'>
        <label style={{color:"#37003c", marginRight:"2%", fontWeight:"bold"}}>Select Months: </label>
        <Select value={selectedValue} onChange={handleChange} style={{ marginRight: '10px' }}>
          <MenuItem value="1">1 (Aug & Sept)</MenuItem>
          <MenuItem value="2">2 (Oct & Nov)</MenuItem>
          <MenuItem value="3">3 (Dec & Jan)</MenuItem>
          <MenuItem value="4">4 (Feb & Mar)</MenuItem>
          <MenuItem value="5">5 (Apr & May)</MenuItem>
        </Select>
      </div>

      <div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow style={{backgroundColor: "#37003c"}}>
                <TableCell style={{color:"white", textAlign:"center", fontWeight:"bold"}}>Position</TableCell>
                <TableCell style={{color:"white", textAlign:"center", fontWeight:"bold"}}>Manager</TableCell>
                <TableCell style={{color:"white", textAlign:"center", fontWeight:"bold"}}>Points</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pointsList.map(([manager, points], index) => (
                <TableRow key={manager} style={{ backgroundColor: index === 0 ? '#33FF57': '#EFEFEF'}}>
                  <TableCell style={{textAlign:"center", fontWeight:"bold"}}>{index+1}</TableCell>
                  <TableCell style={{textAlign:"center"}}>{manager}</TableCell>
                  <TableCell style={{textAlign:"center"}}>{points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default LeaugeTable;
