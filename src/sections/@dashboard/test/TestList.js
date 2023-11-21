import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import TestCard from './TestCard';

TestList.propTypes = {
    tests: PropTypes.array.isRequired,
};

export default function TestList({ tests, ...other }) {
    return (
        <Grid container spacing={1} {...other}>
            {tests.map((test) => (
                <Grid key={test.id} item xs={12} sm={6} md={3}>
                    <TestCard test={test} />
                </Grid>
            ))}
        </Grid>
    );
}
