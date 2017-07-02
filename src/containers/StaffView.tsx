
import * as React from 'react';
import { RouteComponentProps, Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Staff, NormalizedStaff } from 'models';
import { RootState } from 'store';
import { staffSchema } from '../schemas';
import { addApprover } from '../store/actions';

import { createSelector } from 'reselect';
import { StaffLink, StaffList } from '../components';
import { Page } from './Page';
import { getSortedStaff } from './Staff';

import { denormalize, schema } from 'normalizr';

export interface StaffViewProps extends RouteComponentProps<{id: number}> {
    
}

interface StateProps {
    staff: Staff;
    allStaff: Staff[];
    rawStaff: NormalizedStaff;
}

const getEntities = (state: RootState) => state.entities;

const selectRawStaff = (state: RootState, props: StaffViewProps) => {
    return state.entities.staff[props.match.params.id];
};

const denormalizeStaff = createSelector(
    [selectRawStaff, getEntities], 
    (staff, entities) => denormalize(staff, staffSchema, entities));

function mapStateToProps(state: RootState, props: StaffViewProps): StateProps {
    return {
        rawStaff: selectRawStaff(state, props),
        staff: denormalizeStaff(state, props),
        allStaff: getSortedStaff(state),
    };
}

const mapDispatchTopProps = {
    addApprover: addApprover,
};

type Props = StaffViewProps & StateProps & typeof mapDispatchTopProps;


class StaffViewBase extends React.PureComponent<Props> {
    
    constructor(props: Props) {
        super(props);
        this.handleAddApprover = this.handleAddApprover.bind(this);
    }

    handleAddApprover(approver: Staff) {
        this.props.addApprover(approver, this.props.staff);
    }

    render() {
        
        if (!this.props.staff) {
            return <i className="fa fa-spin fa-spinner" />;
        }

        return(
        <Page title={`${this.props.staff.first_name} ${this.props.staff.last_name}`}>
            <pre>{JSON.stringify(this.props.rawStaff, null, 2)}</pre>
            <StaffList 
                title="Approvers" 
                staff={this.props.staff.approved_by || []} 
                allStaff={this.props.allStaff}
                addStaff={this.handleAddApprover}
            />
        </Page>
        );
    }
}


export const StaffView = connect(mapStateToProps, mapDispatchTopProps)(StaffViewBase);
