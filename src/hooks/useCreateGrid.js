import React, { useState, useEffect, useContext } from 'react';
import { PageContext } from '../pages/PageContext';
import HoverButton from '../components/Grid/HoverButton';
import { useSelectPageSettings } from './useSelectPageSettings';

export const useCreateGrid = (name) => {
    const [pageName, setPageName] = useState('')
    const [data, setData] = useState(null)
    const [grid, setGrid] = useState(null)
    const { active } = useContext(PageContext)

    useEffect(() => {
        if(name) {
            setPageName(name)
        } else {
            setPageName(active)
        }
    }, [])

    const pageSettings = useSelectPageSettings(pageName)

    function sliceData(data, chunkSize) {
        const result = [];
        for (let i = 0; i < data.length; i += chunkSize) {
            const chunk = data.slice(i, i + chunkSize);
            result.push(chunk);
        }
        return result;
    }

    function creatGrid(data) {
        if (data) {
            const dataChunks = sliceData(data, 10);
            setGrid(dataChunks.map(dataChunk =>
                <div key={dataChunk[0].id} className="grid-wraper">
                    <div className='grid'>
                        {dataChunk.map(elem =>
                            <div key={elem.id}>
                                <img className={elem.breeds.length > 0 ? elem.breeds[0].id : 'Unknown'} src={elem.url} />
                                <HoverButton data={elem} pageName={pageName}/>
                            </div>
                        )}
                    </div>
                </div>
            ))
        } else {
            return
        }
    }

    useEffect(() => {
        creatGrid(data)
    }, [data])

    return { grid, setData }
};