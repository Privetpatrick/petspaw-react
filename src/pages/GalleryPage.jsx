import React, { useState, useEffect, useContext } from 'react';
import ToolsBar from '../components/UI/ToolsBar'
import ButtonBack from '../components/UI/ButtonBack';
import SelectFilter from '../components/UI/SelectFilter';
import { PageContext } from './PageContext';
import Grid from '../components/Grid/Grid';
import Modal from '../components/UI/Modal';

const GalleryPage = (props) => {
    const { setActive, galleryPageSettings, setgalleryPageSettings } = useContext(PageContext)
    const [settings, setSettings] = useState({ ...galleryPageSettings })
    const [modalActive, setModalActive] = useState(false)

    useEffect(() => {
        setActive('gallery')
    }, [])

    function changeId(id) {
        if (id === 'All breeds') {
            setSettings({ ...settings, idBreedSelected: '' })
        } else {
            setSettings({ ...settings, idBreedSelected: id })
        }
    }

    return (
        <>
            <div className="gallery-page">
                <ToolsBar />
                <div className="content">
                    <div className="loader none"></div>
                    <div className="head">
                        <ButtonBack />
                        <h2><span>GALLERY</span></h2>
                        <button onClick={() => setModalActive(true)} className="button upload">UPLOAD</button>
                    </div>
                    <div className="sort-panel">
                        <div className="order">
                            <div>ORDER</div>
                            <select onChange={(e) => setSettings({ ...settings, sort: e.target.value })}>
                                <option>Random</option>
                                <option>Desc</option>
                                <option>Asc</option>
                            </select>
                        </div>
                        <div className="type">
                            <div>TYPE</div>
                            <select onChange={(e) => setSettings({ ...settings, type: e.target.value })}>
                                <option>All</option>
                                <option>Static</option>
                                <option>Animated</option>
                            </select>
                        </div>
                        <div className="breed">
                            <div>BREED</div>
                            <SelectFilter changeId={changeId} />
                        </div>
                        <div className="limit">
                            <div>LIMIT</div>
                            <select defaultValue={galleryPageSettings.limit + ' items per page'} onChange={(e) => setSettings({ ...settings, limit: e.target.value.split(' ')[0] })}>
                                <option>5 items per page</option>
                                <option>10 items per page</option>
                                <option>15 items per page</option>
                                <option>20 items per page</option>
                                <option>25 items per page</option>
                            </select>
                            <button onClick={() => setgalleryPageSettings({ ...settings, grid: null })} className="update"></button>
                        </div>
                    </div>
                    <Grid pageName='gallery' pageSettings={galleryPageSettings} setPageSettings={setgalleryPageSettings} />
                </div>
            </div>
            {modalActive ? <Modal modalActive={modalActive} setModalActive={setModalActive} /> : <></>}
        </>
    );
};

export default GalleryPage;