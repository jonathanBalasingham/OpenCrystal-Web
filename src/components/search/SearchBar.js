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
import {
    addAccessToken,
    addRefreshToken,
    getAccessToken,
    getCurrentUser,
    getRefreshToken
} from "../../features/auth/authSlice";
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
    let refreshToken = useSelector(getRefreshToken)
    let user = useSelector(getCurrentUser)

    async function search() {
        console.log("doing something")
        fetch("/api/token/refresh", {
            method: "POST",
            headers: {
                "Authorization": `Bearer: ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"refresh": refreshToken})
        })
            .then((resp) => {
                if (resp.status !== 200) {
                    sessionStorage.clear()
                    dispatch(addAccessToken(undefined))
                    dispatch(addRefreshToken(undefined))
                } else {
                    resp.json()
                        .then((r) => {
                            console.log(r)
                            let jwt = {
                                "access": r.access,
                                "refresh": r.refresh,
                                "user": user
                            }
                            sessionStorage.setItem('token', JSON.stringify(jwt))
                            dispatch(addAccessToken(jwt["access"]))
                            dispatch(addRefreshToken(jwt["refresh"]))
                        })
                }
            })

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