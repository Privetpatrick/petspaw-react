import React from 'react';

const ToolsLogs = (props) => {

    return (
        <div className='log-list'>
            {props.logs.map(elem =>
                <div key={elem.imgId} className="log">
                    <div>{elem.date}</div>
                    <div>Image ID: <b>{elem.imgId}</b> was removed from {elem.type}</div>
                    <div className={`log-logo-${elem.type}`}></div>
                </div>
            )}
        </div>
    );
};

export default ToolsLogs;