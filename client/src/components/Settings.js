import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Setting extends Component {
    render() {
        return (
            <div>
                <Form inline>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  <Label for="email" className="mr-sm-2">Email:</Label>
                  <Input type="email" name="email" id="email" placeholder="user@gmail.com" />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                   <Label for="firstName" className="mr-sm-2">First Name:</Label>
                   <Input type="textarea" name="firstName" id="first" placeholder="Geoffrey" />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="lastName" className="mr-sm-2">Last Name:</Label>
                    <Input type="textarea" name="lastName" id="last" placeholder="User" />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="nickName" className="mr-sm-2">Nick Name:</Label>
                    <Input type="textarea" name="nickName" id="nick" placeholder="Geo, Geoffrey" />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  <Label for="oldPassword" className="mr-sm-2">Old Password:</Label>
                  <Input type="password" name="password" id="oldPassword" placeholder="********" />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  <Label for="newPassword" className="mr-sm-2">New Password:</Label>
                  <Input type="password" name="password" id="newPassword" placeholder="********" />
                </FormGroup>
                <Button>Submit</Button>
            </Form>  
            </div>
        );
    }
}

export default Setting;