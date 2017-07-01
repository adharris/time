
import * as React from 'react';
import { Day } from './Day';
import { Row, Col, InputGroup } from 'reactstrap';

import { doNTimes } from '../util'

export interface WeekProps {
    hours: number[];
    onChange: (hours: number[]) => void;
}


export class Week extends React.PureComponent<WeekProps> {

    handlers: ((value: number) => void)[];
    
    constructor(props: WeekProps) {
        super(props);
        this.handlers = doNTimes(7, i => this.makeHandler(i));
    }

    handleOnChange(index: number, value: number) {
        let hours = this.props.hours.slice();
        hours[index] = value;
        this.props.onChange(hours);
    }

    renderDay(index: number) {
        return (
            <Day
                key={index}
                maxValue={index < 2 ? 0 : 16}
                value={this.props.hours[index]}
                onChange={this.handlers[index]} 
            />
        )
    }

    render() {
        let days = doNTimes(7, i => this.renderDay(i));
        return <InputGroup>{days}</InputGroup>;
    }

    private makeHandler(index: number) {
        return (value: number) => this.handleOnChange(index, value);
    }
}
