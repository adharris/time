
import * as React from 'react';

import { Program } from '../data/programs';
import styled from 'styled-components'; 

import { Typeahead, Menu } from 'react-bootstrap-typeahead';

export interface ProgramSelectProps {
    program: Program | undefined;
    programs: Program[];
    onChange: (program: Program | undefined) => void;
}

interface ProgramSelectState { }

export class ProgramSelect extends React.PureComponent<ProgramSelectProps, ProgramSelectState> {

    constructor() {
        super();
        this.handleOnChange = this.handleOnChange.bind(this);
        this.state = {};
    }

    handleOnChange(programs: Program[]) {
        if (programs && programs.length > 0) {
            this.props.onChange(programs[0]);
        } else {
            this.props.onChange(undefined);
        }
    }

    renderMenuItem(program: Program) {
        return (
            <SelectItem>
                <Id className="text-muted">#{program.id}</Id>
                <Name>{program.name}</Name>
                <City>{program.city}, {program.state}</City>
            </SelectItem>
        );
    }

    render() {
            
        return (
            <Typeahead
                labelKey="name"
                selected={[this.props.program]}
                onChange={this.handleOnChange}
                options={this.props.programs}
                renderMenuItemChildren={this.renderMenuItem}
            />
        );
    }
}

const SelectItem = styled.div`
`;

const Item = styled.span`
`;

const Id = styled(Item)`
    font-size: .8em;
    margin-right: 6px;
`;

const Name = styled(Item)`
    flex: 1;
    font-size: 1.2em;
`;

const City = styled(Item)`
    float:right;
`;