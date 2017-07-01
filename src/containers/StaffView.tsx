
import * as React from 'react';
import { RouteComponentProps, Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Staff } from 'models';
import { RootState } from 'store';

import { Page } from './Page';

export interface StaffViewProps extends RouteComponentProps<{id: number}> {
    
}

interface StateProps {
    staff: Staff;
}


function mapStateToProps(state: RootState, props: StaffViewProps): StateProps {
    return {
        staff: state.entities.staff[props.match.params.id],
    }
}

const mapDispatchTopProps = {

}

type Props = StaffViewProps & StateProps & typeof mapDispatchTopProps;


class StaffViewBase extends React.PureComponent<Props> {
    
    constructor(props: Props) {
        super(props);
    }

    render() {
        
        if (!this.props.staff) {
            return <i className="fa fa-spin fa-spinner"></i>
        }

        return(
        <Page title={`${this.props.staff.first_name} ${this.props.staff.last_name}`}>

        </Page>
        )
    }
}


export const StaffView = connect(mapStateToProps, mapDispatchTopProps)(StaffViewBase);
