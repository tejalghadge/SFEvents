import React,{Component} from 'react'
import {Form, Input, message, Modal, Spin} from "antd";
import axios from "./Event";

class BookModal extends Component{


    constructor(props) {
        super(props);

    }
    bookEvent(){

        this.props.form.validateFields((err, values) => {
            if (!err) {
              this.props.onOk(values)
            }
        });
    }
    render(){
        const {show,onCancel} = this.props;
        const {getFieldDecorator} = this.props.form;
        return <Modal
            title="Book Event"
            visible={show}
            okText={"Book"}
            onOk={this.bookEvent.bind(this)}
            onCancel={()=>{onCancel()}}
        >
            <Spin spinning={this.props.loading} tip="booking">
            <Form>
                <Form.Item label={"Name"}>
                    {getFieldDecorator('Name', {
                        rules: [{ required: true, message: 'please enter your Name' }],
                    })(
                        <Input placeholder={'please enter your name'} style={{width:'100%'}}/>,
                    )}
                </Form.Item>
                    <Form.Item label={"Email"}>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'please enter your email' }],
                    })(
                        <Input type="email" placeholder={"please enter your email"} style={{width:'100%'}}/>,
                    )}
                </Form.Item>
            </Form>
            </Spin>

        </Modal>
    }

}
export default Form.create()(BookModal);