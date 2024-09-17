import { Outlet } from 'react-router-dom';
import Header from './Components/Body/Header';

function Layout ()
{
  return (
    <>

      <Header />

      <div>
        <Outlet />
      </div>

    </>
  );
}

export default Layout;
