import cx from "classnames"
import {useSelector} from "react-redux";
import {getCreatePanelOpen, setCreatePanel} from "../../features/home/homeSlice";
import React, {useState} from "react";
import {Button} from "react-bootstrap";


export const HomeAppSidePanel = ({}) => {
    let open = useSelector(getCreatePanelOpen)
    const [active, setActive] = useState("crystal")

    return (
        <div className={cx("home-app-side-panel", {"open": open})}>
            <div className={"top-bar"}>
                <button className={cx("", {"active": active === "crystal"})} onClick={() => setActive("crystal")}>Crystal</button>
                <button className={cx("", {"active": active === "subset"})} onClick={() => setActive("subset")}>Subset</button>
                <button className={cx("", {"active": active === "source"})} onClick={() => setActive("source")}>Source</button>
            </div>
        </div>
    )
}