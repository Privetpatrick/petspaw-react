import React, { useState, useLayoutEffect, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ToolsBar from '../components/UI/ToolsBar';
import ButtonBack from '../components/UI/ButtonBack';
import { PageContext } from './PageContext';
import RequestTool from '../API/RequestTool';
import Loader from '../components/UI/Loader';

const OneBreed = (props) => {
    const { setActive } = useContext(PageContext)
    const { id } = useParams()
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [picPack, setPicPack] = useState([])
    const [img, setImg] = useState(null)
    const [count, setCount] = useState(1)

    useLayoutEffect(() => {
        setIsLoading(true)
        RequestTool.getRequest(id, 5).then(data => {
            setData(data[0].breeds[0])
            setIsLoading(false)
            const pics = data.map(elem => elem.url)
            setPicPack(pics)
            setImg(pics[0])
        })
    }, [])

    function nextHandler(count) {
        let num = count
        num++
        if (num < 6) {
            setImg(picPack[num - 1])
            setCount(num)
        } else {
            return
        }
    }

    function prevHandler(count) {
        let num = count
        num--
        if (num > 0) {
            setImg(picPack[num - 1])
            setCount(num)
        } else {
            return
        }
    }

    useEffect(() => setActive(''), [])

    return (
        <div className="one-breed-page">
            <ToolsBar />
            <div className="content">
                <div className="head">
                    <ButtonBack />
                    <h2><span>BREEDS</span></h2>
                    <div className="breed-id">{id}</div>
                    <div className="next-previous">
                        <button onClick={() => prevHandler(count)} className="previous"></button>
                        <span>{count}/5</span>
                        <button onClick={() => {
                            nextHandler(count)
                        }} className="next"></button>
                    </div>
                </div>
                <div className="img-breed">
                    {isLoading ? <Loader /> :
                        <img src={img} className="block selected"></img>
                    }
                </div>
                {data
                    ?
                    <div className="info-breed">
                        <div>{data.name}</div>
                        <div>Family companion cat</div>
                        <div className="wraped-content">
                            <div>
                                <b>Temperament: </b><br />
                                {data.temperament}
                            </div>
                            <div>
                                <b>Origin: </b>{data.origin}<br />
                                <b>Weight: </b>{data.weight.metric} kgs<br />
                                <b>Life span: </b>{data.life_span} years<br />
                            </div>
                        </div>
                    </div>
                    :
                    <></>
                }
            </div>
        </div>
    );
};

export default OneBreed;