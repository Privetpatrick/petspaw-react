import React, { useState } from 'react';
import logo from '../img/logo.svg';
import MenuButton from './MenuButton';

const Menu = () => {

    return (
        <nav>
            <img src={logo} />
            <h2>Hi intern!</h2>
            <p>Welcome to MI 2022 Front-end test</p>
            <p>Lets start using The Cat API</p>
            <div className='menu'>
                <MenuButton name='voting' />
                <MenuButton name='breeds' />
                <MenuButton name='gallery' />
            </div>
        </nav>
    );
};

export default Menu;