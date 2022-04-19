import {MoleculeCard} from "./MoleculeCard";


export const MoleculeCardRow = ({ids}) => {

    return (
        <div className={"molecule-card-row"}>
            <MoleculeCard id={ids[0]}/>
            <MoleculeCard id={ids[1]}/>
            <MoleculeCard id={ids[2]}/>
        </div>
    )
}