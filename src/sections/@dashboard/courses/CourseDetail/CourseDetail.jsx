import PropTypes from 'prop-types';

import { Link, useNavigate } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

// @mui
import { Button, Stack, Typography, Container, Box } from '@mui/material';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

// @component
import classNames from 'classnames/bind';
import Styles from './CourseDetail.module.scss';

const cx = classNames.bind(Styles);

CourseDetail.propTypes = {
    block: PropTypes.object,
};

function CourseDetail({ block }) {
    const navigate = useNavigate();

    const [lessonList, setLessonList] = useState([]);

    useEffect(() => {
        const fetchLessonList = async () => {
            const { data: response } = await axios.get('http://localhost:8871/api/lesson/getalllessons');

            const result = response.data.filter((item) => item.blockId === '7');

            console.log(result);

            setLessonList(result);
        };

        fetchLessonList();
    }, []);

    const handleNavigateBack = () => {
        navigate(-1);
    };

    console.log(block);

    return (
        <>
            <Button sx={{ marginLeft: '35px' }} onClick={handleNavigateBack}>
                <ArrowBackIosRoundedIcon />
                <Typography variant="subtitle1">back</Typography>
            </Button>
            <Container maxWidth="md" className={cx('container', 'my-4')}>
                <Typography variant="h3" className="d-flex my-4 mx-5">
                    Course Detail Editor
                </Typography>
                <div className={cx('course-section')}>
                    <Box sx={{ marginY: 4 }} className={cx('badge', 'green-badge')}>
                        <h3 className={cx('section-desc')}>{block.title}</h3>
                    </Box>

                    <Stack sx={{ display: 'flex', flex: 'flex-column', alignItems: 'center', paddingTop: 1 }}>
                        <Link to={`/dashboard/lesson/${lessonList[0]?.id}`}>
                            <Button
                                // onClick={handleNavigateToLesson}
                                sx={{ marginY: 2, position: 'relative' }}
                                className={cx('green-button-active', 'button-to-get-in-lesson', 'lesson-active')}
                            >
                                <img
                                    src="https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/ef9c771afdb674f0ff82fae25c6a7b0a.svg"
                                    alt=""
                                />
                            </Button>
                        </Link>

                        <Link to={`/dashboard/lesson/${lessonList[1]?.id}`}>
                            <Button
                                sx={{ marginY: 2, position: 'relative' }}
                                type="submit"
                                className={cx('button-to-get-in-lesson', 'green-button-active', 'position-relative')}
                            >
                                <img
                                    src="https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/ef9c771afdb674f0ff82fae25c6a7b0a.svg"
                                    alt=""
                                />
                            </Button>
                        </Link>

                        <Link to={`/dashboard/lesson/${lessonList[2]?.id}`}>
                            <Button
                                type="submit"
                                sx={{ marginY: 2, position: 'relative' }}
                                className={cx('button-to-get-in-lesson', 'green-button-active')}
                                style={{ left: '-45px' }}
                            >
                                <img
                                    src="https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/ef9c771afdb674f0ff82fae25c6a7b0a.svg"
                                    alt=""
                                />
                            </Button>
                        </Link>

                        <Link to={`/dashboard/lesson/${lessonList[3]?.id}`}>
                            <Button
                                sx={{ marginY: 2, position: 'relative' }}
                                type="submit"
                                className={cx('button-to-get-in-lesson', 'green-button-active')}
                                style={{ left: '-80px' }}
                            >
                                <img
                                    src="https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/ef9c771afdb674f0ff82fae25c6a7b0a.svg"
                                    alt=""
                                />
                            </Button>
                        </Link>

                        <Link to={`/dashboard/lesson/${lessonList[4]?.id}`}>
                            <Button
                                sx={{ marginY: 2, position: 'relative' }}
                                type="submit"
                                className={cx('button-to-get-in-lesson', 'green-button-active')}
                                style={{ left: '-45px' }}
                            >
                                <img
                                    src="https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/ef9c771afdb674f0ff82fae25c6a7b0a.svg"
                                    alt=""
                                />
                            </Button>
                        </Link>

                        <Link to={`/dashboard/lesson/${lessonList[5]?.id}`}>
                            <Button
                                sx={{ marginY: 2, position: 'relative' }}
                                type="submit"
                                className={cx('button-to-get-in-lesson', 'green-button-active')}
                            >
                                <img
                                    src="https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/ef9c771afdb674f0ff82fae25c6a7b0a.svg"
                                    alt=""
                                />
                            </Button>
                        </Link>

                        <Link to={`/dashboard/lesson/${lessonList[6]?.id}`}>
                            <Button
                                sx={{ marginY: 2, position: 'relative' }}
                                type="submit"
                                className={cx('button-to-get-in-lesson', 'green-button-active')}
                                style={{ left: '55px' }}
                            >
                                <img
                                    src="https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/ef9c771afdb674f0ff82fae25c6a7b0a.svg"
                                    alt=""
                                />
                            </Button>
                        </Link>

                        <Link to={`/dashboard/lesson/${lessonList[7]?.id}`}>
                            <Button
                                sx={{ marginY: 2, position: 'relative' }}
                                type="submit"
                                className={cx('button-to-get-in-lesson', 'green-button-active')}
                                style={{ left: '85px' }}
                            >
                                <img
                                    src="https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/ef9c771afdb674f0ff82fae25c6a7b0a.svg"
                                    alt=""
                                />
                            </Button>
                        </Link>

                        <Link to={`/dashboard/lesson/${lessonList[8]?.id}`}>
                            <Button
                                sx={{ marginY: 2, position: 'relative' }}
                                type="submit"
                                className={cx('button-to-get-in-lesson', 'green-button-active')}
                                style={{ left: '50px' }}
                            >
                                <img
                                    src="https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/ef9c771afdb674f0ff82fae25c6a7b0a.svg"
                                    alt=""
                                />
                            </Button>
                        </Link>

                        <Link to={`/dashboard/lesson/${lessonList[9]?.id}`}>
                            <Button
                                sx={{ marginY: 2, position: 'relative' }}
                                type="submit"
                                className={cx('button-to-get-in-lesson', 'green-button-active')}
                            >
                                <img
                                    src="https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/ef9c771afdb674f0ff82fae25c6a7b0a.svg"
                                    alt=""
                                />
                            </Button>
                        </Link>
                    </Stack>
                </div>
            </Container>
        </>
    );
}

export default CourseDetail;
