import {MoleculeView} from "../PreviewPanel";


export const MoleculeCard = ({id}) => {

    return (
        <div className={"molecule-card"}>
            <MoleculeView name={id}/>
        </div>
    )
}