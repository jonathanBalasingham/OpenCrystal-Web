import {CreateAppMainCrystal} from "./CreateAppMainCrystal";
import {CreateAppMainSubset} from "./CreateAppMainSubset";
import {CreateAppMainSource} from "./CreateAppMainSource";
import {useSelector} from "react-redux";
import {getCurrentTab} from "../../features/create/createSlice";


export const CreateAppMain = () => {
    let currentlyOpen = useSelector(getCurrentTab)

    return (
        <div className={"create-app-main"}>
            <CreateAppMainCrystal open={currentlyOpen === "crystal"}/>
            <CreateAppMainSubset open={currentlyOpen === "subset"}/>
            <CreateAppMainSource open={currentlyOpen === "source"}/>
        </div>
    )
}