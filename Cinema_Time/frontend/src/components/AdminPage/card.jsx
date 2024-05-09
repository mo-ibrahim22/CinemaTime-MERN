import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Cards(props) {
    return (
        <>
            <div className="container p-2 text-light">
                <div className="border border-3 rounded-4 p-2 d-flex justify-content-evenly">
                    <i className="h1"><FontAwesomeIcon icon={props.icon} /></i>
                    <div>
                        <p className="h5">{props.name}</p>
                        <p className="badge bg-warning">{props.count}</p>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Cards;