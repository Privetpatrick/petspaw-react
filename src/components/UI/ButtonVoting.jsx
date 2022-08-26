import React, { useState, useContext } from 'react';
import RequestTool from '../../API/RequestTool';
import { PageContext } from '../../pages/PageContext';

function createTime(date) {
    let hours = date.getHours();
    hours = String(hours)
    hours.length === 1 ? hours = `0${hours}` : hours = hours;
    let minutes = date.getMinutes();
    minutes = String(minutes)
    minutes.length === 1 ? minutes = `0${minutes}` : minutes = minutes;
    return `${hours}:${minutes}`;
}

async function postVote(type, id, votingPageSettings, setvotingPageSettings, setIsLoading, tollsPageSettings, settollsPageSettings) {
    if (type === 'favourite') {
        RequestTool.postFavourite(id).then(() => {
            settollsPageSettings({...tollsPageSettings, favouritesGrid: null})
            const log = {
                type: 'favourite',
                imgId: votingPageSettings.imgId,
                date: createTime(new Date)
            }
            votingPageSettings.logs.splice(0, 0, log)
            let updateFavList = tollsPageSettings.favouritesList
            updateFavList[id] = id
        }).then(() => {
            RequestTool.getRequest('', 1, 'Random').then(data => {
                let img = data[0]
                setvotingPageSettings({ ...votingPageSettings, imgUrl: img.url, imgId: img.id, oldUrl: img.url })
                setIsLoading(false)
            })
        })
        setvotingPageSettings({ ...votingPageSettings, imgUrl: '' })
    }
    if (type === 'like') {
        RequestTool.postLikeOrNot(id, 'like').then(() => {
            settollsPageSettings({...tollsPageSettings, likesGrid: null})
            const log = {
                type: 'like',
                imgId: votingPageSettings.imgId,
                date: createTime(new Date)
            }
            votingPageSettings.logs.splice(0, 0, log)
        }).then(() => {
            RequestTool.getRequest('', 1, 'Random').then(data => {
                let img = data[0]
                setvotingPageSettings({ ...votingPageSettings, imgUrl: img.url, imgId: img.id, oldUrl: img.url })
                setIsLoading(false)
            })
        })
        setvotingPageSettings({ ...votingPageSettings, imgUrl: '' })
    }
    if (type === 'dislike') {
        RequestTool.postLikeOrNot(id, 'dislike').then(() => {
            settollsPageSettings({...tollsPageSettings, dislikesGrid: null})
            const log = {
                type: 'dislike',
                imgId: votingPageSettings.imgId,
                date: createTime(new Date)
            }
            votingPageSettings.logs.splice(0, 0, log)
        }).then(() => {
            RequestTool.getRequest('', 1, 'Random').then(data => {
                let img = data[0]
                setvotingPageSettings({ ...votingPageSettings, imgUrl: img.url, imgId: img.id, oldUrl: img.url })
                setIsLoading(false)
            })
        })
        setvotingPageSettings({ ...votingPageSettings, imgUrl: '' })
    }
}

const ButtonVoting = (props) => {
    const { votingPageSettings, setvotingPageSettings, tollsPageSettings, settollsPageSettings } = useContext(PageContext)

    return (
        <button onClick={() => {
            props.setIsLoading(true)
            postVote(props.name, votingPageSettings.imgId, votingPageSettings, setvotingPageSettings, props.setIsLoading, tollsPageSettings, settollsPageSettings)
        }} className={'add-' + props.name}></button>
    );
};

export default ButtonVoting;