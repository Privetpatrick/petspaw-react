import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PageContext } from '../../pages/PageContext';

const Button = (props) => {
    const { active, setActive } = useContext(PageContext)

    if (props.name === active) {
        return (
            <button className={props.name + ' active-' + props.name}></button>
        );
    } else {
        return (
            <Link to={'/' + props.name}><button onClick={() => setActive(props.name)} className={'button ' + props.name}></button></Link>
        );
    }
};

export default Button;