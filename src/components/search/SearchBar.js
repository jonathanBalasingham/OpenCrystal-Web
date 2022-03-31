import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import {
    change,
    changeContent,
    getCompType,
    getFacet,
    getK,
    getNorm,
    getResultSize,
    openSearchPanel
} from "../../features/search/searchSlice";
import {getAccessToken} from "../../features/auth/authSlice";
import {FaSearch} from "react-icons/fa";
import "./search.scss"

export const SearchBar = () => {
    const dispatch = useDispatch()
    const [query, setQuery] = useState('')

    let facet = useSelector(getFacet)
    let token = useSelector(getAccessToken)
    let k = useSelector(getK)
    let resSize = useSelector(getResultSize)
    let n = useSelector(getNorm)
    let compType = useSelector(getCompType)

    async function search() {
        console.log("doing something")
        return fetch(`/api/search/${facet}/${query}?result_size=${resSize}&k=${k}&n=${n}&comp=${compType}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer: ${token}`,
            },
        })
            .then(data => data.json())
    }


    const fetchResults = async(e) => {
        e.preventDefault();
        dispatch(change({"results": {'data': [], 'loading': true}}))
        dispatch(changeContent("results"))
        const res = await search(query, facet, k, resSize, n, compType, token)
        dispatch(change({"results": {'data': res, 'loading': false}}))
    }

    return (
        <div className="search-bar">
            <form onSubmit={fetchResults}>
                <input className={"search-query"}  placeholder={"Search"}
                       onChange={e => setQuery(e.target.value)}
                       onFocus={() => dispatch(openSearchPanel(""))} />
            </form>
        </div>
    )
}