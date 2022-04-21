import React, {useState} from "react";
import cx from "classnames"
import {
    Accordion,
    Breadcrumb,
    ButtonGroup,
    Carousel,
    DropdownButton,
    Dropdown,
    Form,
    FloatingLabel, Button
} from "react-bootstrap";
import {MoleculeCardRow} from "./MoleculeCardRow";
import {AiOutlineHome} from "react-icons/all";
import {RecentCrystalAccordionList} from "./RecentCrystalAccordionList";
import {openSearchPanel} from "../../features/search/searchSlice";
import {useDispatch, useSelector} from "react-redux";
import {
    getActiveAccordion,
    openCrystalCreate, openSourceCreate,
    openSubsetCreate,
    setActiveAccordion,
    setCreatePanel
} from "../../features/home/homeSlice";
import {SearchAccordion} from "./SearchAccordion";

export const HomeAppTopBar = () => {
    let active = useSelector(getActiveAccordion)
    const [index, setIndex] = useState(0);
    let dispatch = useDispatch()

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    const openCreateAccordion = () => {
        console.log(`active is ${active}`)
        switch (active) {
            case "recent":
                dispatch(openCrystalCreate(true))
                break
            case "crystals":
                dispatch(openCrystalCreate(true))
                break
            case "subsets":
                dispatch(openSubsetCreate(true))
                break
            case "sources":
                console.log("dispatching correctly")
                dispatch(openSourceCreate(true))
                break
        }
    }

    return (
        <>
            <Breadcrumb style={{"fontSize": "12px", "padding": "20px 20px 0"}}>
                <Breadcrumb.Item ><AiOutlineHome/></Breadcrumb.Item>
                <Breadcrumb.Item>
                    {active.at(0).toUpperCase() + active.slice(1)}
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Data</Breadcrumb.Item>
            </Breadcrumb>
            <div className={"top-bar"}>
                <div className={"left-group"}>
                    <button className={cx("", {"active": active === "recent"})}
                            onClick={() => dispatch(setActiveAccordion("recent"))}>Recent</button>
                    <button className={cx("", {"active": active === "crystals"})}
                            onClick={() => dispatch(setActiveAccordion("crystals"))}>Crystals</button>
                    <button className={cx("", {"active": active === "subsets"})}
                            onClick={() => dispatch(setActiveAccordion("subsets"))}>Subsets</button>
                    <button className={cx("", {"active": active === "sources"})}
                            onClick={() => dispatch(setActiveAccordion("sources"))}>Sources</button>
                </div>
                <div className={"right-group"}>
                    <Button size="sm" onClick={openCreateAccordion}>Create</Button>
                </div>
            </div>
            <SearchAccordion />
        </>
    )
}

/*
*             <Carousel activeIndex={index} onSelect={handleSelect} variant="dark">
                <Carousel.Item>
                    <MoleculeCardRow ids={["CREATE01", "CREATE01", "CREATE01"]}/>
                </Carousel.Item>
                <Carousel.Item>
                    <MoleculeCardRow ids={[4,5,6]}/>
                </Carousel.Item>
                <Carousel.Item>
                    <MoleculeCardRow ids={[7,8,9]}/>
                </Carousel.Item>
            </Carousel>
* */