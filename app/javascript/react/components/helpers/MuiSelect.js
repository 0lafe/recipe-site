import React, { useState } from "react"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function MuiSelect({options, callback, selected}) {

  const handleChange = (event) => {
    callback(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sort Type</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selected}
            label="Sort Type"
            onChange={handleChange}
        >
          {options.map(option => {
              return (
                <MenuItem value={option} key={option}>{option}</MenuItem>
              )
          })}
        </Select>
      </FormControl>
    </Box>
  );
}