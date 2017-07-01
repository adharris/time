
import * as React from 'react';

import { Navbar, NavbarBrand, Container, Nav, NavItem, Collapse, NavbarToggler } from 'reactstrap';
import { NavLink, RouteComponentProps } from 'react-router-dom';

export const MenuItems: [string, string, boolean][] = [
    ['/', 'My Timesheet', true],
    ['/staff', 'Staff', false],
]

export interface MenuProps extends RouteComponentProps<any> {
}

interface MenuState {
    isOpen: boolean;
}

export class Menu extends React.Component<MenuProps, MenuState> {

    constructor(props: MenuProps) {
        super(props);
        
        this.toggle = this.toggle.bind(this);

        this.state = {isOpen: false}
    }

    toggle() {
        this.setState(state => {
            return {isOpen: !state.isOpen};
        })
    }

    render() {

        let navItems = MenuItems.map((item, index) => {
            return (
                <NavItem key={index}>
                    <NavLink 
                        exact={item[2]}
                        className='nav-link' 
                        to={item[0]}>
                        {item[1]}
                    </NavLink>
                </NavItem>
            );
        })

        return (
            <Navbar light color='faded' toggleable>
                <Container>
                    <NavbarToggler right onClick={this.toggle} />
                    <NavbarBrand href='/'>Timesheets</NavbarBrand>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav navbar className="ml-auto">
                            {navItems}
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        )
    }

}