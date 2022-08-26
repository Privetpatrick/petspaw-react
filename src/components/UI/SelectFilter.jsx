import React, { useState, useContext, useEffect } from 'react';
import { PageContext } from '../../pages/PageContext';
import RequestTool from '../../API/RequestTool';

const SelectFilter = ({ changeId }) => {
    const { active, allBreeds, setAllBreeds, breedsPageSettings, galleryPageSettings } = useContext(PageContext)
    const [value, setValue] = useState()

    useEffect(() => {
        if (!allBreeds) {
            RequestTool.getAllBreeds().then(data => setAllBreeds(data))
        }
    }, [])

    if (allBreeds) {
        return (
            <select value={active === 'breeds' ? breedsPageSettings.idBreedSelected : value ? value : galleryPageSettings.idBreedSelected} className="breed-select" onChange={(e) => {
                changeId(e.target.value)
                setValue(e.target.value)
            }}>
                <option>All breeds</option>
                {allBreeds.map(breed =>
                    <option key={breed.id} value={breed.id}>
                        {breed.name}
                    </option>
                )}
            </select>
        )
    } else {
        return (
            <select className="breed-select">
                <option>All breeds</option>
            </select>
        )
    }
};

export default SelectFilter;