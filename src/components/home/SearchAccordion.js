import cx from "classnames"
import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {
    getActiveAccordion,
    setActiveAccordion,
    setCrystalSearchResults, setSourceSearchResults,
    setSubsetSearchResults
} from "../../features/home/homeSlice";
import {getAccessToken} from "../../features/auth/authSlice";


const CrystalFacetOptions = () => {
    return (
        <>
            <option value="name">Reference Code</option>
            <option value="family">Family</option>
            <option value="source">Source</option>
            <option value="subset">Subset</option>
            <option value="composition">Composition</option>
            <option value="primeComposition">Prime Composition</option>
            <option value="similarity">Distance</option>
        </>
    )
}

const SourceFacetOptions = () => {
    return (
        <>
            <option value="name">Name</option>
        </>
    )
}

const SubsetFacetOptions = () => {
    return (
        <>
            <option value="name">Name</option>
        </>
    )
}

export const SearchAccordion = ({}) => {
    const [open, setOpen] = useState(false)
    const [facet, setFacet] = useState("name")
    const [query, setQuery] = useState("")
    const [matchType, setMatchType] = useState("exact")
    const [orderBy, setOrderBy] = useState("none")
    const [loading, setLoading] = useState(false)
    let activeAccordion = useSelector(getActiveAccordion)
    let dispatch = useDispatch()
    let token = useSelector(getAccessToken)

    const handleSearch = () => {
        if (query === "")
            return
        setLoading(true)
        let aa = activeAccordion
        if (activeAccordion === "recent") {
            dispatch(setActiveAccordion("crystals"))
            aa = "crystals"
        }

        let url = `/api/search/${aa.slice(0, -1)}/${facet}/${query}?match=${matchType}&order=${orderBy}`
        if (aa !== "crystals")
            url = `/api/search/${aa.slice(0, -1)}/${query}?match=${matchType}&order=${orderBy}&aggregate=true`
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer:${token}`,
            },
        })
            .then(data => {
                if (data.status !== 200) {
                    if (data.status === 401) {
                        window.location.reload()
                    }
                } else {
                    data.json().then((d) => {
                        setLoading(false)
                        switch (activeAccordion) {
                            case "crystals":
                                dispatch(setCrystalSearchResults(d.data))
                                break
                            case "recent":
                                dispatch(setCrystalSearchResults(d.data))
                                break
                            case "subsets":
                                dispatch(setSubsetSearchResults(d.data))
                                break
                            case "sources":
                                dispatch(setSourceSearchResults(d.data))
                                break
                        }
                    })
                }
            })
    }

    return (
        <div className="search-accordion">
            <div className="search-accordion-header">
                <div className={"group"}>
                    <input className={"search-query"}  placeholder={"Search"}
                           onChange={e => setQuery(e.target.value)}
                           value={query}
                    />
                    <select name="By:" className="search-facet" value={facet} onChange={ e => setFacet(e.target.value)}>
                        {
                            (activeAccordion === "crystals" || activeAccordion === "recent") &&
                            <CrystalFacetOptions/>
                        }
                        {
                            activeAccordion === "sources" && <SourceFacetOptions/>
                        }
                        {
                            activeAccordion === "subsets" && <SubsetFacetOptions/>
                        }
                    </select>
                    <button className="search-accordion-button" onClick={handleSearch}>
                        {loading ? "Loading.." : "Search"}
                    </button>
                </div>
                <div className="group">
                    <button id="advanced-search-button" onClick={() => setOpen(!open)}>
                        More Options
                    </button>
                </div>
            </div>
            <div className={cx("search-accordion-body", {"open": open})}>
                <div>
                    <p>Match Type:</p>
                    <div key={`inline-radio`} className="mb-3">
                        <Form.Check
                            inline
                            label="Exact"
                            name="group1"
                            type="radio"
                            id={`inline-radio-1`}
                            onClick={() => setMatchType("exact")}
                        />
                        <Form.Check
                            inline
                            label="Partial"
                            name="group1"
                            type="radio"
                            id={`inline-radio-2`}
                            onClick={() => setMatchType("partial")}
                        />
                    </div>
                </div>
                <div>
                    <p>Order:</p>
                    <select name="By:" className="order-facet" value={orderBy} onChange={ e => setOrderBy(e.target.value)}>
                        <option value="none">None</option>
                        <option value="oldest">Oldest</option>
                        <option value="recent">Most Recent</option>
                        <option value="alphabetically">Alpha</option>
                    </select>
                </div>
            </div>
        </div>
    )
}