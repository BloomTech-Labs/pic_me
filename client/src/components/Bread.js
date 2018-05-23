import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

class Bread extends Component {
    render() {
        return (
            <div>
                <Breadcrumb tag="nav">
                    <BreadcrumbItem tag="a" href="/">Home</BreadcrumbItem>
                    <BreadcrumbItem active tag="span" href="/settings">Settings</BreadcrumbItem>
                </Breadcrumb>
            </div>
        );
    }
}

export default Bread;