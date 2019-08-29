import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import axios from 'axios'
import {
    Form, Icon, Input, Button, Checkbox,Row,Col
} from 'antd';

class NormalLoginForm extends React.Component {

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
           <Row style={{marginTop:'5%'}}>
                <center><img src="http://lms.iukl.edu.my/images/icons/register_icon.png" id="icon" alt="" width="200" height="200" /></center>
                <h1 style={{textAlign: 'center'}}><font size="+10">Login</font></h1>
               <Col lg={8} offset={8}>
                   <form action="/api/login" method="post">
                           <Form.Item>
                               {getFieldDecorator('username', {
                                   rules: [{ required: true, message: 'Email can not be empty!' }],
                               })(
                                   <Input name={'username'} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                               )}
                           </Form.Item>
                           <Form.Item>
                               {getFieldDecorator('password', {
                                   rules: [{ required: true, message: 'Password can not be empty!' }],
                               })(
                                   <Input name={'password'} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                               )}
                           </Form.Item>
                           <div style={{textAlign:'center',marginTop:10,marginBottom:20}}>
                               <Button type="primary" htmlType="submit" style={{width:'100%'}}className="login-form-button">
                                   Log in
                               </Button>
                           </div>
                           <div style={{textAlign:'center'}}>
                               <a className="login-form-forgot" href="/password/recovery">Forgot password</a>
                           </div>
                           <div style={{textAlign:'center',marginTop:15}}>
                               Don't have an account ?  <a href="/signup">register now!</a>
                           </div>
                   </form>

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