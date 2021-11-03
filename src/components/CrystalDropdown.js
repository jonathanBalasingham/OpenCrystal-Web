import * as React from "react";
import BootstrapSelect from 'react-bootstrap-select-dropdown';

class CrystalDropdown extends React.Component {
    getOptions() {
        const opt = [
            {
                "labelKey": "optionItem1",
                "value": "Option item 1"
            },
            {
                "labelKey": "optionItem2",
                "value": "Option item 2"
            }
        ];
        return opt;
    }

    render() {
        return (
            <BootstrapSelect options={this.getOptions()}/>
        )
    }
}

export default CrystalDropdown;

