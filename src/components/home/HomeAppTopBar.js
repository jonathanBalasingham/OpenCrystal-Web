import {useState} from "react";
import cx from "classnames"
import {Accordion, Carousel} from "react-bootstrap";
import {MoleculeCardRow} from "./MoleculeCardRow";

export const HomeAppTopBar = () => {
    const [active, setActive] = useState("recent")
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <>
            <div className={"top-bar"}>
                <button className={cx("", {"active": active === "recent"})}>Recent</button>
                <button className={cx("", {"active": active === "crystals"})}>Crystals</button>
                <button className={cx("", {"active": active === "subsets"})}>Subsets</button>
                <button className={cx("", {"active": active === "sources"})}>Sources</button>
            </div>
            <Carousel activeIndex={index} onSelect={handleSelect} variant="dark">
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
            <Accordion defaultActiveKey={['0']} alwaysOpen>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Accordion Item #1</Accordion.Header>
                    <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                        est laborum.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Accordion Item #2</Accordion.Header>
                    <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                        est laborum.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    )
}