import {useState} from "react";
import cx from "classnames"

export const HomeAppTopBar = () => {
    const [active, setActive] = useState("recent")

    return (
        <div className={"top-bar"}>
            <button className={cx("", {"active": active === "recent"})}>Recent</button>
            <button className={cx("", {"active": active === "crystals"})}>Crystals</button>
            <button className={cx("", {"active": active === "subsets"})}>Subsets</button>
            <button className={cx("", {"active": active === "sources"})}>Sources</button>
        </div>
    )
}