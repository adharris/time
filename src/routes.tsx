import * as React from 'react'
import { Route } from 'react-router'

import { Menu } from './components';
import { Timesheet, StaffPage, StaffView } from './containers';


export const Routes = () => (
    <div>
        <Route component={Menu} />
        <Route exact path='/' component={Timesheet} />
        <Route exact path='/staff' component={StaffPage} />
        <Route path='/staff/:id' component={StaffView} />
    </div>
)
