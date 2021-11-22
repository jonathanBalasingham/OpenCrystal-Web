import "./Compare.css"

export function CompareOptionsPanel({}){
    return (
        <div id="compare-options-panel">
            <div className="panel-card">
                <input id="compare-search-query" type="text" placeholder="Crystal Name.."/>
                <button id="compare-search-button">Search</button>
            </div>
            <div className="panel-card">
                <div id="search-results-container">

                </div>
            </div>

        </div>
    )
}