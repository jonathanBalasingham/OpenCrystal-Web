import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import * as React from "react";


export function ViewAppPlaceHolder(props) {
    return (
        <div id="plot-app-placeholder">
            <div id="plot-app-placeholder-message">
                <ul>
                    <li>
                        <h1>
                            Create new crystals using <AddIcon fontSize={"large"}/>
                        </h1>
                    </li>
                    <li>
                        <h1>
                            Search for crystals using <SearchIcon fontSize={"large"}/>
                        </h1>
                    </li>
                    <li>
                        <h1>
                            Change account settings with <ManageAccountsIcon fontSize={"large"}/>
                        </h1>
                    </li>
                    <li>
                        <h1>
                            Logout using <LogoutIcon fontSize={"large"}/>
                        </h1>
                    </li>
                </ul>
            </div>
        </div>
    )
}