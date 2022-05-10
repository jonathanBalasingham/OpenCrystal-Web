import {QueryResult} from "./QueryResult";
import React from "react";
import {useSelector} from "react-redux";
import {getResults} from "../../features/search/searchSlice";
import "./search.scss"
import {LoadingCustom} from "../../Loading";
import {Spinner} from "react-bootstrap";


export const SearchResults = () => {
    let results = useSelector(getResults)

    if (!results.loading) {
        if (results.data === null || results.data === undefined || results.data.length === 0)
            return <p style={{
                'text-align': 'center',
                'color': 'var(--defaulttext)',
                'position': 'relative', 'top': '45%', 'left': '20%', 'text-style': 'italic'
            }}>No Results to show..</p>
    }
    return (
        <>
            {
                results.loading &&
                <div style={{"display": "grid", "width": "100%",
                    "height": "100%", "placeItems": "center"}}>
                    <Spinner animation="border" variant="primary" />
                </div>
            }
            {
                results['data'].length > 0 && !results.loading &&
                results.data.map((i) => <QueryResult data={i}/>)
            }
        </>
    )
}