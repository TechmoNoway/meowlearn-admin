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

            const result = response.data.filter((item) => item.blockId === '7');

            result.sort(stringIdSort);

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
                    Course Detail
                </Typography>
                <div className={cx('course-section')}>
                    <Box sx={{ marginY: 4 }} className={cx('badge', 'green-badge')}>
                        <h3 className={cx('section-desc')}>{block.title}</h3>
                    </Box>

                    <Stack sx={{ display: 'flex', flex: 'flex-column', alignItems: 'center', paddingTop: 1 }}>
                        <Link to={`/dashboard/lesson/${lessonList[0]?.title}`}>
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

                        <Link to={`/dashboard/lesson/${lessonList[1]?.title}`}>
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

                        <Link to={`/dashboard/lesson/${lessonList[2]?.title}`}>
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

                        <Link to={`/dashboard/lesson/${lessonList[3]?.title}`}>
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

                        <Link to={`/dashboard/lesson/${lessonList[4]?.title}`}>
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

                        <Link to={`/dashboard/lesson/${lessonList[5]?.title}`}>
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

                        <Link to={`/dashboard/lesson/${lessonList[6]?.title}`}>
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

                        <Link to={`/dashboard/lesson/${lessonList[7]?.title}`}>
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

                        <Link to={`/dashboard/lesson/${lessonList[8]?.title}`}>
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

                        <Link to={`/dashboard/lesson/${lessonList[9]?.title}`}>
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
