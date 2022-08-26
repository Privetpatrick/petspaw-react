import React, { useState, useLayoutEffect, useRef } from 'react';
import RequestTool from '../../API/RequestTool';
import Loader from './Loader';

const Modal = ({ modalActive, setModalActive }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [file, setFile] = useState('')
    const [fileName, setFileName] = useState('')
    const [fileUrl, setFileUrl] = useState('')
    const [done, setDone] = useState(false)
    const [reset, setReset] = useState(0)
    const [dragOver, setDragOver] = useState(false)
    const input = useRef()

    function loadPic(data) {
        setFileName(data.name)
        let reader = new FileReader();
        reader.onload = function (e) {
            setFileUrl(e.target.result)
        };
        reader.readAsDataURL(data)
    }

    function sendPicture(file) {
        setIsLoading(true)
        let fileType = file.name.split('.')[1];
        if (fileType === 'jpg' || fileType === 'png') {
            let formData = new FormData(document.forms.upload);
            RequestTool.uploadImage(formData, setDone, setIsLoading)
        }
    }

    if(done) {
        setTimeout(() => {
            setReset(reset + 1)
        }, 2000)
    }

    useLayoutEffect(() => {
        input.current.value = ''
        setFile('')
        setFileName('')
        setFileUrl('')
        setDone('')
    }, [reset])

    function dragStartHandler(e) {
        e.preventDefault()
        setDragOver(true)
    }
    function dragLeaveHandler(e) {
        e.preventDefault()
        setDragOver(false)
    }
    function dropHandler(e) {
        e.preventDefault()
        let file = e.dataTransfer.files[0]
        console.log(file);
        setFile(file)
        setFileName(file.name)
        let reader = new FileReader();
        reader.onload = function (e) {
            setFileUrl(e.target.result)
        };
        reader.readAsDataURL(file)
        setDragOver(false)
    }

    return (
        <>
            <div className="upload-page">
                {isLoading ? <Loader /> : <></>}
                <button onClick={() => setModalActive(false)} className="close"></button>
                <h2>Upload a .jpg or .png Cat Image</h2>
                <p>Any uploads must comply with the <a href="https://thecatapi.com/privacy" target="_blank">upload guidelines</a> or face deletion.</p>
                <div 
                onDragStart={e => dragStartHandler(e)}
                onDragLeave={e => dragLeaveHandler(e)}
                onDragOver={e => dragStartHandler(e)}
                onDrop={e => dropHandler(e)}
                className={!dragOver ? 'upload-container' : 'upload-container dragover'}>
                    {file ? <img className='upload-image' src={fileUrl} /> : <img className='upload-image none' />}
                    <div className="back-image"></div>
                    <div className="input">
                        <form name="upload">
                            <input ref={input} onChange={(e) => {
                                setFile(e.target.files[0])
                                loadPic(e.target.files[0])
                            }} id="file-input" type="file" name="file" />
                            {file ? <></> : <label for="file-input"><b>Drag here</b> your file or <b>Click here</b> to upload</label>}
                        </form>
                    </div>
                </div>
                {file ? <div className="file-selected">Image File Name: {fileName}</div> : <></>}
                {file && !done ? <button onClick={() => sendPicture(file)} className="upload-photo">UPLOAD PHOTO</button> : <></>}
                {file ? <></> : <div className="file-selected">No file selected</div>}
                {done === 'ok'
                    ?
                    <div className="done"><div></div>Thanks for the Upload - Cat found!</div>
                    :
                    <></>
                }
                {done === 'error'
                    ?
                    <div className="error"><div></div>No Cat found - try a different one</div>
                    :
                    <></>
                }
            </div>
            <div className="grey-wraper" onClick={() => setModalActive(false)}></div>
        </>
    );
};

export default Modal;