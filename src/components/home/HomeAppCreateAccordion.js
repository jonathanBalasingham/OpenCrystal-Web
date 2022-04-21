import cx from "classnames"
import {useSelector} from "react-redux";
import {getActiveAccordion, getCreatePanelOpen, setCreatePanel} from "../../features/home/homeSlice";
import React, {useState} from "react";
import {Button} from "react-bootstrap";
import {CrystalCreateAccordion} from "./CrystalCreateAccordion";
import {SubsetCreateAccordion} from "./SubsetCreateAccordion";
import {SourceCreateAccordion} from "./SourceCreateAccordion";


export const HomeAppCreateAccordion = ({}) => {
    const activeAccordion = useSelector(getActiveAccordion)

    return (
        <div className="home-app-create-accordion">
            {
                (activeAccordion === "crystals" || activeAccordion === "recent") &&
                    <CrystalCreateAccordion/>
            }
            {
                activeAccordion === "subsets" && <SubsetCreateAccordion/>
            }
            {
                activeAccordion === "sources" && <SourceCreateAccordion/>
            }
        </div>
    )
}