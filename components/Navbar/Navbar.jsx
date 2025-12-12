import React from 'react';
import Logo from '../Logo/Logo';
import { Link, NavLink } from 'react-router';

const Navbar = () => {
    return (
        <div>
            <div className="fixed w-full shadow-sm top-0 backdrop-blur-xl z-50 ">
              <div className='navbar max-w-7xl mx-auto px-4 flex justify-between'>
                  <div className='flex items-center'>
                    <div className='w-8'><Logo></Logo></div>
                  <h1 className='m-3 text-xl font-bold text-primary'>AssetVerse</h1>
                  </div>

                  {/* login */}
                  <div className='flex gap-2'>
                    <Link to='/login'><button className='btn btn-soft btn-primary rounded-lg'>Join as Employee</button></Link>
                    <Link to='/login'><button className='btn btn-primary rounded-lg'>Join as  HR Manager</button></Link>
                  </div>
              </div>
</div>
        </div>
    );
};

export default Navbar;