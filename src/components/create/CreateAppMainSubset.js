import cx from "classnames";


export const CreateAppMainSubset = ({open}) => {
    return (
        <div className={cx("create-tab-content", {"open": open})}>
            <p>Subset</p>
        </div>
    )
}