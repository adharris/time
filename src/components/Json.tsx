
import * as React from 'react';


export interface JsonProps {
    children: object;
}

export class Json extends React.PureComponent<JsonProps> {

    render() {
        return <pre>{JSON.stringify(this.props.children, null, 2)}</pre>;
    }

}