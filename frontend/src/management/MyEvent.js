import React,{Component} from 'react';
import {Form, Input, List, InputNumber, message, Upload, Icon, Row, Col, Checkbox, Button,DatePicker,Table} from 'antd';
import axios from 'axios';
const { RangePicker } = DatePicker;
import moment from 'moment';
import LocationMap from './LocationMap';
import Moment from "react-moment";

const google = window.google;

export default class CreateEvent extends Component{
    constructor(props) {
        super(props);
        this.state= {
            eventAction: "Send Invitation",
            data: {},
            isPublic : 'No',
            dataToUpdate: {},
            invitations : []
        }

    }

    sendInvitations =(e) =>{
        e.preventDefault();
        axios.post('/api/sendMail',this.state.dataToUpdate).then((data)=>{
            message.success('Event invitation has been sent successfully.');
        }).catch((err)=>{
            message.success('Fail to send invitation');
            console.log(err)
        })
    }

    componentDidMount() {
        let updateData = this.props.data;
        console.log(updateData);
        if (updateData && Object.keys(updateData).length > 0) {

            axios.get('/api/fetchEventAttending?eid='+updateData.eid).then((result)=>{
                console.log(result);
                this.setState({isPublic: updateData.is_public.data[0] == 1 ? 'Yes' : 'No'});
                this.setState({dataToUpdate: updateData});
                let invitationData = [];
                for(let i in result.data){
                    invitationData.push({mail:  result.data[i].email, isAttending: result.data[i].isAttending.data[0] == 1 ? 'Yes' : 'No'})
                }
                this.setState({invitations: invitationData});
            }).catch((err)=>{
                console.log(err)
            })

        }
    }



    render(){
        const labelStyle ={
            margin: 10,
        }

        const labelStyle1 ={

        }

        const labelStyle2 ={
            textAlign: 'center',
            fontSize : 36
        }

        const col1 ={
           marginLeft: '10%',
           marginRight: '5%' ,
           backgroundColor: 'white',
           border: '1px solid lightgray',
           minHeight: '250px',
            boxShadow: '10px 10px 5px #aaaaaa'
        }

        const col2 ={
            marginLeft: '5%',
            marginRight: '10%' ,
            backgroundColor: 'white',
            minHeight: '250px',
            overflow: 'auto',
            border: '1px solid lightgray',
            boxShadow: '10px 10px 5px #aaaaaa'
        }

        const mapStyle ={
            height: '300px',
            marginRight: '5%',
            marginLeft: '5%',
            marginTop: 20,
            boxShadow: '10px 10px 5px #aaaaaa'

        }
        const columns=[
            {title:'Email',dataIndex:'mail'},
            {title:'Attending',dataIndex:'isAttending',align:'center',render:(attending)=> attending?<Icon type={'check'} style={{color:'green'}}/> :<Icon type={'close'} style={{color:'red'}}/>}

        ]

        return(

            <div>
                <h1 style={labelStyle2} >Invitation</h1>
            <Row>
            </Row>
            <Row>
                <Row>
                <Col span={12}>
                    <div style={col1}>
                            <Col  span={12}>
                                    <b style={labelStyle}>Event:</b>
                            </Col>
                            <Col  span={12}>
                                <label id="title" style={labelStyle1}>{this.state.dataToUpdate.title}</label><br/>
                            </Col>
                            <Col  span={12}>
                                <b style={labelStyle}>Description:</b>
                            </Col>
                            <Col  span={12}>
                                <label  id="description" style={labelStyle1}>{this.state.dataToUpdate.description}</label><br/>
                            </Col>
                            <Col  span={12}>
                                  <b style={labelStyle}>Start On:</b>
                            </Col>
                            <Col  span={12}>
                            <label  id="start_date_time" style={labelStyle1}>
                                <Moment format="YYYY/MM/DD">
                                    {this.state.dataToUpdate.start_time}
                                </Moment>
                                <Moment format="HH:mm">
                                    {this.state.dataToUpdate.start_time}
                                </Moment>
                             </label><br/>
                            </Col>
                        <Col  span={12}>
                            <b style={labelStyle}>End On:</b>
                        </Col>
                        <Col  span={12}>
                        <label  id="start_date_time" style={labelStyle1}>
                            <Moment format="YYYY/MM/DD">
                                {this.state.dataToUpdate.end_time}
                            </Moment>
                            <Moment format="HH:mm">
                                {this.state.dataToUpdate.end_time}
                            </Moment>
                        </label><br/>
                        </Col>
                        <Col  span={12}>
                            <b style={labelStyle}>Public:</b>
                        </Col>
                        <Col  span={12}>
                             <label  id="is_public" style={labelStyle1}>{this.state.isPublic}</label><br/>
                        </Col>
                        <Col  span={12}>
                            <b style={labelStyle}>Maximun Attending:</b>
                        </Col>
                        <Col  span={12}>
                            <label  id="max_attending" style={labelStyle1}>{this.state.dataToUpdate.max_attending}</label><br/>
                        </Col>
                        <Col  span={12}>
                             <b style={labelStyle}>Price:</b>
                        </Col>
                        <Col  span={12}>
                            <label  id="price" style={labelStyle1}>{this.state.dataToUpdate.price}</label><br/>
                        </Col>
                    </div>
                </Col>
                <Col span={12} >
                    <div style={col2}>
                        <div style={{paddingLeft:20}}>{this.state.invitations.filter((i)=>i.isAttending).length} people are attending</div>
                        <Table dataSource={this.state.invitations} columns={columns}/>

                        {/*<List*/}
                        {/*    size="small"*/}
                        {/*    header={<Row><Col  span={20}><b>Invitations</b></Col><Col span={4}><b>Is Attending</b></Col></Row>}*/}
                        {/*    bordered*/}
                        {/*    dataSource={this.state.invitations}*/}
                        {/*    renderItem={item => <List.Item><Col span={20}>{item.mail}</Col><Col span={4}>{item.isAttending}</Col></List.Item>}*/}
                        {/*/>*/}
                        {/* <b style={labelStyle}>Invitations:</b><label  id="invitations" style={labelStyle1}>{this.state.dataToUpdate.invitations}</label>*/}
                    </div>

                </Col>
                </Row>
                <Row  style={mapStyle}>
                    <Col xs={24} sm={24} >
                        <LocationMap id="mapLocation" width={"100%"} height = {"300px"} location={this.state.dataToUpdate.location}/>
                    </Col>
                </Row>
                <Row style={{ marginTop: 50}}>
                <Button id="send" style={{ width: '200px', marginLeft : '45%'}} type="primary"  onClick={this.sendInvitations}>
                {this.state.eventAction}</Button>
                </Row>
            </Row>

            </div>
        );
    }

}
