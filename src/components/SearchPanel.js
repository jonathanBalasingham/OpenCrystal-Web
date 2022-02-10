import React, {useState,useEffect} from 'react'
import {FaSearch} from "react-icons/fa"
import {array} from "prop-types";
import {QueryResult} from "./compare/QueryResult";
import {useDispatch, useSelector} from "react-redux";
import {getAccessToken} from "../features/auth/authSlice";
import {closeSearchPanel, getSearchPanelOpened} from "../features/search/searchSlice";
import {getCreateModalOpened} from "../features/create/createSlice";
import CloseIcon from '@mui/icons-material/Close';


async function search(query, facet, token) {
    console.log("doing something")
    return fetch(`/api/search/${facet}/${query}?result_size=100&k=100&n=2`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(data => data.json())
}

function SearchPanel({}) {
    let dispatch = useDispatch()

    const [results, setResults] = useState({'data':[], loading: false})
    const [query, setQuery] = useState('')
    const [facet, setFacet] = useState('name')

    let token = useSelector(getAccessToken)
    let vis  = 'none'
    const modalOpened = useSelector(getSearchPanelOpened)
    console.log(modalOpened)
    if (modalOpened)
        vis = 'block'


    let htmlresults = <p style={{'text-align': 'center',
        'color': 'rgb(196,196,196)',
        'position': 'relative', 'top': '5%', 'text-style':'italic'}}>No Results to show..</p>


    const getResults = async() => {
        setResults({'data': [], 'loading': true})
        const res = await search(query, facet, token)
        setResults({'data': res, 'loading': false})
    }

    if (results.data.length === 0) {
        htmlresults = <p style={{'text-align': 'center',
            'color': 'var(--defaulttext)',
            'position': 'relative', 'top': '5%', 'text-style':'italic'}}>No Results to show..</p>
    }

    if (results.loading)
        htmlresults = <p style={{'text-align': 'center',
            'color': 'var(--defaulttext)',
            'position': 'relative', 'top': '5%', 'text-style':'italic'}}>Loading..</p>


    if (results['data'].length > 0 && !results.loading) {
        htmlresults = <div id="search-results-container">
            {results.data.map((i) => <QueryResult data={i}/>)}
        </div>
    }


    return (
        <div id="search-panel" style={{'display': vis}}>
            <div className="close-button-container">
                <button onClick={() => dispatch(closeSearchPanel(false))}>
                    <CloseIcon fontSize={"small"}/>
                </button>
            </div>
            <div className="panel-card">
                <div style={{'display': 'inline-flex'}}>
                    <input id={"compare-search-query"}  placeholder={"Search"} onChange={e => setQuery(e.target.value)}/>
                    <button id="compare-search-button" onClick={getResults}>
                        <FaSearch/>
                    </button>
                </div>
                <select name="By:" id="search-facet" onChange={ e => setFacet(e.target.value)}>
                    <option value="name">Name</option>
                    <option value="similarity">Similarity</option>
                    <option value="subset">Subset</option>
                </select>
            </div>
            { htmlresults }
        </div>
    )

}

export default SearchPanel;