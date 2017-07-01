
import * as React from 'react';

import { Code } from '../data/codes';
import { Program } from '../data/programs';

import { Row, Col, Button } from 'reactstrap';
import { ProgramSelect } from './ProgramSelect'
import { Week } from './Week';
import { Json } from './Json';


export interface RowData {
    code: Code | undefined;
    program: Program | undefined;
    hours: number[][];
}


export interface CodeRowProps {
    data: RowData;
    programs: Program[];
    onChange: (data: RowData) => void;
}


export class CodeRow extends React.PureComponent<CodeRowProps, {}> {

    constructor(props: CodeRowProps) {
        super(props);

        this.handleOnProgramChange = this.handleOnProgramChange.bind(this);
        this.handleRemoveProgram = this.handleRemoveProgram.bind(this);
        this.handleWeekChange = this.handleWeekChange.bind(this);
    }

    handlePropChange(data: Partial<RowData>) {
        let newData = {...this.props.data, ...data};
        this.props.onChange(newData);
    }

    handleOnProgramChange(program: Program | undefined) {
        this.handlePropChange({program});
    }

    handleRemoveProgram() {
        this.handleOnProgramChange(undefined);
    }

    handleWeekChange(index: number, hours: number[]) {
        let newHours = this.props.data.hours.slice();
        newHours[index] = hours;
        this.handlePropChange({hours: newHours});
    }

    renderCodeCol() {
        let contents: React.ReactNode;

        if (this.props.data.code) {
            contents = <div>{this.props.data.code.label}<br />{this.props.data.code.code}</div>;
        }

        return <Col sm={2}>{contents}</Col>;
    }

    renderProgramSelector() {
        return (
            <ProgramSelect
                program={this.props.data.program}
                programs={this.props.programs}
                onChange={this.handleOnProgramChange}
            />
        );
    }

    renderProgramName(program: Program) {
        return (
            <div>
                {program.name}
                <Button color='link' size='small' onClick={this.handleRemoveProgram}>remove</Button>
            </div>
        )
    }

    render() {

        let weeks = this.props.data.hours.map((hours, index) => (
            <WeekCol 
                key={index} 
                index={index} 
                hours={hours} 
                onChange={this.handleWeekChange} />
         ))

        return (
            <Row>
                {this.renderCodeCol()}
                <Col sm={2}>
                    {this.props.data.program 
                        ? this.renderProgramName(this.props.data.program) 
                        : this.renderProgramSelector()}
                </Col>
                {weeks}
            </Row>
        );
    }
}


interface WeekColProps {
    index: number;
    hours: number[];
    onChange: (index: number, hours: number[]) => void;
}


class WeekCol extends React.PureComponent<WeekColProps> {

    constructor(props: WeekColProps) {
        super(props);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(hours: number[]) {
        this.props.onChange(this.props.index, hours);
    }

    render() {
        return (
            <Col>
                <Week hours={this.props.hours} onChange={this.handleOnChange} />
            </Col>
        );
    }
}
