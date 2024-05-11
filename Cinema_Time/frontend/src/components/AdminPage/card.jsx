import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Cards(props) {
    const [currentCount, setCurrentCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (currentCount < props.count) {
                setCurrentCount(prevCount => prevCount + 1);
            } else {
                clearInterval(interval);
            }
        }, 100);
        return () => clearInterval(interval);
    }, [currentCount, props.count]);

    return (
        <>
            <div className="container p-2 text-light">
                <div className="border border-3 rounded-4 p-2 d-flex justify-content-evenly">
                    <i className="h1"><FontAwesomeIcon icon={props.icon} /></i>
                    <div>
                        <p className="h5">{props.name}</p>
                        <p className="badge bg-warning">{currentCount}</p>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Cards;
