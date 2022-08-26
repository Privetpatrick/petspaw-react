import React from 'react';

const VotingLogs = (props) => {

    return (
        <div className='log-list'>
            {props.logs.map(elem =>
                <div key={elem.imgId} className="log">
                    <div>{elem.date}</div>
                    <div>Image ID: <b>{elem.imgId}</b> was added to {elem.type}s</div>
                    <div className={`log-logo-${elem.type}`}></div>
                </div>
            )}
        </div>
    );
};

export default VotingLogs;