import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';

import { clearEmotes, getEmotes } from '../../actions/emotes';

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 1),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '30ch',
      '&:focus': {
        width: '40ch',
      },
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },

    marginRight: theme.spacing(1),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(2),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function SearchBar({ clearEmotes, getEmotes, location }) {
  const classes = useStyles();
  const [query, setQuery] = useState('');
  const history = useHistory();

  const onChange = (e) => setQuery(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();

    const search = query ? 'search=' + query.split(' ').join('+') : '';
    history.push(`/browse?${search}`);
    setQuery('');
  };

  return (
    <form autocomplete="off" className={classes.search} onSubmit={onSubmit}>
      <IconButton
        color="inherit"
        aria-label="search"
        type="submit"
        onClick={onSubmit}
        className={classes.searchIcon}
      >
        <SearchIcon />
      </IconButton>
      <InputBase
        placeholder="Search Emotes…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        value={query}
        name="query"
        onChange={onChange}
        inputProps={{ 'aria-label': 'search' }}
      />
    </form>
  );
}

export default connect(null, { clearEmotes, getEmotes })(SearchBar);
