import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import CourseCard from './CourseCard';

// ----------------------------------------------------------------------

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
};

export default function CourseList({ courses, ...other }) {
  return (
    <Grid container spacing={1} {...other}>
      {courses.map((course) => (
        <Grid key={course.id} item xs={12} sm={6} md={3}>
          <CourseCard course={course} />
        </Grid>
      ))}
    </Grid>
  );
}
