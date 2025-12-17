
import { Outlet } from 'react-router';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { Toaster } from 'react-hot-toast';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';

const RootLayout = () => {
    return (
        <div className='bg-base-200'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
            <Toaster/>
            <ScrollToTop></ScrollToTop>
        </div>
    );
};

export default RootLayout;