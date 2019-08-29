import React,{Component} from 'react';
import {Layout, Menu, Icon, Dropdown} from "antd";
import {Link,HashRouter,Route,Switch} from 'react-router-dom'
import ReportedUser from './ReportedUser'
import ReportedEvent from './ReportedEvent'
const {Header,Content,Sider,Footer} = Layout;

export default class Admin extends Component{
    constructor(props) {
        super(props);
        this.state={

        }
    }
    render(){
        return (
            <HashRouter>
                    <Layout style={{ minHeight: '100vh' }}>
                        <Sider
                            style={{zIndex:10000}}
                            breakpoint="lg"
                            collapsedWidth="0"
                            onBreakpoint={(broken) => { console.log(broken); }}
                            onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
                        >
                            <div className="logo" >
                            </div>
                            <Menu onClick={()=>{}} mode="vertical" theme={'dark'}>
                                <Menu.Item key={'reportedUsers'} >
                                    <Link to={'/admin/report/users'}>
                                        <Icon type="user" />
                                        <span>Reported Users</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key={'reportedEvents'} >
                                    <Link to={'/admin/report/events'}>
                                        <Icon type="form" />
                                        <span>Reported Events</span>
                                    </Link>
                                </Menu.Item>
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
                                            <b style ={{marginLeft: 5}}>admin</b>
                                        </div>
                                    </Dropdown>

                                </div>
                                <a href="/" style={{color: "inherit"}}>
                                    <b style={{fontSize: 24, color : "#122335"}}>SF EVENTS</b>
                                </a>

                            </Header>
                            <Content >
                                <div>
                                    <Switch>
                                        <Route exact path={'/admin/report/users'} component={ReportedUser}/>
                                        <Route exact path={'/admin/report/events'} component={ReportedEvent}/>
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