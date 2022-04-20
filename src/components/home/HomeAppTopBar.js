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
import {CrystalAccordionList} from "./CrystalAccordionList";
import {openSearchPanel} from "../../features/search/searchSlice";
import {useDispatch} from "react-redux";
import {setCreatePanel} from "../../features/home/homeSlice";
import {SearchAccordion} from "./SearchAccordion";

export const HomeAppTopBar = () => {
    const [active, setActive] = useState("recent")
    const [index, setIndex] = useState(0);
    const [query, setQuery] = useState("")
    const [facet, setFacet] = useState("")
    let dispatch = useDispatch()

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

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
                    <button className={cx("", {"active": active === "recent"})} onClick={() => setActive("recent")}>Recent</button>
                    <button className={cx("", {"active": active === "crystals"})} onClick={() => setActive("crystals")}>Crystals</button>
                    <button className={cx("", {"active": active === "subsets"})} onClick={() => setActive("subsets")}>Subsets</button>
                    <button className={cx("", {"active": active === "sources"})} onClick={() => setActive("sources")}>Sources</button>
                </div>
                <div className={"right-group"}>
                    <Button size="sm" onClick={() => dispatch(setCreatePanel(true))}>Create</Button>
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