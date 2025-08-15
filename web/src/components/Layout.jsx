import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className='bg-light'>
      <Header />
      <div className='d-flex'>
        <Sidebar />
        <main className="p-4" style={{ marginTop: '70px', marginLeft: '200px', width: 'calc(100% - 200px)' }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;