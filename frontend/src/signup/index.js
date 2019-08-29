import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import axios from 'axios';

import {
    Form, Icon, Input, Button, Checkbox,Row,Col
} from 'antd';

class NormalLoginForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (values.password === values.confirmPassword) {
                    axios.post('/api/signup', values).then(({data}) => {
                        this.props.form.resetFields();
                        alert('you have successfully signed up , please go to login page to login ')

                    }).catch((err) => {
                        console.log(err);
                    })
                } else {
                    alert('Password does not match')
                }
            }
        })

    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Row style={{marginTop:'5%'}}>
                <center><img src="http://www.freedomhouse.ca/wp-content/uploads/Register-Icon.png" id="icon" alt="" width="200" height="200" /></center>
                <h1 style={{textAlign: 'center'}}><font size="+10">Register</font></h1>
                <Col lg={8} offset={8}>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'username can not be empty!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('email', {
                                rules: [{ required: true, message: 'Email can not be empty!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Password can not be empty!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('confirmPassword', {
                                rules: [{ required: true, message: 'Password can not be empty!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Confirm Password" />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('privacy', {
                                rules: [{ required: true, message: 'You must agree the privacy policies in order to register' }],
                            })(
                                <div>
                                    <Input type="checkbox" name="policy" value="policy"/> By registering , you agree to teh SFEVENTS.com <a href={'/privacy'}>Privacy policies </a>
                                </div>
                            )}
                        </Form.Item>
                        <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
                            <Button type="primary" htmlType="submit" style={{width:'100%'}}className="login-form-button">
                               Register
                            </Button>
                        </div>
                        <div style={{textAlign:'center',marginTop:15}}>
                            Already have an account ?  <a href="/login">login now!</a>
                        </div>
                    </Form>
                </Col>
            </Row>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

ReactDOM.render(
    <WrappedNormalLoginForm/>,
    document.getElementById('app')
);

module.hot.accept();