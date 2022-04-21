import cx from "classnames";
import {getActiveAccordion, getSourceSearchResults} from "../../features/home/homeSlice";
import {useSelector} from "react-redux";
import {SelectedCount} from "./RecentCrystalAccordionList";
import {SourceAccordion} from "./SourceAccordion";
import {SourceCreateAccordion} from "./SourceCreateAccordion";


export const SourceAccordionList = () => {
    let activeAccordion = useSelector(getActiveAccordion)
    let dataset = useSelector(getSourceSearchResults)
    console.log("dataset is ")
    console.log(dataset)

    return (
        <div className={cx("crystal-accordion-list", {"hidden": activeAccordion !== "sources"})}>
            <SelectedCount/>
            <SourceCreateAccordion/>
            {dataset.map((d) => {
                return <SourceAccordion dataset={d}/>
            })}
        </div>
    )
}