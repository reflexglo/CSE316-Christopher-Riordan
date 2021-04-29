import React                            from 'react';

const LandmarkEntry = (props) => {
    return(
        <div className="landmark-entry">
            {props.landmark}
        </div>
    );
}

export default LandmarkEntry;