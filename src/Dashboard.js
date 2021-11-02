import './Dashboard.css'
import LeftPanel from "./LeftPanel";
import {BrowserRouter, Route} from "react-router-dom";
import * as React from "react";
import SideNav, {NavIcon, NavItem, NavText} from "@trendmicro/react-sidenav";

import '@trendmicro/react-sidenav/dist/react-sidenav.css';

function Dashboard() {
    return (
        <div className="dashboard">
            <BrowserRouter>
                <Route render={({ location, history }) => (
                    <React.Fragment>
                        <SideNav
                            onSelect={(selected) => {
                                const to = '/' + selected;
                                if (location.pathname !== to) {
                                    history.push(to);
                                }
                            }}
                        >
                            <SideNav.Toggle />
                            <SideNav.Nav defaultSelected="home">
                                <NavItem eventKey="home">
                                    <NavIcon>
                                        <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                                    </NavIcon>
                                    <NavText>
                                        Home
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="devices">
                                    <NavIcon>
                                        <i className="fa fa-fw fa-device" style={{ fontSize: '1.75em' }} />
                                    </NavIcon>
                                    <NavText>
                                        Devices
                                    </NavText>
                                </NavItem>
                            </SideNav.Nav>
                        </SideNav>
                        <main>
                            <Route path="/" exact component={props => <Dashboard />} />
                            <Route path="/devices" component={props => <Dashboard />} />
                        </main>
                    </React.Fragment>
                )}
                />
            </BrowserRouter>
        </div>
    )
}

export default Dashboard;