import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSideBar from '../components/DashSideBar';
import DashProfile from '../components/DashProfile';

function DashBoard() {
  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab') || 'defaultTab'; // Use a default value if 'tab' is null
    setTab(tabFromUrl);
  }, [location.search]);

  console.log(tab);

  return (
<div className="min-h-screen flex flex-col md:flex-row p-3  md:gap-x-44 ">
  {/* Sidebar */}
  <div className="mb-8 md:mb-0 md:mr-28">
    <DashSideBar />
  </div>
  {/* Profile */}
  <div className="flex-1">
    {tab === "profile" && <DashProfile />}
  </div>
</div>
  );
}

export default DashBoard;
