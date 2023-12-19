import classNames from 'classnames/bind';
import styles from './SpinnerLoader.module.scss';

const cx = classNames.bind(styles);

function SpinnerLoader() {
    return (
        <>
            <span className={cx('loader')}> </span>
        </>
    );
}

export default SpinnerLoader;
