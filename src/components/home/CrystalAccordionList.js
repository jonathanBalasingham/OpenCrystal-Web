import cx from "classnames";
import {CrystalCreateAccordion} from "./CrystalCreateAccordion";
import {CrystalAccordion} from "./CrystalAccordion";
import {getActiveAccordion, getCrystalSearchResults} from "../../features/home/homeSlice";
import {useSelector} from "react-redux";
import {SelectedCount} from "./RecentCrystalAccordionList";


export const CrystalAccordionList = () => {
    let activeAccordion = useSelector(getActiveAccordion)
    let dataset = useSelector(getCrystalSearchResults)

    return (
        <div className={cx("crystal-accordion-list", {"hidden": activeAccordion !== "crystals"})}>
            <SelectedCount/>
            <CrystalCreateAccordion/>
            {dataset.map((d) => {
                return <CrystalAccordion dataset={d}/>
            })}
        </div>
    )
}