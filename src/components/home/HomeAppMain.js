import {HomeAppTopBar} from "./HomeAppTopBar";
import * as React from "react";
import {RecentCrystalAccordionList} from "./RecentCrystalAccordionList";
import {useSelector} from "react-redux";
import {getActiveAccordion} from "../../features/home/homeSlice";
import {CrystalAccordionList} from "./CrystalAccordionList";
import {SourceAccordionList} from "./SourceAccordionList";


export const HomeAppMain = ({}) => {
    let activeAccordion = useSelector(getActiveAccordion)
    console.log(`active accordion ${activeAccordion}`)

    return (
        <div className="home-app-main">
            <HomeAppTopBar/>
            <RecentCrystalAccordionList/>
            <CrystalAccordionList/>
            <SourceAccordionList/>
        </div>
    )
}