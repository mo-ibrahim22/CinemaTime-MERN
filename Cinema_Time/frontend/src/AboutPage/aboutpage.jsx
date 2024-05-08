import React from "react";
import './css/about.css';
import WhatWeDo from './WhatWeDo';
import OurServices from './OurServices';
import OurPartners from './OurPartners';
import MeetTheTeam from './MeetTheTeam';
function Aboutpage() {
    return (
        <>
            <div className="vh-100 aboutbg text-light position-relative">

                <div className="dvh-100 aboutsection position-absolute top-50 start-0 end-0">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12 col-md-6 text-center py-5">
                                <h1 className="h1 text-warning">About Us</h1>
                            </div>
                            <div className="col-sm-12 col-md-6 d-flex flex-column justify-content-between py-4">
                                <WhatWeDo />
                                <OurServices />
                                <OurPartners />
                                <MeetTheTeam />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
export default Aboutpage;