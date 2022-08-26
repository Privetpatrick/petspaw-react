import React, { useState, useEffect, useContext, useLayoutEffect } from 'react';
import ToolsBar from '../components/UI/ToolsBar'
import ButtonBack from '../components/UI/ButtonBack';
import { PageContext } from './PageContext';
import Grid from '../components/Grid/Grid';
import ToolsLogs from '../components/UI/ToolsLogs';

const ToolsPage = (props) => {
    const { active, setActive, tollsPageSettings, settollsPageSettings } = useContext(PageContext)

    return (
        <div className={props.name + '-page'}>
            <ToolsBar />
            <div className="content">
                <div className="head">
                    <ButtonBack />
                    <h2><span>{props.name}</span></h2>
                </div>
                <Grid pageName={props.name} pageSettings={tollsPageSettings} setPageSettings={settollsPageSettings} />
                {tollsPageSettings.logs.length > 0 ? <ToolsLogs logs={tollsPageSettings.logs} /> : <></>}
            </div>
        </div>
    );
};

export default ToolsPage;