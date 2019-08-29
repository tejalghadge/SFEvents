import React,{Component} from 'react';

import {Layout,Menu,Icon,Row, Col,Dropdown,message} from "antd";
import {Link,HashRouter,Route,Switch} from 'react-router-dom';
import axios from 'axios';
import CreateEvent from './CreateEvent'
import MyEvent from './MyEvent'
const {Header,Content,Footer,Sider} = Layout;
const SubMenu = Menu.SubMenu;

/**
 * This class creates new event react component
 */
export default class Event extends Component{
    constructor(props) {
        super(props);
        this.state={
            myEvents : [],
            editEventData: {},
            username: null,
            userid: null
        };
        this.searchToObject();
    }


    /**
     * This function populates events for the user
     */
    populateEventsForUser = () =>{

            axios.get('/api/selectEventsByUser?user_id='+this.state.userid).then((result)=>{  //TODO integration with logged in user
                let events =[];
                Object.keys(result.data).forEach(function(key) {
                    events.push(result.data[key]);
                });
                this.setState({myEvents: events});
            }).catch((err)=>{
                console.log(err)
            })

    };

    /**
     * This function allows to update the already created event,
     * The result is updated on component's state.
     * @param e
     */
    editEvent = (e) =>{
        let eventID = e.target.closest("div").id;
        if(eventID == "")
            eventID =  e.target.closest("i").id;

        axios.get('/api/fetchEvent?eventID='+eventID).then((result)=>{
            this.setState({editEventData: result.data[0]});
        }).catch((err)=>{
            console.log(err)
        })
    };

     searchToObject =() =>{
         let search = window.location.search;
         let params = search.substring(1).split("&").reduce(function(result, value) {
            var parts = value.split('=');
            if (parts[0]) result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
            return result;
        }, {});

         this.state.username = params.username;
         this.state.userid = params.user_id;
         this.populateEventsForUser();
    }
    deleteEvent(eid){
         console.log(eid)
        axios.delete(`/api/event/${eid}`).then(()=>{
            message.error('Event has been deleted.');
            this.setState({myEvents:this.state.myEvents.filter((e)=>e.eid !== eid )})
        }).catch((err)=>{
            console.log(err)
        })
    }
    /**
     * renders Event component
     * @returns {*} component layout
     */
    render(){
         return (
                <HashRouter>
                    <Layout style={{minHeight: '100vh'}}>
                        <Sider
                            style={{zIndex: 10000}}
                            breakpoint="lg"
                            collapsedWidth="0"
                            onBreakpoint={(broken) => {
                                console.log(broken);
                            }}
                            onCollapse={(collapsed, type) => {
                                console.log(collapsed, type);
                            }}
                        >
                            <div className="logo">
                            </div>
                            <Menu onClick={() => {
                            }} mode="inline" theme={'dark'} defaultOpenKeys={['sub1']} defaultSelectedKeys={['menu1']}>
                                <Menu.Item key="menu1">
                                    <Link to={'/management/createevent'}>
                                        <Icon type="plus"/>
                                        <span>New Event</span>
                                    </Link>
                                </Menu.Item>

                                <SubMenu key="sub1" title={<span><Icon type="switcher"/><span>My Events</span></span>}>
                                    {this.state.myEvents.map((myevent, index) =>
                                        <Menu.Item key={index} >
                                            <Row >
                                                <Col sm={20} id={myevent.eid} onClick={this.editEvent}>
                                                    <Link to={'/management/myevent'}  style={{display : 'block'}}>
                                                        <span title={myevent.title} style={{color: 'white', 'text-overflow': 'ellipsis', display : 'block', overflow : 'hidden'}} >{myevent.title}</span>
                                                    </Link>
                                                </Col>
                                                <Col sm={4}>
                                                    <Link to={'/management/updateevent'}>
                                                        <span><Icon id={myevent.eid} type="edit" style={{color: 'white'}} onClick={this.editEvent}/></span>
                                                    </Link>
                                                </Col>
                                            </Row>
                                        </Menu.Item>
                                    )}
                                </SubMenu>


                            </Menu>
                        </Sider>

                        <Layout>
                             <Header style={{background: '#fff',boxShadow: '3px 3px 5px 6px #ccc'}}>

                                 <div style={{float: 'right'}} >
                                     <Dropdown overlay={<Menu>
                                         <Menu.Item><a href={'/api/logout'}>Logout</a></Menu.Item>
                                     </Menu>}>
                                        <div>
                                            <Icon type="user" style={{fontSize: '30px'}}/>
                                            <b style ={{marginLeft: 5}}>{this.state.username}</b>
                                        </div>
                                     </Dropdown>

                                 </div>
                                 <a href="/" style={{color: "inherit"}}>
                                     <b style={{fontSize: 24, color : "#122335"}}>SF EVENTS</b>
                                 </a>

                             </Header>
                            <Content>
                                <div>
                                    <Switch>
                                        <Route exact path={'/management/createevent'} component={() => <CreateEvent populateEvents = {this.populateEventsForUser}/>}/>
                                        <Route exact path={'/management/updateevent'} component={() => <CreateEvent data={this.state.editEventData}  deleteEvent={this.deleteEvent.bind(this)}/>}/>
                                        <Route exact path={'/management/myevent'} component={() => <MyEvent data={this.state.editEventData} />} />
                                    </Switch>

                                </div>
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