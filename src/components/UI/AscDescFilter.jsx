import React from 'react';

const AscDescFilter = ({ sort, changeSort }) => {
    if(sort === 'Random') {
        return (
            <>
                <button onClick={() => changeSort('Asc')} className="Asc sort1"></button>
                <button onClick={() => changeSort('Desc')} className="Desc sort2"></button>
            </>
        );
    }
    if(sort === 'Asc') {
        return (
            <>
                <button onClick={() => changeSort('Random')} className="Asc sort1 sort1-active"></button>
                <button onClick={() => changeSort('Desc')} className="Desc sort2"></button>
            </>
        );
    }
    if(sort === 'Desc') {
        return (
            <>
                <button onClick={() => changeSort('Asc')} className="Asc sort1"></button>
                <button onClick={() => changeSort('Random')} className="Desc sort2 sort2-active"></button>
            </>
        );
    }
};

export default AscDescFilter;