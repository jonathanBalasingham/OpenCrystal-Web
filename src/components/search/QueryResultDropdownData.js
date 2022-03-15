


export const QueryResultDropdownData = ({label, value}) => {
    let value_result = "N/A"
    if (value !== undefined)
        value_result = value

    if (value === "")
        value_result = "None"

    if (value === true)
        value_result = "True"

    if (value === false)
        value_result = "False"

    return  (
        <div className={"query-result-dropdown-data"}>
            <p className={"query-result-dropdown-data-label"}>{label}</p>
            <p className={"query-result-dropdown-data-value"}>{value_result}</p>
        </div>
    )
}