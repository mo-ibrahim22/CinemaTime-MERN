import React from "react";
import Counters from "./counters";
import './css/admin.css';
import Sidenav from "./sidenav";
import { Outlet } from "react-router-dom";
function AdminPage() {
    return (
        <>
            <div className="adminbg position-relative">
                <div className="container-fluid position-absolute z-1 py-5">
                    <div className="my-2 d-flex">
                        <div className="my-2">  <Sidenav /> </div>
                        <p className="text-warning p-2 h2">DashBoard</p>
                    </div>
                    <Counters />
                    <div className="container-fluid position-fixed z-1 start-0 end-0 ">
                        <div className="container-fluid">
                            <Outlet />
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default AdminPage;