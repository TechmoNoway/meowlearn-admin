import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Card, CardHeader, Box, Stack, MenuItem, TextField } from '@mui/material';
// components
import { useChart } from '../../../components/chart';

// ----------------------------------------------------------------------

AppWebsiteVisits.propTypes = {
    title: PropTypes.string,
    subheader: PropTypes.string,
    chartData: PropTypes.array.isRequired,
    chartLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
    options: PropTypes.array,
    onSort: PropTypes.func,
};

export default function AppWebsiteVisits({ title, subheader, chartLabels, chartData, onSort, options, coreValue ,...other }) {
    const chartOptions = useChart({
        plotOptions: { bar: { columnWidth: '16%' } },
        fill: { type: chartData.map((i) => i.fill) },
        labels: chartLabels,
        xaxis: { type: 'datetime' },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: (y) => {
                    if (typeof y !== 'undefined') {
                        return `${y.toFixed(0)} visits`;
                    }
                    return y;
                },
            },
        },
    });

    return (
        <Card {...other}>
            <Stack direction='row' justifyContent='space-between'>
                <CardHeader title={title} subheader={subheader} />
                <TextField select size="small" value={coreValue} onChange={onSort} sx={{ width: 90, marginRight: '24px', marginTop: '24px' }}>
                    {options.map((option, index) => (
                        <MenuItem key={index} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
            </Stack>

            <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                <ReactApexChart type="line" series={chartData} options={chartOptions} height={364} />
            </Box>
        </Card>
    );
}
