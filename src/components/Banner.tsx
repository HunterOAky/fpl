import React from 'react'
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';


export const Banner = () => {
  return (
    <Toolbar style={{ backgroundColor: "#37003c", width: "100%", textAlign:"center", marginTop:"0"}}>
      <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
      </IconButton>
      <h2 style={{ textAlign: "center", margin: "0 auto", width: "100%" }}>J F(antasy) K League Table 2023/24</h2>
    </Toolbar>
  )
}
