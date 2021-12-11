import "./Compare.css"
import React, {useState,useEffect} from 'react'
import {FaSearch} from "react-icons/fa"
import {array} from "prop-types";
import {QueryResult} from "./QueryResult";
import {useSelector} from "react-redux";
import {getAccessToken} from "../../features/auth/authSlice";


async function search(query, token) {
    console.log("doing something")
    return fetch('/api/crystal/search/' + query, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(data => data.json())
}


export function CompareOptionsPanel({}){
    const [results, setResults] = useState({'data':[], loading: false})
    const [query, setQuery] = useState('')

    let token = useSelector(getAccessToken)

    let htmlresults = <p style={{'text-align': 'center',
                                 'color': 'rgb(196,196,196)',
                                 'position': 'relative', 'top': '50%', 'text-style':'italic'}}>No Results to show..</p>


    const getResults = async() => {
        setResults({'data': [], 'loading': true})
        const res = await search(query, token)
        setResults({'data': res, 'loading': false})
    }

    const handleChange = (e) => {
        setQuery(e.target.value)
    }

    if (results.data.length === 0) {
        htmlresults = <p style={{'text-align': 'center',
            'color': 'rgb(196,196,196)',
            'position': 'relative', 'top': '50%', 'text-style':'italic'}}>No Results to show..</p>
    }

    if (results.loading)
        htmlresults = <p style={{'text-align': 'center',
            'color': 'rgb(196,196,196)',
            'position': 'relative', 'top': '50%', 'text-style':'italic'}}>Loading..</p>



    if (results['data'].length > 0 && !results.loading) {
        htmlresults = <>
            {results.data.map((i) => <QueryResult data={i}/>)}
        </>
    }

    return (
        <div id="compare-options-panel">
            <div className="panel-card">
                <div style={{'display': 'inline-flex'}}>
                    <input id={"compare-search-query"}  placeholder={"Search"} onChange={e => handleChange(e)}/>
                    <button id="compare-search-button" onClick={getResults}>
                        <FaSearch/>
                    </button>
                </div>
            </div>
            <div className="panel-card">
                <div id="search-results-container">
                    { htmlresults }
                </div>
            </div>

        </div>
    )
}