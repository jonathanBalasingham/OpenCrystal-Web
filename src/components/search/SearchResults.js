import {QueryResult} from "./QueryResult";
import React from "react";
import {useSelector} from "react-redux";
import {getResults} from "../../features/search/searchSlice";
import "./search.scss"
import {LoadingCustom} from "../../Loading";


export const SearchResults = () => {
    let results = useSelector(getResults)

    let htmlresults = <p style={{'text-align': 'center',
        'color': 'rgb(196,196,196)',
        'position': 'relative', 'top': '5%', 'text-style':'italic'}}>No Results to show..</p>



    if (results.data.length === 0) {
        htmlresults = <p style={{'text-align': 'center',
            'color': 'var(--defaulttext)',
            'position': 'relative', 'top': '45%', 'left':'20%', 'text-style':'italic'}}>No Results to show..</p>
    }

    if (results.loading)
        return (
            <div style={{"display": "grid", "justify-content": "center", "align-content": "center"}}>
                <LoadingCustom width={"100%"} height={"100%"} innerHeight={"95%"} innerWidth={"100px"}/>
            </div>
        )


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