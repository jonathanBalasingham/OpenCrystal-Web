import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {getGraphType, setGraphType} from "../../features/compare/compareSlice";
import cx from "classnames"

export const CompareAppMenuGraphSelectionButton = ({text, icon, label}) => {
    let dispatch = useDispatch()
    let graphType = useSelector(getGraphType)

    return (
        <div className={cx("plot-app-menu-graph-selection-button", {"selected": label === graphType})}
             onClick={() => dispatch(setGraphType(label))}>
            {icon}
            {text}
        </div>
    )
}