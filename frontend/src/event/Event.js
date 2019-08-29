import './Event.css';
import React,{Component} from 'react';
import {Layout,Menu,Icon,Button, Card, message, Input,Modal,Form,Spin} from "antd";
import {Link,HashRouter,Route,Switch} from 'react-router-dom'
import LocationMap from '../management/LocationMap';
import axios from 'axios';
import moment from "moment";
import BookModal from './BookModal'
const {Header,Content,Sider,Footer} = Layout;
const { Meta } = Card;
const Search = Input.Search;

 class EventInfo extends Component {
  constructor(props) {
    super(props);
    this.state={
      eventData : {},
        attendeeCount:0,
      visible:false,
        showBookModal:false,
        loading:false
    }
  }

  onTextChange(e){
    this.setState({
      event:e.target.value
    })
  }
  search(){
    window.location.replace('/api/loadSearch?filter='+this.state.event)
  }

  populateEvent= () =>{
    const urlParams = new URLSearchParams(window.location.search);
    const eventID = urlParams.get('eventID');
    if(eventID){
      axios.get('/api/fetchEvent?eventID='+eventID).then((result)=>{
        this.setState({eventData: result.data[0]});
      }).catch((err)=>{
        console.log(err)
      })
        axios.get(`/api/fetchEventAttending?eid=${eventID}`).then(({data})=>{
            this.setState({attendeeCount: data.filter((i)=>i.isAttending.data[0]=== 1).length});
        }).catch((err)=>{
            console.log(err)
        })
    }
  }

  reportEvent=() =>{

    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios.put(`/api/report/event/${this.state.eventData.eid}`,values).then(()=>{
          message.success('Event reported successfully');
          this.setState({visible:false})
        }).catch((err)=>{
          console.log(err)
        })
      }
    });

    }
    showModal(){
      this.setState({visible:true})
    }
    componentWillMount() {
      this.populateEvent();
    }
     showBookModal(){
        this.setState({showBookModal:true})
     }
     bookEvent(data){
      this.setState({loading:true})
      axios.post(`/api/book/${this.state.eventData.eid}`,data).then(()=>{
            message.success("event booked")
          this.setState({showBookModal:false,loading:false})
      }).catch((err)=>{
          console.log(err)
      })
     }
    render() {
    const {getFieldDecorator} = this.props.form;
      console.log('event',this.state.eventData)
      return (

        <HashRouter>
        <Menu
        theme="dark"
        mode="horizontal"
        style={{ lineHeight: '64px' }}>
        <Menu.Item key="2" style={{float:'left', fontSize: 24}}><b><a href="/" style={{color: 'inherit'}}>SF EVENTS</a></b></Menu.Item>
      {/*  <Menu.Item key="3" style={{float:'left', width:'70%'}}>
          <Search value={this.state.event} placeholder="Type to Search Event by Name, Description or Location" onSearch={this.search.bind(this)} onChange={this.onTextChange.bind(this)}/>
        </Menu.Item>*/}
        <Menu.Item key="4" style={{float:'right'}}><a href="/login"><b>Login</b></a></Menu.Item>
        <Menu.Item key="5" style={{float:'right'}}><a href="/signup"><b>Register</b></a></Menu.Item>
        <Menu.Item key="6" style={{float:'right'}} onClick={this.showModal.bind(this)}><b>Report</b></Menu.Item>
        <Menu.Item key="7" style={{float:'right'}} onClick={this.showBookModal.bind(this)}><b>Book</b></Menu.Item>

        </Menu>

        <Layout>
        <Layout>
        <Content >
        <div style={{marginBottom:50}}>
          <h1 style={{textAlign:'center',fontSize:40}}>{this.state.eventData.title}</h1>
       <div style={{backgroundImage:`url(${this.state.eventData.poster})`,  backgroundRepeat:'no-repeat',backgroundSize: '100%',
          backgroundPosition: 'center center',width:'100vw',height:'30vh', }}/>
        </div>
        <div>
        <div style={{
          width:'45%',
          borderStyle: 'solid',
          borderWidth: '1px',
          marginBottom: 48,
          marginLeft: 48,
          backgroundColor:'#FFFFFF',
          minHeight: 360,
          borderColor: '#a6a7a8',
          float: 'left'
        }}>
        <LocationMap width={"45%"} height = {"360px"} location={this.state.eventData.location}/>
        </div>
        <div style={{
          width:'45%',
          borderStyle: 'solid',
          borderWidth: '1px',
          marginBottom: 16,
          marginRight: 48,
          backgroundColor:'#FFFFFF',
          minHeight: 32,
          borderColor: '#a6a7a8',
          float: 'right'
        }}>
        <b style={{marginLeft: 24}}>People attending:</b> {this.state.attendeeCount} people are attending this event<br/>
        </div>
        </div>
        <div style={{
          width:'45%',
          borderStyle: 'solid',
          borderWidth: '1px',
          marginBottom: 48,
          marginRight: 48,
          backgroundColor:'#FFFFFF',
          minHeight: 312,
          borderColor: '#a6a7a8',
          float: 'right'
        }}>
        <div style={{marginLeft: 24, marginRight: 24}}><b>Description: </b>  {this.state.eventData.description}</div>
        <div style={{marginLeft: 24, marginRight: 24}}><b>Date: </b> {moment(this.state.eventData.start_time).format('MM/DD/YYYY')}</div>
        <div style={{marginLeft: 24, marginRight: 24}}><b>Start Time:</b> {moment(this.state.eventData.start_time).format('hh:mm a')} </div>
        <div style={{marginLeft: 24, marginRight: 24}}><b>End Time: </b> {moment(this.state.eventData.end_time).format('hh:mm a')} </div>
        <div style={{marginLeft: 24, marginRight: 24}}><b>Price: </b> {this.state.eventData.price} </div>

        </div>


          <Modal
              title="Report Event"
              visible={this.state.visible}
              okText={"Report"}
              onOk={this.reportEvent.bind(this)}
              onCancel={()=>{this.setState({visible:false})}}
          >
            <Form>
              <Form.Item label={"Reason"}>
                {getFieldDecorator('reason', {
                  rules: [{ required: true, message: 'Please tell us why are want to report this event' }],

                })(
                    <Input.TextArea rows={5} placeholder={"please tell us why you want to report this event"} style={{width:'100%'}}/>,
                )}
              </Form.Item>
            </Form>

          </Modal>

        <BookModal loading={this.state.loading} show={this.state.showBookModal} onOk={this.bookEvent.bind(this)} onCancel={()=>{this.setState({showBookModal:false})}}/>
        </Content>
        <Footer style={{textAlign: 'center'}}>
        @2019 SFEvents.com <a href="/privacy">privacy Policy</a>
        </Footer>
        </Layout>
        </Layout>
        </HashRouter>

        )
      }
    }

export default Form.create()(EventInfo);