import React from 'react';
import backImg from '../img/background.png'

const MainPage = () => {

    return (
        <div className='main block'>
            <div className="main-rect">
                <img className="bacground-img" src={backImg} />
            </div>
        </div>
    );
};

export default MainPage;