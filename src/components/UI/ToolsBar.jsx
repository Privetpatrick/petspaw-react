import React, {useState, useRef, useEffect} from 'react';
import Button from './Button';
import RequestTool from '../../API/RequestTool';
import { Routes, Route, Link } from 'react-router-dom';

const ToolsBar = () => {
    const [inputValue, setInputValue ] = useState('')
    let ref = useRef()

    function inputHandler(e) {
        setInputValue(e.target.value)
    }

    useEffect(() => {
        ref.current.addEventListener('search', (e) => inputHandler(e))
        return (
            ref.current.removeEventListener('search', inputHandler)
        )
    }, [])

    return (
        <div className='tools'>
            <div className='searchbar'>
                <input ref={ref} onChange={(e) => setInputValue(e.target.value)} value={inputValue} type="search" placeholder="Search for breeds by name" />
                {inputValue ? <Link to={`/search/${inputValue}`} className="button search"/> : <button className="button search"/> }
            </div>
            <div className="buttons">
                <Button name='likes' />
                <Button name='favourites' />
                <Button name='dislikes' />
            </div>
        </div>
    );
};

export default ToolsBar;