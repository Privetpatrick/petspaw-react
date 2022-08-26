import React, { useContext } from 'react';
import classes from './MenuButton.module.css'
import { PageContext } from '../pages/PageContext';
import { Link } from 'react-router-dom';

const MenuButton = (props) => {
    const img = require(`../img/${props.name}-logo.png`);

    const {active, setActive} = useContext(PageContext)

    if (props.name === active) {
        return (
            <div className={'nav ' + props.name + '-nav active-nav'}>
                <div><img src={img} /></div>
                <div className='names active-names'>{props.name}</div>
            </div>
        );
    } else {
        return (
            <Link to={'/' + props.name}>
                <div onClick={() => setActive(props.name)} className={'nav ' + props.name + '-nav' + ' ' + classes.navHover}>
                    <div><img src={img} /></div>
                    <div className='names'>{props.name}</div>
                </div>
            </Link>
        );
    }
};

export default MenuButton;