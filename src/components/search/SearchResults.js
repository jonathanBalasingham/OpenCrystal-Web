import {QueryResult} from "./QueryResult";
import React from "react";
import {useSelector} from "react-redux";
import {getResults} from "../../features/search/searchSlice";
import "./search.scss"


export const SearchResults = () => {
    let results = useSelector(getResults)


    let htmlresults = <p style={{'text-align': 'center',
        'color': 'rgb(196,196,196)',
        'position': 'relative', 'top': '5%', 'text-style':'italic'}}>No Results to show..</p>



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
        htmlresults = <div className="search-results-container">
            {results.data.map((i) => <QueryResult data={i}/>)}
        </div>
    }

    return (
        <>
            {htmlresults}
        </>
    )
}