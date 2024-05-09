import React from "react";
import Counters from "./counters";
import './css/admin.css';
import Itmestable from "./itmestable";
import Sidenav from "./sidenav";
function AdminPage() {
    return (
        <>
            <div className="vh-100 adminbg position-relative">
                <div className="container-fluid position-absolute z-1 py-5">
                    <div className="my-2 d-flex">
                        <div className="my-2">  <Sidenav /> </div>
                        <p className="text-warning p-2 h2">DashBoard</p>
                    </div>
                    <Counters />
                    <div className="my-4">
                        <Itmestable />
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminPage;