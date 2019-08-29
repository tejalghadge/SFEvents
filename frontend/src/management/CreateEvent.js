import React,{Component} from 'react';
import {Form, Input, InputNumber, message, Upload, Icon, Row, Col, Checkbox, Button,DatePicker} from 'antd';
import axios from 'axios';
const { RangePicker } = DatePicker;
import moment from 'moment';

let posterpath = null;
const props = {
    name: 'file',
    action: '/api/poster',
    headers: {
        authorization: 'authorization-text',
    },
    multiple: false,
    onChange(info) {

        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
           posterpath = info.file.response
           message.success('Poster uploaded successfully');
        } else if (info.status === 'error') {
            message.error(`${info.name} file upload failed.`);
        }
    },
};


class CreateEvent extends Component{
    constructor(props) {
        super(props);
        this.state= {
            eventAction: "Create",
            data: {},
            isPublic : false,
            dataToUpdate: null,
            username:null
        }

    }



    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.poster = posterpath;

                let search = window.location.search;

                let params = search.substring(1).split("&").reduce(function(result, value) {
                    var parts = value.split('=');
                    if (parts[0]) result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
                    return result;
                }, {});

                let userName = params.username
                values.hostName =userName;


                if(this.state.eventAction == "Create"){
                    axios.post('/api/insertEvent',values).then((data)=>{
                        //  this.props.form.resetFields();
                        var list = document.getElementsByClassName("ant-upload-list-item");
                        if( list[0])
                            list[0].parentNode.remove(list[0]);
                        message.success('Event created successfully.');
                        this.props.populateEvents();
                    }).catch((err)=>{
                        console.log(err)
                    })
                }else{
                    values.eid = this.state.dataToUpdate.eid;
                    values.hostName = this.state.username;
                    axios.post('/api/updateEvent',values).then((data)=>{
                        this.props.form.resetFields();
                        var list = document.getElementsByClassName("ant-upload-list-item");
                        if(list[0])
                             list[0].parentNode.remove(list[0]);
                        message.success('Event updated successfully.');

                    }).catch((err)=>{
                        console.log(err)
                    })

                }

            }
        });

    };

    handleEdit = (updateData) => {


    }

    componentDidMount(){
        let updateData = this.props.data;
        console.log(updateData);
        if(updateData && Object.keys(updateData).length > 0){

            this.handleEdit(updateData);
            this.props.form.setFieldsValue(
                updateData);

            this.setState({isPublic: updateData.is_public.data[0] == 1 ? true : false});
            this.setState({eventAction: "Update"});
            this.setState({dataToUpdate: updateData});
            this.setState({username: this.props.username});
            this.props.form.setFieldsValue({date_time: [
                    moment(updateData.start_time),
                    moment (updateData.end_time)
                ]});

        }
    }
    deleteEvent(){
        this.props.deleteEvent(this.props.data.eid)

    }

    render(){

        const { getFieldDecorator } = this.props.form;
        const { TextArea } = Input;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span:  6},
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18},
            },
        };

        const pickerStyle={
            width: '100%',
        }

        return(


        <Form {...formItemLayout} layout="block" style={{margin: 20,'margin-left':'15%', 'margin-right':'-5%',float: 'center'}}   onSubmit={this.handleSubmit}>

                <Form.Item>
                    {getFieldDecorator('title', {
                        rules: [{ required: true, message: 'Enter an event title.' }],
                    })(
                    <Input name="title" prefix={<Icon type="read" style={{ color: 'rgba(0,0,0,.25)' }} />}  placeholder="Title" />
                    )}
                </Form.Item>

                <Form.Item>
                    {getFieldDecorator('description', {
                        rules: [{ required: true, message: 'Enter a description of an event.' }],
                    })(
                        <TextArea name="description" rows="8" placeholder="Description" style={pickerStyle}/>
                    )}
                </Form.Item>

                <Form.Item>
                    {getFieldDecorator('location', {
                        rules: [{ required: true, message: 'Enter location.' }],
                    })(
                        <Input name="location" placeholder="Location" style={pickerStyle}/>
                    )}
                </Form.Item>

                <Form.Item >
                    {getFieldDecorator('date_time', {
                        rules: [{ required: true, message: 'Enter event date time.' }],
                    })(
                      <RangePicker format={'MM/DD/YYYY hh:mm a'} showTime={{format:'hh:mm'}} style={pickerStyle} required/>
                    )}
                </Form.Item>

                <Form.Item>
                    {getFieldDecorator('invitations', {
                        rules: [{ required: true, message: 'Enter email address(s) of attendees.' }],
                    })(
                        <Input prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />} placeholder="Invitation" />
                    )}
                </Form.Item>

                <Row>

                    <Col sm={4}>
                        <Form.Item
                            label={'Is public'}
                        >
                            {getFieldDecorator('is_public', {

                            })(
                                <Checkbox style={{"margin-left": 10}} checked={this.state.isPublic} onChange={(e) => {this.setState({isPublic: e.target.value})}}/>
                            )}

                        </Form.Item>
                    </Col>

                    <Col sm={10}>
                <Form.Item
                    label={'Maximum Attending: '}>
                    {getFieldDecorator('max_attending', {
                        initialValue: [50]

                    })(
                        <InputNumber  defaultValue={50} min={1} max={1000}  style={{margin: 10, width:'230px'}} placeholder="Attendees"/>
                    )}

                </Form.Item>
                    </Col>

                    <Col sm={10}>
                <Form.Item
                    label={'Price: '}  style={{float: "left", "margin-left": '-100px'}}>
                    {getFieldDecorator('price', {
                        initialValue: [50]

                    })(
                        <InputNumber  min={1} max={1000}  style={{margin: 10, width:'230px'}} placeholder="Price"/>
                    )}

                </Form.Item>
                    </Col>
                </Row>


                <Form.Item>
                    <Upload {...props}>
                        <Button >
                            <Icon type="upload" /> Click to Upload Event Poster
                        </Button>
                    </Upload>
                </Form.Item>

                <Form.Item >

                    <Button style={{float: 'right',width:'200px'}}
                        type="primary"
                        htmlType="submit">
                          {this.state.eventAction}
                    </Button>
                    {this.state.eventAction ==='Update'? <Button onClick={this.deleteEvent.bind(this)}type="danger">Delete Event</Button>:null}
                </Form.Item>
            </Form>


        );
    }

}

export default Form.create({ name: 'createEvent' })(CreateEvent)