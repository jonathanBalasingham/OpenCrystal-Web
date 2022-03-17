import cx from "classnames";


export const CreateAppMainSource = ({open}) => {
    return (
        <div className={cx("create-tab-content", {"open": open})}>
            <p>Source</p>
        </div>
    )
}