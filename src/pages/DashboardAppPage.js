import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import axios from 'axios';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
// sections
import { AppCurrentVisits, AppWebsiteVisits, AppWidgetSummary } from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const years = [2023, 2022, 2021];

export default function DashboardAppPage() {
    const theme = useTheme();

    const [userPerMonthData, setUserPerMonthData] = useState([]);
    const [yearOption, setYearOption] = useState(2023);
    const [userTotal, setUserTotal] = useState(0);

    const fetchUserLogByYear = (year) => {
        if (year === 2023) {
            const userAmountArray = [];

            months.forEach(async (item, index) => {
                const { data: response } = await axios.get(
                    `http://localhost:8870/api/user/getNewSignInUserByMonth/${item}`,
                );

                userAmountArray.push(response.data.length);

                if (index === 11) {
                    setUserPerMonthData(userAmountArray);
                }
            });

        } else {
            setUserPerMonthData([])
        }
    };

    const fetchUserAmount = async () => {
        const { data: response } = await axios.get(`http://localhost:8870/api/user/getallusers`);

        setUserTotal(response.data.length);
    };

    useEffect(() => {
        fetchUserAmount();
    }, [])

    // const [userAmount, setUserAmount] = useState(0);

    const firstDayEachMonth = (year) => {
        const dates = [];

        for (let month = 0; month < 12; month += 1) {
            const date = new Date(year, month, 1);
            const formatted = date.toLocaleDateString('en-US', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            });
            dates.push(formatted);
        }

        setDatesArray(dates);
    };

    const handleChangeCurrentYear = (e) => {
        setYearOption(e.target.value)
    }

    const [datesArray, setDatesArray] = useState([
        '01/01/2003',
        '02/01/2003',
        '03/01/2003',
        '04/01/2003',
        '05/01/2003',
        '06/01/2003',
        '07/01/2003',
        '08/01/2003',
        '09/01/2003',
        '10/01/2003',
        '11/01/2003',
    ]);


    useEffect(() => {
        firstDayEachMonth(yearOption);
        fetchUserLogByYear(yearOption)
    }, [yearOption]);

    return (
        <>
            <Helmet>
                <title> Dashboard | MeowLearn </title>
            </Helmet>

            <Container maxWidth="xl">
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Hi, Welcome back
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Android Users" total={0o0} icon={'ant-design:android-filled'} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Apple Users" total={0} color="info" icon={'ant-design:apple-filled'} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary
                            title="Web Users"
                            total={userTotal}
                            color="warning"
                            icon={'ant-design:windows-filled'}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Bug Reports" total={10} color="error" icon={'ant-design:bug-filled'} />
                    </Grid>

                    {datesArray && (
                        <Grid item xs={12} md={12} lg={12}>
                            <AppWebsiteVisits
                                title="Website Visits"
                                // subheader="(+43%) than last year"
                                coreValue={yearOption}
                                options={years}
                                onSort={(e) => handleChangeCurrentYear(e)}
                                chartLabels={datesArray}
                                chartData={[
                                    {
                                        name: 'Column',
                                        type: 'column',
                                        fill: 'solid',
                                        data: userPerMonthData,
                                    },
                                    {
                                        name: 'Area',
                                        type: 'area',
                                        fill: 'gradient',
                                        data: userPerMonthData,
                                    },
                                ]}
                            />
                        </Grid>
                    )}

                    <Grid item xs={12} md={12} lg={4}>
                        <AppCurrentVisits
                            title="Current Visits"
                            chartData={[
                                { label: 'America', value: 0 },
                                { label: 'Asia', value: userTotal },
                                { label: 'Europe', value: 0 },
                                { label: 'Africa', value: 0 },
                            ]}
                            chartColors={[
                                theme.palette.primary.main,
                                theme.palette.info.main,
                                theme.palette.warning.main,
                                theme.palette.error.main,
                            ]}
                        />
                    </Grid>

                    {/* <Grid item xs={12} md={6} lg={8}>
                        <AppConversionRates
                            title="Conversion Rates"
                            subheader="(+43%) than last year"
                            chartData={[
                                { label: 'Italy', value: 400 },
                                { label: 'Japan', value: 430 },
                                { label: 'China', value: 448 },
                                { label: 'Canada', value: 470 },
                                { label: 'France', value: 540 },
                                { label: 'Germany', value: 580 },
                                { label: 'South Korea', value: 690 },
                                { label: 'Netherlands', value: 1100 },
                                { label: 'United States', value: 1200 },
                                { label: 'United Kingdom', value: 1380 },
                            ]}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <AppCurrentSubject
                            title="Current Subject"
                            chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
                            chartData={[
                                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
                            ]}
                            chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
                        />
                    </Grid> */}
                </Grid>
            </Container>
        </>
    );
}
