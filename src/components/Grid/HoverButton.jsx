import React, { useContext, useState } from 'react';
import RequestTool from '../../API/RequestTool';
import { PageContext } from '../../pages/PageContext';
import { Routes, Route, Link } from 'react-router-dom';

function oneBreedHandler(id) {
    console.log(id);
    <Link to={`/breed/${id}`}></Link>
}

function createTime(date) {
    let hours = date.getHours();
    hours = String(hours)
    hours.length === 1 ? hours = `0${hours}` : hours = hours;
    let minutes = date.getMinutes();
    minutes = String(minutes)
    minutes.length === 1 ? minutes = `0${minutes}` : minutes = minutes;
    return `${hours}:${minutes}`;
}

const HoverButton = ({ data, pageName }) => {
    const [id, setId] = useState('')
    const { tollsPageSettings, settollsPageSettings } = useContext(PageContext)
    const [isLoading, setIsLoading] = useState(false)

    if (pageName === 'breeds') {
        return (
            <>
                <Link className='button-hover' to={`/breed/${data.breeds[0].id}`}>{data.breeds.length > 0 ? data.breeds[0].name : 'Unknown'}</Link>
            </>
        )
    } else if (pageName === 'gallery') {
        if (tollsPageSettings.favouritesList[data.id]) {
            return isLoading ? <></> : <button disabled={isLoading} onClick={(e) => {
                setIsLoading(true)
                const imgId = e.target.previousElementSibling.className
                const favId = tollsPageSettings.favouritesList[imgId]
                RequestTool.deleteLikeFavouritesDislike(favId, 'favourites').then(() => setIsLoading(false))
                let updateFavList = tollsPageSettings.favouritesList
                delete updateFavList[imgId]
                settollsPageSettings({ ...tollsPageSettings, favouritesList: updateFavList, favouritesGrid: null })
            }} className='button-hover-del'></button>
        } else {
            return isLoading ? <></> : <button disabled={isLoading} onClick={(e) => {
                setIsLoading(true)
                const imgId = e.target.previousElementSibling.className
                RequestTool.postFavourite(imgId).then(() => {
                    let favouritesList = {};
                    RequestTool.getFavourites().then(data => {
                        data.forEach(elem => favouritesList[elem.image_id] = elem.id)
                    }).then(() => {
                        settollsPageSettings({ ...tollsPageSettings, favouritesList: favouritesList, favouritesGrid: null })
                        setIsLoading(false)
                    })
                })
                let updateFavList = tollsPageSettings.favouritesList
                updateFavList[imgId] = imgId
                settollsPageSettings({ ...tollsPageSettings, favouritesList: updateFavList })
            }} className='button-hover'></button>
        }
    } else {
        return <button onClick={(e) => {
            const id = e.target.previousElementSibling.className;
            const div = e.target.parentElement;
            const imgId = e.target.previousElementSibling.src.split('/')[4].split('.')[0]
            div.remove();
            RequestTool.deleteLikeFavouritesDislike(id, pageName);
            const log = {
                type: pageName,
                imgId: imgId,
                date: createTime(new Date)
            }
            const logs = tollsPageSettings.logs
            logs.splice(0, 0, log)
            settollsPageSettings({ ...tollsPageSettings, logs: logs })
            if (pageName === 'likes') {
                settollsPageSettings({ ...tollsPageSettings, likesGrid: null })
            }
            if (pageName === 'favourites') {
                let updateFavList = tollsPageSettings.favouritesList
                if (updateFavList[imgId]) {
                    delete updateFavList[imgId]
                    settollsPageSettings({ ...tollsPageSettings, favouritesList: updateFavList, favouritesGrid: null })
                } else {
                    settollsPageSettings({ ...tollsPageSettings, favouritesGrid: null })
                }
            }
            if (pageName === 'dislikes') {
                settollsPageSettings({ ...tollsPageSettings, dislikesGrid: null })
            }
        }
        } className='button-hover'></button>
    }
};

export default HoverButton;