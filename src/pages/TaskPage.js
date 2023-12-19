import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import axios from 'axios';

// @mui
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
import { TaskPostCard, TaskPostsSort, TaskPostsSearch } from '../sections/@dashboard/task';
// mock
import POSTS from '../_mock/blog';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
    { value: 'latest', label: 'Latest' },
    { value: 'popular', label: 'Popular' },
    { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return filter(array, (_task) => _task.title.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}


export default function TaskPage() {


    const [filterTitle, setFilterName] = useState('');


    const fetchTasks = async () => {
        const { data: response } = await axios.get('')
    }

    useEffect(() => {

    }, [])


    return (
        <>
            <Helmet>
                <title> Task | MeowLearn </title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Task
                    </Typography>
                    <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                        New Task
                    </Button>
                </Stack>

                <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
                    <TaskPostsSearch posts={POSTS} />
                    {/* <TaskPostsSort options={SORT_OPTIONS} /> */}
                </Stack>

                <Grid container spacing={3}>
                    {POSTS.map((post, index) => (
                        <TaskPostCard key={post.id} post={post} index={index} />
                    ))}
                </Grid>
            </Container>
        </>
    );
}
