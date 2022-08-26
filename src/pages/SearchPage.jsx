import React, { useState, useLayoutEffect, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ToolsBar from '../components/UI/ToolsBar';
import ButtonBack from '../components/UI/ButtonBack';
import Grid from '../components/Grid/Grid';

const SearchPage = (props) => {
    const { search } = useParams()
    const [pageSettings, setPageSettings] = useState({
        grid: null,
        limit: '10',
        sort: 'Random',
        idBreedSelected: search,
    })

    useLayoutEffect(() => {
        setPageSettings({
            grid: null,
            limit: '10',
            sort: 'Random',
            idBreedSelected: search,
        })
    }, [search])

    return (
        <div className="search-page">
            <ToolsBar />
            <div className="content">
                <div className="loader none"></div>
                <div className="head">
                    <ButtonBack />
                    <h2><span>SEARCH</span></h2>
                </div>
                <div className="search-results">Search results for: <b>{search}</b></div>
                <Grid pageName='search' pageSettings={pageSettings} setPageSettings={setPageSettings} />
            </div>
        </div>
    );
};

export default SearchPage;