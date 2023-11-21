import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import PracticeCard from './PracticeCard';

PracticeList.propTypes = {
    practices: PropTypes.array.isRequired,
};

export default function PracticeList({ practices, ...other }) {
    return (
        <Grid container spacing={1} {...other}>
            {practices.map((practice) => (
                <Grid key={practice.id} item xs={12} sm={6} md={3}>
                    <PracticeCard practice={practice} />
                </Grid>
            ))}
        </Grid>
    );
}
