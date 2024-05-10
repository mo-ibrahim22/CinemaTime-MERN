import React from "react";
import Counters from "./counters";
import './css/admin.css';
import Sidenav from "./sidenav";
import { Outlet } from "react-router-dom";
function AdminPage() {
    return (
        <>
            <div className="vh-100 adminbg">
                <div className="vh-100 overflow-auto bluradmin-bg">
                    <div className="my-5 px-4 d-flex position-fixed">
                        <div className="my-2">  <Sidenav /> </div>
                        <p className="text-warning p-2 my-2 h2">DashBoard</p>
                    </div>

                    <div className="container-fluid py-4 mt-5">
                        <Counters />
                    </div>

                    <div className="container-fluid">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminPage;