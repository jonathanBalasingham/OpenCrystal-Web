import cx from "classnames"
import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";

export const SearchAccordion = ({}) => {
    const [open, setOpen] = useState(false)
    const [facet, setFacet] = useState("name")
    const [query, setQuery] = useState("")
    const [matchType, setMatchType] = useState("exact")
    const [orderBy, setOrderBy] = useState("none")

    const handleSearch = () => {

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
                        <option value="name">Reference Code</option>
                        <option value="similarity">Source</option>
                        <option value="subset">Subset</option>
                        <option value="composition">Composition</option>
                    </select>
                    <button className="search-accordion-button" onClick={handleSearch}>
                        Search
                    </button>
                </div>
                <div className="group">
                    <button id="advanced-search-button" onClick={() => setOpen(!open)}>
                        Advanced Search
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
                    <p>Order By:</p>
                    <select name="By:" className="order-facet" value={orderBy} onChange={ e => setOrderBy(e.target.value)}>
                        <option value="none">None</option>
                        <option value="name">Reference Code</option>
                        <option value="similarity">Source</option>
                        <option value="subset">Subset</option>
                        <option value="composition">Composition</option>
                    </select>
                </div>
            </div>
        </div>
    )
}