
import * as React from 'react';

import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { RouteComponentProps, Link, Route } from 'react-router-dom';
import { RootState } from 'store';
import { Staff } from 'models';
import { Page } from './Page';
import { Table } from 'reactstrap';

import { denormalize } from 'normalizr';

const selectStaffEntities = (state: RootState) => state.entities.staff;

const getEntityArray = createSelector(selectStaffEntities, staff => {
    return Object.keys(staff).map(id => staff[id] as Staff);
});

const getSortedStaff = createSelector(getEntityArray, staff => {
    staff = staff.slice()
    staff.sort((a, b) => {
        if (a.last_name > b.last_name) { return 1; }
        if (b.last_name > a.last_name) { return -1; }
        if (a.first_name > b.first_name) { return 1; }
        if (b.first_name > a.first_name) { return -1; }
        return a.id - b.id;
    });
    return staff;
});

export interface StaffPageProps extends RouteComponentProps<{}> {

}

interface StateProps {
    staff: Staff[];
}


function mapStateToProps(state: RootState, props: StaffPageProps): StateProps {
    return {
        staff: getSortedStaff(state),
    }
}


const mapDispatchToProps = {

}


type Props = StaffPageProps & StateProps & typeof mapDispatchToProps;

class StaffPageBase extends React.PureComponent<Props> {

    constructor(props: Props) {
        super(props);
    }


    render() {
        let rows = this.props.staff.map((staff) => 
            <StaffRow key={staff.id} staff={staff} />);
                
        return (
            <Page title='Staff'>
                <Table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </Page>
        );
    }

}

function StaffRow(props: {staff: Staff}) {
    let url = `/staff/${props.staff.id}/`
    return (
        <tr>
            <td>{props.staff.id}</td>
            <td><Link to={url}>{props.staff.first_name} {props.staff.last_name}</Link></td>
        </tr>
    )

}

function StaffDetail(props: {}) {
    return <tr><td colSpan={2}><h1>Hello</h1></td></tr>
}

export const StaffPage = connect(mapStateToProps, mapDispatchToProps)(StaffPageBase);