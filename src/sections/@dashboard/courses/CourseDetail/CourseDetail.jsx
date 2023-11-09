import PropTypes from 'prop-types';

import { useNavigate } from 'react-router-dom';
import { Button, Stack, Typography, Container, Box } from '@mui/material';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import classNames from 'classnames/bind';
import Styles from './CourseDetail.module.scss';

const cx = classNames.bind(Styles);

CourseDetail.propTypes = {
    course: PropTypes.object,
};

function CourseDetail({ course }) {
    const navigate = useNavigate();

    const handleNavigateBack = () => {
        navigate(-1);
    };

    const handleNavigateToLesson = () => {
        navigate(`/dashboard/lesson/1`);
    };

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
                        <h3 className={cx('section-desc')}>{course.title}</h3>
                    </Box>

                    <Stack sx={{ display: 'flex', flex: 'flex-column', alignItems: 'center', paddingTop: 1 }}>
                        <Button
                            onClick={handleNavigateToLesson}
                            sx={{
                                marginY: 2,
                                position: 'relative',
                            }}
                            className={cx('green-button-active', 'button-to-get-in-lesson', 'lesson-active')}
                        >
                            <img
                                src="https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/ef9c771afdb674f0ff82fae25c6a7b0a.svg"
                                alt=""
                            />
                        </Button>

                        <Button
                            sx={{
                                marginY: 2,
                                position: 'relative',
                            }}
                            type="submit"
                            className={cx(
                                'button-to-get-in-lesson',
                                'green-button-active',
                                'position-relative',
                                'my-3',
                            )}
                        >
                            <img
                                src="https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/ef9c771afdb674f0ff82fae25c6a7b0a.svg"
                                alt=""
                            />
                        </Button>

                        <Button
                            type="submit"
                            sx={{
                                marginY: 2,
                                position: 'relative',
                            }}
                            className={cx(
                                'button-to-get-in-lesson',
                                'green-button-active',
                                'position-relative',
                                'my-3',
                            )}
                            style={{ left: '-45px' }}
                        >
                            <img
                                src="https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/ef9c771afdb674f0ff82fae25c6a7b0a.svg"
                                alt=""
                            />
                        </Button>

                        <Button
                            sx={{
                                marginY: 2,
                                position: 'relative',
                            }}
                            type="submit"
                            className={cx(
                                'button-to-get-in-lesson',
                                'green-button-active',
                                'position-relative',
                                'my-3',
                            )}
                            style={{ left: '-80px' }}
                        >
                            <img
                                src="https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/ef9c771afdb674f0ff82fae25c6a7b0a.svg"
                                alt=""
                            />
                        </Button>

                        <Button
                            sx={{
                                marginY: 2,
                                position: 'relative',
                            }}
                            type="submit"
                            className={cx(
                                'button-to-get-in-lesson',
                                'green-button-active',
                                'position-relative',
                                'my-3',
                            )}
                            style={{ left: '-45px' }}
                        >
                            <img
                                src="https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/ef9c771afdb674f0ff82fae25c6a7b0a.svg"
                                alt=""
                            />
                        </Button>

                        <Button
                            sx={{
                                marginY: 2,
                                position: 'relative',
                            }}
                            type="submit"
                            className={cx(
                                'button-to-get-in-lesson',
                                'green-button-active',
                                'position-relative',
                                'my-3',
                            )}
                        >
                            <img
                                src="https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/ef9c771afdb674f0ff82fae25c6a7b0a.svg"
                                alt=""
                            />
                        </Button>

                        <Button
                            sx={{
                                marginY: 2,
                                position: 'relative',
                            }}
                            type="submit"
                            className={cx(
                                'button-to-get-in-lesson',
                                'green-button-active',
                                'position-relative',
                                'my-3',
                            )}
                            style={{ left: '55px' }}
                        >
                            <img
                                src="https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/ef9c771afdb674f0ff82fae25c6a7b0a.svg"
                                alt=""
                            />
                        </Button>

                        <Button
                            sx={{
                                marginY: 2,
                                position: 'relative',
                            }}
                            type="submit"
                            className={cx(
                                'button-to-get-in-lesson',
                                'green-button-active',
                                'position-relative',
                                'my-3',
                            )}
                            style={{ left: '85px' }}
                        >
                            <img
                                src="https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/ef9c771afdb674f0ff82fae25c6a7b0a.svg"
                                alt=""
                            />
                        </Button>

                        <Button
                            sx={{
                                marginY: 2,
                                position: 'relative',
                            }}
                            type="submit"
                            className={cx(
                                'button-to-get-in-lesson',
                                'green-button-active',
                                'position-relative',
                                'my-3',
                            )}
                            style={{ left: '50px' }}
                        >
                            <img
                                src="https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/ef9c771afdb674f0ff82fae25c6a7b0a.svg"
                                alt=""
                            />
                        </Button>

                        <Button
                            sx={{
                                marginY: 2,
                                position: 'relative',
                            }}
                            type="submit"
                            className={cx(
                                'button-to-get-in-lesson',
                                'green-button-active',
                                'position-relative',
                                'my-3',
                            )}
                        >
                            <img
                                src="https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/ef9c771afdb674f0ff82fae25c6a7b0a.svg"
                                alt=""
                            />
                        </Button>
                    </Stack>
                </div>
            </Container>
        </>
    );
}

export default CourseDetail;
