import React, {useState,useEffect} from 'react'
import {FaSearch} from "react-icons/fa"
import {array} from "prop-types";
import {QueryResult} from "./compare/QueryResult";
import {useDispatch, useSelector} from "react-redux";
import {getAccessToken} from "../features/auth/authSlice";
import {
    change, changeContent,
    closeSearchPanel,
    getContent,
    getFacet,
    getK, getResultSize,
    getSearchPanelOpened,
    getResults
} from "../features/search/searchSlice";
import {getCreateModalOpened} from "../features/create/createSlice";
import CloseIcon from '@mui/icons-material/Close';
import ListIcon from '@mui/icons-material/List';
import SettingsIcon from '@mui/icons-material/Settings';
import cx from "classnames";
import { CSSTransition } from "react-transition-group";


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

function SearchPanelSettings({}){
    let dispatch = useDispatch()
    let k = useSelector(getK)
    let resSize = useSelector(getResultSize)
    let facet = useSelector(getFacet)

    const changeFacet = (e) => {
        dispatch(change({"facet": e.target.value}))
        dispatch(change({"results": {'data': [], 'loading': false}}))
    }

    return (
        <div id="search-panel-settings">
            <select name="By:" id="search-facet" value={facet} onChange={ e => changeFacet(e)}>
                <option value="name">Name</option>
                <option value="similarity">Similarity</option>
                <option value="subset">Subset</option>
            </select>
            <p>{`Nearest Neighbors (Similarity Only): ${k}`}</p>
            <input type="range" id="search-k" name="search-k" onChange={e => dispatch(change({"k": e.target.value}))}
                   min="1" max="100" value={k} step="1" />
            <p>{`Result Size: ${resSize}`}</p>
            <input type="range" id="search-result-size" name="search-result-size" onChange={e => dispatch(change({"resultSize": e.target.value}))}
                   min="10" max="500" value={resSize} step="10" />
        </div>
    )
}

function SearchPanel({}) {
    let dispatch = useDispatch()

    const [query, setQuery] = useState('')

    let facet = useSelector(getFacet)
    let token = useSelector(getAccessToken)
    let vis  = 'none'
    let open = useSelector(getSearchPanelOpened)
    let currentContent = useSelector(getContent)
    let results = useSelector(getResults)


    let htmlresults = <p style={{'text-align': 'center',
        'color': 'rgb(196,196,196)',
        'position': 'relative', 'top': '5%', 'text-style':'italic'}}>No Results to show..</p>


    const fetchResults = async() => {
        dispatch(change({"results": {'data': [], 'loading': true}}))
        dispatch(changeContent("results"))
        const res = await search(query, facet, token)
        dispatch(change({"results": {'data': res, 'loading': false}}))
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

    let content = htmlresults;
    if (currentContent === "settings")
        content = <SearchPanelSettings/>;


    return (
        <div id="search-panel" className={cx("search-panel", {"open": open})}>
            <div className="close-button-container">
                <button onClick={() => dispatch(closeSearchPanel(false))}>
                    <CloseIcon fontSize={"small"}/>
                </button>
                <button onClick={() => dispatch(changeContent("settings"))}>
                    <SettingsIcon fontSize={"small"}/>
                </button>
                <button onClick={() => dispatch(changeContent("results"))}>
                    <ListIcon fontSize={"small"}/>
                </button>

            </div>
            <div className="panel-card">
                <div style={{'display': 'inline-flex'}}>
                    <input id={"compare-search-query"}  placeholder={"Search"} onChange={e => setQuery(e.target.value)}/>
                    <button id="compare-search-button" onClick={fetchResults}>
                        <FaSearch/>
                    </button>
                </div>
            </div>
            { content }
        </div>
    )

}

export default SearchPanel;