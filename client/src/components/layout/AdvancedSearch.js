import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginRight: 12,
    marginTop: 6,
    marginBottom: 6,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function AdvancedSearch() {
  const classes = useStyles();
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          onChange={handleChange}
        >
          <MenuItem value={10}>Upload Date (Oldest)</MenuItem>
          <MenuItem value={20}>Upload Date (Newest)</MenuItem>
          <MenuItem value={40}>Most Popular</MenuItem>
          <MenuItem value={30}>Default</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Emote Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          onChange={handleChange}
        >
          <MenuItem value={10}>.GIF</MenuItem>
          <MenuItem value={20}>.PNG</MenuItem>
          <MenuItem value={40}>{'Both (.GIF & .PNG)'}</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default AdvancedSearch;
