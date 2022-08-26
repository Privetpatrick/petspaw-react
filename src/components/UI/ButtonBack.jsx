import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { PageContext } from '../../pages/PageContext';

const ButtonBack = () => {
    const {active, setActive} = useContext(PageContext)

    return (
        <Link to='/'>
            <button onClick={() => setActive('')} className="button back"></button>
        </Link>
    );
};

export default ButtonBack;