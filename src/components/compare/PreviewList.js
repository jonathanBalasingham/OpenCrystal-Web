import {useSelector} from "react-redux";
import {getPreviewList, getPreviewListOpen} from "../../features/compare/compareSlice";
import {QueryResult} from "../search/QueryResult";
import React from "react";
import {PreviewListItem} from "../PreviewPanel";
import cx from "classnames"


export const PreviewList = () => {
    let pl = useSelector(getPreviewList)
    let open = useSelector(getPreviewListOpen)
    console.log(pl)
    let previews = <>
        {pl.map((i) => <PreviewListItem name={i}/>)}
    </>
    return (
        <div className={cx("preview-list", {"open": open})}>
            {previews}
        </div>
    )
}