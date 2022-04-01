import {useDispatch, useSelector} from "react-redux";
import cx from 'classnames';
import {getCoordinateSystem, setCoordinateSystem} from "../../features/create/createSlice";

export const CreateAppCoordinateSwitch = () => {
    let dispatch = useDispatch()
    let coordSys = useSelector(getCoordinateSystem)
    let useFract = coordSys === "fract"
    let useCart = !useFract

    return (
        <div id={"button-switch"} className={"button-switch"}>
            <button className={cx("switch-button", {active: useFract})}
                    onClick={() => dispatch(setCoordinateSystem("fract"))}>Fractional</button>
            <button className={cx("switch-button", {active: useCart})}
                    onClick={() => dispatch(setCoordinateSystem("cartn"))}>Cartesian</button>
        </div>
    )
}