import React from 'react';
import { Grid, TextField, MenuItem } from '@mui/material';

const Search = ({ filters, onFilterChange, onKeywordChange, onSearchKeyPress, searchValues, helperText }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <TextField
                    required
                    label="Filter"
                    fullWidth
                    select
                    name="filter"
                    value={searchValues.filter}
                    onChange={(e) => onFilterChange(e.target.value)}
                >
                    {filters.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={8}>
                <TextField
                    fullWidth
                    helperText={helperText}
                    label="Enter keywords..."
                    name="keywords"
                    value={searchValues.keywords}
                    onChange={(e) => onKeywordChange(e.target.value)}
                    onKeyPress={onSearchKeyPress}
                    variant="outlined"
                    
                />
            </Grid>
        </Grid>
    );
};

export default Search;