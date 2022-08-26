import React, { useState, useEffect, useContext } from 'react';
import ToolsBar from '../components/UI/ToolsBar'
import ButtonBack from '../components/UI/ButtonBack';
import { PageContext } from './PageContext';
import SelectFilter from '../components/UI/SelectFilter';
import AscDescFilter from '../components/UI/AscDescFilter';
import Grid from '../components/Grid/Grid';

const BreedsPage = () => {
    const { setActive, breedsPageSettings, setbreedsPageSettings } = useContext(PageContext)

    useEffect(() => {
        setActive('breeds')
    }, [])

    function changeId(id) {
        if (id === 'All breeds') {
            setbreedsPageSettings({ ...breedsPageSettings, idBreedSelected: '', grid: null })
        } else {
            setbreedsPageSettings({ ...breedsPageSettings, idBreedSelected: id, grid: null })
        }
    }
    function changeSort(sortName) {
        setbreedsPageSettings({ ...breedsPageSettings, sort: sortName, grid: null })
    }

    return (
        <div className="breeds-page">
            <ToolsBar />
            <div className="content">
                <div className="head">
                    <ButtonBack />
                    <h2><span>BREEDS</span></h2>
                    <SelectFilter changeId={changeId} />
                    <select className="limit" defaultValue={"Limit: " + breedsPageSettings.limit} onChange={(e) => setbreedsPageSettings({ ...breedsPageSettings, limit: e.target.value.split(' ')[1], grid: null })}>
                        <option>Limit: 5</option>
                        <option>Limit: 10</option>
                        <option>Limit: 20</option>
                        <option>Limit: 25</option>
                    </select>
                    <AscDescFilter sort={breedsPageSettings.sort} changeSort={changeSort} />
                </div>
                <Grid pageName='breeds' pageSettings={breedsPageSettings} setPageSettings={setbreedsPageSettings} />
            </div>
        </div>
    );

};

export default BreedsPage;