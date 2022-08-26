import React, { useState, useEffect, useContext, useLayoutEffect } from 'react';
import HoverButton from './HoverButton';
import Loader from '../UI/Loader';
import RequestTool from '../../API/RequestTool';
import { PageContext } from '../../pages/PageContext';

const Grid = ({ pageName, pageSettings, setPageSettings }) => {
    const [grid, setGrid] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const { tollsPageSettings, settollsPageSettings } = useContext(PageContext)

    // Logik for main pages

    useLayoutEffect(() => {
        if (pageName === 'breeds' || pageName === 'gallery') {
            if (!pageSettings.grid) {
                setIsLoading(true)
                RequestTool.getRequest(pageSettings.idBreedSelected, pageSettings.limit, pageSettings.sort).then(data => {
                    const grid = creatGrid(data, pageName)
                    setGrid(grid)
                    setIsLoading(false)
                    setPageSettings({ ...pageSettings, grid: grid })
                })
            } else {
                setGrid(pageSettings.grid)
            }
        }
        if (pageName === 'search') {
            setIsLoading(true)
            RequestTool.getSearchRequest(pageSettings.idBreedSelected).then(data => {
                if (data.length > 0) {
                    let idBreed = data[0].id;
                    RequestTool.getRequest(idBreed, 10)
                        .then(data => {
                            const grid = creatGrid(data, pageName)
                            setGrid(grid)
                            setIsLoading(false)
                        });
                } else {
                    let res = <div className="search-results">No item found</div>
                    setGrid(res)
                    setIsLoading(false)
                }
            })
        }
    }, [pageSettings.idBreedSelected, pageSettings.limit, pageSettings.sort])

    // Logik for likes Favourites Dislikes

    useLayoutEffect(() => {
        if (pageName === 'likes') {
            if (!pageSettings.likesGrid) {
                setIsLoading(true)
                RequestTool.getLikesDislikes().then(data => {
                    let { likesGrid } = creatGridLikesDislikes(data)
                    setGrid(likesGrid)
                    setIsLoading(false)
                    setPageSettings({ ...pageSettings, likesGrid: likesGrid })
                })
            } else {
                setGrid(pageSettings.likesGrid)
            }
        }
        if (pageName === 'dislikes') {
            if (!pageSettings.dislikesGrid) {
                setIsLoading(true)
                RequestTool.getLikesDislikes().then(data => {
                    let { dislikesGrid } = creatGridLikesDislikes(data)
                    setGrid(dislikesGrid)
                    setIsLoading(false)
                    setPageSettings({ ...pageSettings, dislikesGrid: dislikesGrid })
                })
            } else {
                setGrid(pageSettings.dislikesGrid)
            }
        }
        if (pageName === 'favourites') {
            if (!pageSettings.favouritesGrid) {
                setIsLoading(true)
                RequestTool.getFavourites().then(data => {
                    const grid = creatGridforToolsPage(data)
                    setGrid(grid)
                    setIsLoading(false)
                    setPageSettings({ ...pageSettings, favouritesGrid: grid })
                })
            } else {
                setGrid(pageSettings.favouritesGrid)
            }
        }
    }, [pageName])

    function sliceData(data, chunkSize) {
        const result = [];
        for (let i = 0; i < data.length; i += chunkSize) {
            const chunk = data.slice(i, i + chunkSize);
            result.push(chunk);
        }
        return result;
    }

    function creatGrid(data, pageName) {
        if (data) {
            const dataChunks = sliceData(data, 10);
            return (dataChunks.map(dataChunk =>
                <div key={dataChunk[0].id} className="grid-wraper">
                    <div className='grid'>
                        {dataChunk.map(elem =>
                            <div key={elem.id}>
                                <img className={pageName === 'breeds' ? elem.breeds.length > 0 ? elem.breeds[0].id : 'Unknown' : elem.id} src={elem.url} />
                                <HoverButton data={elem} pageName={pageName} />
                            </div>
                        )}
                    </div>
                </div>
            ))
        } else {
            return <div className="not-found">You have no {pageName} yet.</div>
        }
    }

    function creatGridforToolsPage(data) {
        if (data) {
            const dataChunks = sliceData(data, 10);
            return dataChunks.map(dataChunk =>
                <div key={dataChunk[0].id} className="grid-wraper">
                    <div className='grid'>
                        {dataChunk.map(elem =>
                            <div key={elem.id}>
                                <img className={elem.id} src={pageName === 'favourites' ? elem.image.url : 'https://cdn2.thecatapi.com/images/' + elem.image_id + '.jpg'} />
                                <HoverButton pageName={pageName} />
                            </div>
                        )}
                    </div>
                </div>
            )
        } else {
            return <div className="not-found">You have no {pageName} yet.</div>
        }

    }

    function creatGridLikesDislikes(data) {
        let likesGrid = null;
        let dislikesGrid = null;
        if (data.likes.length > 0) {
            const likes = data.likes
            likesGrid = creatGridforToolsPage(likes)
        }
        if (data.dislikes.length > 0) {
            const dislikes = data.dislikes
            dislikesGrid = creatGridforToolsPage(dislikes)
        }
        return { likesGrid, dislikesGrid }
    }

    if (grid && isLoading) {
        return (
            <Loader />
        )
    }
    if (grid) {
        return (
            grid
        )
    }
    if (!grid && isLoading) {
        return (
            <Loader />
        )
    }
};

export default Grid;