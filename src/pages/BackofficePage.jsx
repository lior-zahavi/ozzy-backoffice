import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import './organizations.css';

function BackofficePage() {
  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-area">
        <Header />
        <Outlet />
      </main>
    </div>
  )
}

export default BackofficePage;