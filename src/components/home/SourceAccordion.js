


export const SourceAccordion = ({dataset}) => {
    return (
        <div className={"accordion"}>
            <div className={"accordion-header"} >
                <p>{`ID: ${dataset.ID}`}</p>
                <p>{dataset.name}</p>
                <p>{dataset.CreatedAt}</p>
            </div>
        </div>
    )
}