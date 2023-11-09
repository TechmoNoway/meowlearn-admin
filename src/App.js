import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import './index.css';
import { UserProvider } from './context/UserContext';

// ----------------------------------------------------------------------

export default function App() {
    return (
        <HelmetProvider>
            <UserProvider>
                <BrowserRouter>
                    <ThemeProvider>
                        <ScrollToTop />
                        <StyledChart />
                        <Router />
                    </ThemeProvider>
                </BrowserRouter>
            </UserProvider>
        </HelmetProvider>
    );
}
