// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
    {
        title: 'dashboard',
        path: '/dashboard/app',
        icon: icon('ic_analytics'),
    },
    {
        title: 'user',
        path: '/dashboard/user',
        icon: icon('ic_user'),
    },
    {
        title: 'course',
        path: '/dashboard/courses',
        icon: icon('ic_course'),
    },
    {
        title: 'test',
        path: '/dashboard/testpage',
        icon: icon('ic_exam'),
    },
    {
        title: 'practice',
        path: '/dashboard/practicepage',
        icon: icon('ic_book1'),
    },
    // {
    //     title: 'blog',
    //     path: '/dashboard/blog',
    //     icon: icon('ic_blog'),
    // },
    // {
    //     title: 'login',
    //     path: '/login',
    //     icon: icon('ic_lock'),
    // },
];

export default navConfig;
