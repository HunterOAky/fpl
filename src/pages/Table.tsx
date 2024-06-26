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
import CircularProgress from '@mui/material/CircularProgress';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
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

type WeekData = {
  week: number;
  points: number;
  teamName: string;
};

type ManagerData = {
  [manager: string]: WeekData[];
};

const managerList: ManagerList = {
  Aaron: '2675959',
  Curtis: '67277',
  Mike:'760692',
  Alex:'1418098',
  Jeremiah:'4577575',
  George:'1996958',
  Matt:'2612009',
  Liam:'6257277'
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

const LeagueTable = () => {
  const [selectedValue, setSelectedValue] = useState('5');
  const [pointsList, setPointsList] = useState<ManagerData>({});
  const [currentPointsList, setCurrentPointsList] = useState<Array<[string, number]>>([]);
  const [loading, setLoading] = useState(true);
  const [customWeekEntry, setCustomWeekEntry] = useState<boolean>(false);
  const [customStart, setCustomStart] = useState(1);
  const [customEnd, setCustomEnd] = useState(2);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value);
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomWeekEntry(event.target.checked);
  };

  const handleCustomWeekChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const numericValue = Number(value);
  
    // Check if the value is a valid number
    if (isNaN(numericValue)) {
      // Display an error message or handle the invalid input in some way
      console.error(`Invalid input for ${name}: ${value}`);
      return;
    }
  
    // Set the state based on the valid number
    if (name === 'customStart') {
      setCustomStart(numericValue);
    } else if (name === 'customEnd') {
      setCustomEnd(numericValue);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await getPlayerData(managerList);
        setPointsList(results);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const updatePointsList = () => {
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

      const updatedPointsList: Array<[string, number]> = Object.entries(pointsList).map(
        ([manager, managerWeeks]) => [
          manager,
          managerWeeks
            .filter(({ week }) => week >= (customWeekEntry ? customStart: start) && week <= (customWeekEntry? customEnd : end))
            .reduce((totalPoints, { points }) => totalPoints + points, 0),
        ]
      );

      setCurrentPointsList(updatedPointsList);
      console.log(currentPointsList)
    };

    updatePointsList();
  }, [selectedValue, pointsList, customWeekEntry, customStart, customEnd]);

  return (
    <div className="main-container">
      { loading ?
      <div className='progress-bar'>
        <CircularProgress style={{color:"lightblue"}} />
        <h3 style={{color:'#37003c'}}>Loading... be patient you bastard</h3>
      </div> :
      <div>
      <div className='select-month-container'>
        <FormControlLabel
        style={{ color: "#37003c" }}
        control={<Switch checked={customWeekEntry} onChange={handleSwitchChange} />}
        label="Custom Weeks"
        />
        <div>
          { customWeekEntry ?
            <div className='custom-weeks-select'>
              <TextField
                label="Start Week"
                
                value={customStart}
                onChange={handleCustomWeekChange}
                key="start"
                name="customStart"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{style:{textAlign:"center", fontWeight:"bold", color:"#37003c"}}}
                style={{ width: "100px", marginRight: "10px" }}  // Add marginRight to create space
              />
              <TextField
                label="End Week"
                
                value={customEnd}
                key="end"
                name="customEnd"
                onChange={handleCustomWeekChange}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{style:{textAlign:"center", fontWeight:"bold", color:"#37003c"}}}
                style={{ width: "100px" }}
              />
          </div>
          :
          <div className='select-month-default'>

            <Select value={selectedValue} onChange={handleChange}>
              <MenuItem value="1">1 (Aug & Sept)</MenuItem>
              <MenuItem value="2">2 (Oct & Nov)</MenuItem>
              <MenuItem value="3">3 (Dec & Jan)</MenuItem>
              <MenuItem value="4">4 (Feb & Mar)</MenuItem>
              <MenuItem value="5">5 (Apr & May)</MenuItem>
            </Select>
          </div>}
        </div>
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#37003c" }}>
                <TableCell style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>Position</TableCell>
                <TableCell style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>Manager</TableCell>
                <TableCell style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>Points</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentPointsList.sort(([, pointsA], [, pointsB]) => pointsB - pointsA).map(([manager, points], index) => (
                <TableRow key={manager} style={{ backgroundColor: index === 0 ? '#33FF57' : '#EFEFEF' }}>
                  <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>{index === 0 ? <span>👑</span> : index + 1}</TableCell>
                  <TableCell style={{ textAlign: "center", display:"block" }}>
                    <div style={{fontWeight:"bold"}}>{manager}</div>
                    <label>{pointsList[manager][0].teamName}</label>
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>{points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      </div>}
    </div>
  );
};

export default LeagueTable;
