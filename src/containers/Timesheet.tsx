
import * as React from 'react';

import { createSelector } from 'reselect';
import { connect, Dispatch } from  'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Page } from './Page'
import { Table } from 'reactstrap';

import { loadPrograms } from '../store/actions';
import { RootState } from 'store';
import { Program } from '../models';


interface OwnProps extends RouteComponentProps<{}> {

}

interface StateProps {
    programs: Program[];
}

const selectPrograms = (state: RootState) => state.entities.programs
const first10 = createSelector([selectPrograms], programs => Object.keys(programs).slice(0, 10).map(p => programs[p]));

export function matchStateToProps(state: RootState, props: OwnProps) {
    return {
        programs: first10(state),
    }
}

export const mapDispatchToProps = {
    loadPrograms: loadPrograms,
}

export type TimesheetProps = OwnProps & StateProps & typeof mapDispatchToProps;

export class TimesheetBase extends React.PureComponent<TimesheetProps, any> {

    constructor(props: TimesheetProps) {
        super(props);
    }

    componentDidMount() {
        this.props.loadPrograms();
    }

    render() {
        let rows = this.props.programs.map(p => (
            <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.city}</td>
                <td>{p.state}</td>
            </tr>
        ));

        return (
            <Page title="My Timesheet">
                <Table striped responsive>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>city</th>
                            <th>state</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </Page>
        )
    }

}

export const Timesheet = connect(matchStateToProps, mapDispatchToProps)(TimesheetBase);