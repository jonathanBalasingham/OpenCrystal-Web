import "./Compare.css"

export function CompareOptionsPanel({}){
    return (
        <div id="compare-options-panel">
            <div className="panel-card">
                <select name="work_days" id="id_work_days" multiple>
                    <option value="1">Family</option>
                    <option value="2">Crystal</option>
                </select>
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