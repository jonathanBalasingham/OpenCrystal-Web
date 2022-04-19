import {useState} from "react";
import cx from "classnames"
import {Accordion, Breadcrumb, Carousel} from "react-bootstrap";
import {MoleculeCardRow} from "./MoleculeCardRow";
import {AiOutlineHome} from "react-icons/all";
import {CrystalAccordionList} from "./CrystalAccordionList";

export const HomeAppTopBar = () => {
    const [active, setActive] = useState("recent")
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item ><AiOutlineHome/></Breadcrumb.Item>
                <Breadcrumb.Item>
                    {active}
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Data</Breadcrumb.Item>
            </Breadcrumb>
            <div className={"top-bar"}>
                <button className={cx("", {"active": active === "recent"})} onClick={() => setActive("recent")}>Recent</button>
                <button className={cx("", {"active": active === "crystals"})} onClick={() => setActive("crystals")}>Crystals</button>
                <button className={cx("", {"active": active === "subsets"})} onClick={() => setActive("subsets")}>Subsets</button>
                <button className={cx("", {"active": active === "sources"})} onClick={() => setActive("sources")}>Sources</button>
            </div>
            <div className={"search-bar"}>

            </div>
            <CrystalAccordionList/>
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