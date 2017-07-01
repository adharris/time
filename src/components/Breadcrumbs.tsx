
import * as React from 'react';


class Breadcrumbs extends React.PureComponent {
  render() {
    <ul className="breadcrumbs">
     {this.props.router.components.map(item => {<li>{item.getBreadcrumb()}</li>})}
    </ul>
  }
}