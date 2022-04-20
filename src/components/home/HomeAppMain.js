import {HomeAppTopBar} from "./HomeAppTopBar";
import * as React from "react";
import {CrystalAccordionList} from "./CrystalAccordionList";


export const HomeAppMain = ({}) => {

    return (
        <div className="home-app-main">
            <HomeAppTopBar/>
            <CrystalAccordionList/>
        </div>
    )
}