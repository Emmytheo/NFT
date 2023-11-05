import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Typography, Stack, Card } from '@mui/material';
import { ChevronLeft, MoreHoriz } from '@mui/icons-material';
import { useRedirect } from 'react-admin';

export const TicketCard = ({ticketName, price, ticketState, ticketType, styles, link}) => {
  const [ toggle, setToggle ] = useState(false);
  const redirect = useRedirect();



  return (
    <Stack 
      width={'100%'}
      onClick={()=>{
        redirect(link)
        // setToggle(false);
      }}
      className="card project-card"
      paddingBottom={1}

      style={{
        ...styles,
        background: "linear-gradient(-45deg, var(--onyx-2), var(--eerie-black))",
        // background: 'linear-gradient(-45deg, #610212, #E0455F)',
        // background: "var(--white)",
        

      }}

    >
      <button onClick={()=>{
        // setToggle(!toggle);
        redirect(link)
      }} className="card-menu-btn icon-box" aria-label="More" data-menu-btn>
        <span className="material-symbols-rounded icon"><MoreHoriz /></span>
      </button>
      {/* { 
    toggle ? (
      <ul className="ctx-menu active">
        <li className="ctx-item">
          <button className="ctx-menu-btn icon-box" onClick={()=>{
                  setToggle(!toggle);
                }}>
            <span className="material-symbols-rounded  icon" aria-hidden="true">visibility</span>
            <span className="ctx-menu-text">View</span>
          </button>
        </li>
        <li className="ctx-item">
          <button className="ctx-menu-btn icon-box" onClick={()=>{
                  setToggle(!toggle);
                }}>
            <span className="material-symbols-rounded  icon" aria-hidden="true">edit</span>
            <span className="ctx-menu-text">Edit</span>
          </button>
        </li>
        <li className="divider" />
        <li className="ctx-item">
          <button className="ctx-menu-btn red icon-box" onClick={()=>{
                  setToggle(!toggle);
                }}>
            <span className="material-symbols-rounded  icon" aria-hidden="true">delete</span>
            <span className="ctx-menu-text">Delete</span>
          </button>
        </li>
      </ul>
    ) : (
      null
    )
  } */}
  
  <p className="card-date" 
    style={{
      color: "#fff",
      marginBottom: "15px"
    }}
  >
    {ticketName ? (ticketName) : 'TICKET' }</p>
  <h3 className="card-title" 
    style={{color: "#fff"}}
  >
    <Stack direction={'row'} spacing={2} fontSize='25px'>
      <Stack direction={'row'} spacing={1}>
        <p>{price ? (`${price}`) : '$100000' }</p>
        <div className="card-badge green" 
          style={{marginBottom: "15px"}}
        >{ticketState ? (ticketState) : 'open' }</div>
      </Stack>
    </Stack>
  </h3>
  <Stack direction={'row'} spacing={2}  >
    <div className="card-badge blue">{ticketType ? (ticketType) : 'Table for Five' }</div>
    {/* <Stack direction={'row'} spacing={1}><a href="#">$9000 </a> <p className="card-text">left</p></Stack> */}
  </Stack>
  
  
  </Stack>
  )
  
};