
import * as React from 'react';

import { Input } from 'reactstrap';


export interface DayProps {
    value: number;
    maxValue: number;
    onChange: (value: number) => void;
}

export interface DayState {
    value: string;
    isFocused: boolean;
}

export class Day extends React.PureComponent<DayProps, DayState> {
    
    constructor(props: DayProps) {
        super(props);

        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnBlur = this.handleOnBlur.bind(this);
        this.handleOnFocus = this.handleOnFocus.bind(this);
        
        this.state = {value: "", isFocused: false}
    }

    componentWillReceiveProps(newProps: DayProps) {
        if (!this.state.isFocused) {
            this.setState({value: (newProps.value || "").toString()})
        }
    }

    handleOnChange(event: React.SyntheticEvent<HTMLInputElement>) {
        let stringValue = event.currentTarget.value;
        let numberValue = this.parseAndClamp(stringValue);

        this.setState({value: stringValue});
        if (!isNaN(numberValue)) {
            this.props.onChange(numberValue);
        }
    }

    handleOnFocus(event: React.SyntheticEvent<HTMLInputElement>) {
        event.currentTarget.select();
        this.setState({isFocused: true});
    }

    handleOnBlur(event: React.SyntheticEvent<HTMLInputElement>) {
        this.setState({isFocused: false});
        let value = this.parseAndClamp(this.state.value);
        if (isNaN(value)) {
            this.setState({value: ""});
            this.props.onChange(0);
        } else {
            this.setState({value: (value || "").toString()});
            this.props.onChange(value);
        }
    }

    render() {
        return (
            <Input 
                type='text'
                disabled={this.props.maxValue === 0}
                value={this.state.value}
                onFocus={this.handleOnFocus}
                onBlur={this.handleOnBlur}
                onChange={this.handleOnChange}
            />
        )
    }

    private parseAndClamp(value: string) {
        let num = Number(value);
        return Math.max(0, Math.min(this.props.maxValue, num));
    }
}