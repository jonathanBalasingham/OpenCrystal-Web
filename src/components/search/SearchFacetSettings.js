import React from "react";
import {change, getFacet} from "../../features/search/searchSlice";
import {useDispatch, useSelector} from "react-redux";


export const SearchFacetSettings = () => {
    let dispatch = useDispatch()
    let facet = useSelector(getFacet)

    const changeFacet = (e) => {
        dispatch(change({"facet": e.target.value}))
        dispatch(change({"results": {'data': [], 'loading': false}}))
    }

    return (
        <select name="By:" className="search-facet" value={facet} onChange={ e => changeFacet(e)}>
            <option value="name">Reference Code</option>
            <option value="similarity">Distance</option>
            <option value="subset">Subset</option>
            <option value="composition">Composition</option>
        </select>
    )
}