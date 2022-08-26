import React, { useState, useContext, useEffect, useLayoutEffect } from 'react';
import testImg from '../img/test-cat.png'
import ToolsBar from '../components/UI/ToolsBar'
import ButtonBack from '../components/UI/ButtonBack';
import ButtonVoting from '../components/UI/ButtonVoting';
import { PageContext } from './PageContext';
import RequestTool from '../API/RequestTool';
import Loader from '../components/UI/Loader';
import VotingLogs from '../components/UI/VotingLogs';

const VotingPage = (props) => {
    const { active, setActive, votingPageSettings, setvotingPageSettings } = useContext(PageContext)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => setActive('voting'), [])

    useLayoutEffect(() => {
        if (!votingPageSettings.imgId) {
            RequestTool.getRequest('', 1, 'Random').then(data => {
                let img = data[0]
                setvotingPageSettings({ ...votingPageSettings, imgUrl: img.url, imgId: img.id, oldUrl: img.url })
            })
        }
    }, [])

    useLayoutEffect(() => {
        setvotingPageSettings({ ...votingPageSettings, logs: [] })
    }, [active])

    return (
        <div className="voting-page">
            <ToolsBar />
            <div className="content">
                <div className="head">
                    <ButtonBack />
                    <h2><span>VOTING</span></h2>
                </div>
                <div className="img-voting">
                    {votingPageSettings.imgUrl ? <></> : <Loader />}
                    <img src={votingPageSettings.imgUrl ? votingPageSettings.imgUrl : votingPageSettings.oldUrl} />
                    {isLoading
                        ?
                        <div className="voting-tools">
                            <button className='add-like'></button>
                            <button className='add-favourite'></button>
                            <button className='add-dislike'></button>
                        </div>
                        :
                        <div className="voting-tools">
                            <ButtonVoting name='like' setIsLoading={setIsLoading} />
                            <ButtonVoting name='favourite' setIsLoading={setIsLoading} />
                            <ButtonVoting name='dislike' setIsLoading={setIsLoading} />
                        </div>}
                </div>
                {votingPageSettings.logs.length > 0 ? <VotingLogs logs={votingPageSettings.logs} /> : <></>}
            </div>
        </div>
    );
};

export default VotingPage;