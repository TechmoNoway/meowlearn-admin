import PropTypes from 'prop-types';

import { Link, useNavigate, useParams } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

// @mui
import { Button, Stack, Typography, Container, Box } from '@mui/material';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

// @component
import classNames from 'classnames/bind';
import Styles from './CourseDetail.module.scss';
import stringIdSort from '../../../../utils/sort';
import BiggerIconify from '../../../../components/iconify/BiggerIconify';

const cx = classNames.bind(Styles);

CourseDetail.propTypes = {
    block: PropTypes.object,
};

function CourseDetail({ block }) {
    const param = useParams();
    const navigate = useNavigate();

    const [lessonList, setLessonList] = useState([]);

    useEffect(() => {
        const fetchLessonList = async () => {
            const { data: response } = await axios.get('http://localhost:8871/api/lesson/getalllessons');

            // const { data: response } = await axios.get(
            //     'https://course-backend-meolearn.onrender.com/api/lesson/getalllessons',
            // );

            const result = response.data.filter((item) => item.blockId === param.courseId);

            result.sort(stringIdSort);

            console.log(result);

            setLessonList(result);
        };

        fetchLessonList();
    }, []);

    const handleNavigateBack = () => {
        navigate(-1);
    };

    return (
        <>
            <Container maxWidth="md" className={cx('container', 'my-4')}>
                <Typography variant="h3" mb={1} display="flex" alignItems="center">
                    <Button onClick={handleNavigateBack} sx={{ minWidth: '36px', marginRight: 1 }}>
                        <ArrowBackIosRoundedIcon />
                    </Button>
                    Block Detail
                </Typography>
                <div className={cx('course-section')}>
                    <Box sx={{ marginY: 4 }} className={cx('badge', 'green-badge')}>
                        <h3 className={cx('section-desc')}>{block.title}</h3>
                    </Box>

                    <Stack sx={{ display: 'flex', flex: 'flex-column', alignItems: 'center', paddingTop: 1 }}>
                        {lessonList.length > 0 && (<Link to={`/dashboard/lesson/${lessonList[0]?.id}`}>
                            <Button
                                sx={{ marginY: 2, position: 'relative', color: 'white' }}
                                className={cx('green-button-active', 'button-to-get-in-lesson', 'lesson-active')}
                            >
                                <BiggerIconify icon="ph:number-one-bold" />
                            </Button>
                        </Link>)}

                        {lessonList.length > 1 && (<Link to={`/dashboard/lesson/${lessonList[1]?.id}`}>
                            <Button
                                sx={{ marginY: 2, position: 'relative', color: 'white' }}
                                type="submit"
                                className={cx('button-to-get-in-lesson', 'green-button-active', 'position-relative')}
                            >
                                <BiggerIconify icon="ph:number-two-bold" />
                            </Button>
                        </Link>)}

                        {lessonList.length > 2 && (<Link to={`/dashboard/lesson/${lessonList[2]?.id}`}>
                            <Button
                                type="submit"
                                sx={{ marginY: 2, position: 'relative', color: 'white' }}
                                className={cx('button-to-get-in-lesson', 'green-button-active')}
                                style={{ left: '-45px' }}
                            >
                                <BiggerIconify icon="ph:number-three-bold" />
                            </Button>
                        </Link>)}

                        {lessonList.length > 3 && (<Link to={`/dashboard/lesson/${lessonList[3]?.id}`}>
                            <Button
                                sx={{ marginY: 2, position: 'relative', color: 'white' }}
                                type="submit"
                                className={cx('button-to-get-in-lesson', 'green-button-active')}
                                style={{ left: '-80px' }}
                            >
                                <BiggerIconify icon="ph:number-four-bold" />
                            </Button>
                        </Link>)}

                        {lessonList.length > 4 && (<Link to={`/dashboard/lesson/${lessonList[4]?.id}`}>
                            <Button
                                sx={{ marginY: 2, position: 'relative', color: 'white' }}
                                type="submit"
                                className={cx('button-to-get-in-lesson', 'green-button-active')}
                                style={{ left: '-45px' }}
                            >
                                <BiggerIconify icon="ph:number-five-bold" />
                            </Button>
                        </Link>)}

                        {lessonList.length > 5 && (<Link to={`/dashboard/lesson/${lessonList[5]?.id}`}>
                            <Button
                                sx={{ marginY: 2, position: 'relative', color: 'white' }}
                                type="submit"
                                className={cx('button-to-get-in-lesson', 'green-button-active')}
                            >
                                <BiggerIconify icon="ph:number-six-bold" />
                            </Button>
                        </Link>)}

                        {lessonList.length > 6 && (<Link to={`/dashboard/lesson/${lessonList[6]?.id}`}>
                            <Button
                                sx={{ marginY: 2, position: 'relative', color: 'white' }}
                                type="submit"
                                className={cx('button-to-get-in-lesson', 'green-button-active')}
                                style={{ left: '55px' }}
                            >
                                <BiggerIconify icon="ph:number-seven-bold" />
                            </Button>
                        </Link>)}

                        {lessonList.length > 7 && (<Link to={`/dashboard/lesson/${lessonList[7]?.id}`}>
                            <Button
                                sx={{ marginY: 2, position: 'relative', color: 'white' }}
                                type="submit"
                                className={cx('button-to-get-in-lesson', 'green-button-active')}
                                style={{ left: '85px' }}
                            >
                                <BiggerIconify icon="ph:number-eight-bold" />
                            </Button>
                        </Link>)}

                        {lessonList.length > 8 && (<Link to={`/dashboard/lesson/${lessonList[8]?.id}`}>
                            <Button
                                sx={{ marginY: 2, position: 'relative', color: 'white' }}
                                type="submit"
                                className={cx('button-to-get-in-lesson', 'green-button-active')}
                                style={{ left: '50px' }}
                            >
                                <BiggerIconify icon="ph:number-nine-bold" />
                            </Button>
                        </Link>)}

                        {lessonList.length > 9 && (<Link to={`/dashboard/lesson/${lessonList[9]?.id}`}>
                            <Button
                                sx={{ marginY: 2, position: 'relative', color: 'white' }}
                                type="submit"
                                className={cx('button-to-get-in-lesson', 'green-button-active')}
                                style={{ left: '50px' }}
                            >
                                <BiggerIconify icon="ph:number-zero-bold" />
                            </Button>
                        </Link>)}
                    </Stack>
                </div>
            </Container>
        </>
    );
}

export default CourseDetail;
