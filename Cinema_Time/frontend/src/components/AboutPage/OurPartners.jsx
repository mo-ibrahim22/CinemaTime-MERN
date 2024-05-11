import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImdb, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faPlay, faGhost } from '@fortawesome/free-solid-svg-icons';

const OurPartners = () => {
    return (
        <div>
            <h3 className="h3 text-warning">Our Partners</h3>
            <ul className="text-light">
                <li> <FontAwesomeIcon icon={faYoutube} /> Youtube</li>
                <li> <FontAwesomeIcon icon={faImdb} /> IMDb</li>
                <li> <FontAwesomeIcon icon={faPlay} /> JustWatch</li>
                <li> <FontAwesomeIcon icon={faGhost} /> WitAnime</li>
            </ul>
        </div>
    );
};

export default OurPartners;
