import React, { useState, useEffect, useContext, useLayoutEffect } from 'react';
import { PageContext } from '../pages/PageContext';

export const useSelectPageSettings = (name) => {
    const { breedsPageSettings, galleryPageSettings } = useContext(PageContext)
    const [result, setResult] = useState({})

    useLayoutEffect(() => {
        if (name === 'breeds') {
            setResult(breedsPageSettings);
        }
        if (name === 'gallery') {
            setResult(galleryPageSettings);
        }
    }, [name, breedsPageSettings, galleryPageSettings])
    
    return result

};