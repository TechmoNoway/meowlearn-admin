import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// icons
import { Icon } from '@iconify/react';
// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const BiggerIconify = forwardRef(({ icon, width = 35, sx, ...other }, ref) => (
    <Box ref={ref} component={Icon} icon={icon} sx={{ width: 40, height: width, ...sx }} {...other} />
));

BiggerIconify.propTypes = {
    sx: PropTypes.object,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};

export default BiggerIconify;
