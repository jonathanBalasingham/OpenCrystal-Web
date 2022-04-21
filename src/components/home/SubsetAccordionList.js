import cx from "classnames";
import {getActiveAccordion, getSubsetSearchResults} from "../../features/home/homeSlice";
import {useSelector} from "react-redux";
import {SelectedCount} from "./RecentCrystalAccordionList";
import {SubsetAccordion} from "./SubsetAccordion";
import {SubsetCreateAccordion} from "./SubsetCreateAccordion";


export const SubsetAccordionList = () => {
    let activeAccordion = useSelector(getActiveAccordion)
    let dataset = useSelector(getSubsetSearchResults)
    console.log("dataset is ")
    console.log(dataset)

    return (
        <div className={cx("subset-accordion-list", {"hidden": activeAccordion !== "subsets"})}>
            <SelectedCount/>
            <SubsetCreateAccordion/>
            {dataset.map((d) => {
                return <SubsetAccordion dataset={d}/>
            })}
        </div>
    )
}