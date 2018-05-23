import React, { Component } from "react";
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Settings extends Component {
    render() {
        return (
            <div>
                <Form>
                <FormGroup row>
                    <Label for="email" sm={2}>Email:</Label>
                    <Col sm={10}>
                        <Input type="email" name="email" id="email" placeholder="user@gmail.com" />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="firstName" sm={2}>First Name:</Label>
                    <Col sm={10}>
                        <Input type="text" name="firstName" id="first" placeholder="Geoffrey" />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="lastName" sm={2}>Last Name:</Label>
                    <Col sm={10}>
                        <Input type="text" name="lastName" id="last" placeholder="User" />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="nickName" sm={2}>Nick Name:</Label>
                    <Col sm={10}>
                        <Input type="text" name="nickName" id="nick" placeholder="Geo, Geoffrey" />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="oldPassword" sm={2}>Old Password:</Label>
                    <Col sm={10}>
                        <Input type="password" name="password" id="oldPassword" placeholder="********" />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="newPassword" sm={2}>New Password:</Label>
                    <Col sm={10}>
                        <Input type="password" name="password" id="newPassword" placeholder="********" />
                    </Col>
                </FormGroup>
                <Button>Submit</Button>
            </Form>  
            </div>
        );
    }
}

export default Settings;