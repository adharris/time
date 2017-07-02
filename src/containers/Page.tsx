import * as React from 'react';

import {Container, Jumbotron } from 'reactstrap';

export interface PageProps {
    title: string;
    children: React.ReactNode;
}

interface PageState {

}

export class Page extends React.PureComponent<PageProps, PageState> {

    constructor(props: PageProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <Jumbotron fluid={true}>
                    <Container>
                        <h1 className="display-4">{this.props.title}</h1>
                    </Container>
                </Jumbotron>
                <Container>{this.props.children}</Container>
            </div>
        );
    }

}