import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import CoursesPage from './pages/CoursesPage';
import DashboardAppPage from './pages/DashboardAppPage';
import CourseDetailPage from './pages/CourseDetailPage';
import LessonEditPage from './pages/LessonEditPage';
import ProfilePage from './pages/ProfilePage';
import TestPage from './pages/TestPage';
import PracticePage from './pages/PracticePage';
import PracticeDetailPage from './pages/PracticeDetailPage';
import TestDetailPage from './pages/TestDetailPage';
import OrderPage from './pages/OrderPage';
import TaskPage from './pages/TaskPage';

// ----------------------------------------------------------------------

export default function Router() {
    const routes = useRoutes([
        {
            path: '/dashboard',
            element: <DashboardLayout />,
            children: [
                { element: <Navigate to="/dashboard/app" />, index: true },
                { path: 'app', element: <DashboardAppPage /> },
                { path: 'user', element: <UserPage /> },
                { path: 'courses', element: <CoursesPage /> },
                { path: 'blog', element: <BlogPage /> },
                { path: 'coursedetail/:courseId', element: <CourseDetailPage /> },
                { path: 'lesson/:lessonId', element: <LessonEditPage /> },
                { path: 'profile', element: <ProfilePage /> },
                { path: 'testmanage', element: <TestPage /> },
                { path: 'practicepage', element: <PracticePage /> },
                { path: 'practicedetail/:practiceId', element: <PracticeDetailPage /> },
                { path: 'testpage', element: <TestPage /> },
                { path: 'testdetail/:testId', element: <TestDetailPage /> },
                { path: 'task', element: <TaskPage /> },
                { path: 'order', element: <OrderPage /> },
                { path: '404', element: <Page404 /> },
                { path: '*', element: <Navigate to="/404" /> },
            ],
        },
        {
            path: 'login',
            element: <LoginPage />,
            index: true,
        },
        {
            element: <SimpleLayout />,
            children: [
                { element: <Navigate to="/login" />, index: true },
                { path: '404', element: <Page404 /> },
                { path: '*', element: <Navigate to="/404" /> },
            ],
        },
        // {
        //     element: <SimpleLayout />,
        //     children: [
        //         { element: <Navigate to="/dashboard/app" />, index: true },
        //         { path: '404', element: <Page404 /> },
        //         { path: '*', element: <Navigate to="/404" /> },
        //     ],
        // },
        {
            path: '*',
            element: <Navigate to="/404" replace />,
        },
    ]);

    return routes;
}
