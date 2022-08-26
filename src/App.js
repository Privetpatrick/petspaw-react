import React, { useState, useEffect, useContext, useLayoutEffect } from 'react';
import './styles/App.css';
import Menu from './components/Menu';
import MainPage from './pages/MainPage';
import VotingPage from './pages/VotingPage';
import BreedsPage from './pages/BreedsPage';
import GalleryPage from './pages/GalleryPage';
import ToolsPage from './pages/ToolsPage';
import { PageContext } from './pages/PageContext'
import { Routes, Route } from 'react-router-dom';
import RequestTool from './API/RequestTool';
import OneBreed from './pages/OneBreed';
import SearchPage from './pages/SearchPage';

function App() {
  const [active, setActive] = useState('');
  const [allBreeds, setAllBreeds] = useState(null);
  const [breedsPageSettings, setbreedsPageSettings] = useState({
    grid: null,
    limit: '10',
    sort: 'Random',
    idBreedSelected: '',
  });
  const [galleryPageSettings, setgalleryPageSettings] = useState({
    grid: null,
    limit: '10',
    sort: 'Random',
    type: 'All',
    idBreedSelected: '',
  });
  const [tollsPageSettings, settollsPageSettings] = useState({
    likesGrid: null,
    favouritesGrid: null,
    dislikesGrid: null,
    logs: [],
    favouritesList: {}
  })
  const [votingPageSettings, setvotingPageSettings] = useState({
    imgUrl: '',
    imgId: '',
    oldUrl: '',
    logs: [],
  })

  useLayoutEffect(() => {
    let favouritesList = {};
    RequestTool.getFavourites().then(data => {
      data.forEach(elem => favouritesList[elem.image_id] = elem.id)
    }).then(() => settollsPageSettings({ ...tollsPageSettings, favouritesList: favouritesList }))
  }, [])

  useLayoutEffect(() => {
    settollsPageSettings({ ...tollsPageSettings, logs: [] })
  }, [active])

  useLayoutEffect(() => {
    if (!allBreeds) {
      RequestTool.getAllBreeds().then(data => setAllBreeds(data))
    }
  }, [])

  return (
    <PageContext.Provider value={{ active, setActive, allBreeds, setAllBreeds, breedsPageSettings, setbreedsPageSettings, galleryPageSettings, setgalleryPageSettings, tollsPageSettings, settollsPageSettings, votingPageSettings, setvotingPageSettings }}>
      <div className='container'>
        <Menu />
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/voting' element={<VotingPage />} />
          <Route path='/breeds' element={<BreedsPage />} />
          <Route path='/gallery' element={<GalleryPage />} />
          <Route path='/likes' element={<ToolsPage name='likes' />} />
          <Route path='/favourites' element={<ToolsPage name='favourites' />} />
          <Route path='/dislikes' element={<ToolsPage name='dislikes' />} />
          <Route path='/breed/:id' element={<OneBreed name='onebreed' />} />
          <Route path='/search/:search' element={<SearchPage name='search' />} />
        </Routes>
      </div>
    </PageContext.Provider>
  );
}

export default App;
