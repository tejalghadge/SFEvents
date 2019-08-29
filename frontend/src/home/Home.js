import React, {Component} from 'react';
import {Layout, Menu, Row, Col, Card, Form, Input, Icon, DatePicker, Dropdown, Button, Carousel} from 'antd';
import {Link, HashRouter, Route, Switch} from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'

const {Header, Content, Sider, Footer} = Layout;
const Search = Input.Search;

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event: '',
            events: [],
            username: null
        }
    }

    onTextChange(e) {
        this.setState({
            event: e.target.value
        })
    }

    componentDidMount() {
        axios.get('/api/random/events').then(({data}) => {
            this.setState({events: data})
        }).catch((err) => {
            console.log(err)
        })

        axios.get('/profile').then(({data}) => {
            this.state.username = data.username;
        }).catch((err) => {
            console.log(err)
        })
    }

    gotoEventPage(eventID) {
        console.log(eventID)
        window.location.href = `/event?eventID=${eventID}`
    }

    search() {
        window.location.replace('/api/loadSearch?filter=' + this.state.event)
    }

    render() {
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };


        return (

            <HashRouter>
                <Layout className="layout" style={{height: '100vh'}}>
                    <Header>
                        <div className="logo"/>
                        <Menu
                            selectedKeys={["100"]}
                            theme="dark"
                            mode="horizontal"
                            style={{lineHeight: '64px'}}>
                            <Menu.Item key="2" style={{float: 'left', fontSize: 24}}><b><a href="/"
                                                                                           style={{color: 'inherit'}}>SF
                                EVENTS</a></b></Menu.Item>
                            <Menu.Item key="3" style={{width: '70%'}}>

                                <Search style={{width: '100%'}} value={this.state.event}
                                        placeholder="Type to Search Event by Name, Description or Location"
                                        onSearch={this.search.bind(this)} onChange={this.onTextChange.bind(this)}/>
                            </Menu.Item>

                            <Menu.Item>
                                <Dropdown overlay={<Menu>
                                    <Menu.Item id="userNameMenu"><a href={'/api/logout'} onClick={() => {
                                        this.setState({username: null})
                                    }}>Logout</a></Menu.Item>
                                </Menu>}>
                                    <div>
                                        <Icon type="user"/>
                                        <b style={{marginLeft: 5}}>{this.state.username}</b>
                                    </div>
                                </Dropdown>
                            </Menu.Item>
                            {/* <Menu.Item key="4" id ='userNameMenu' style={{float:'right'}} ><b>{this.state.username}</b></Menu.Item>*/}
                            {this.state.username ? null :
                                <Menu.Item key="5" id="login" style={{float: 'right'}}><a href="/login"><b>Login</b></a></Menu.Item>}
                            {this.state.username ? null : <Menu.Item key="6" id="register" style={{float: 'right'}}><a
                                href="/signup"><b>Register</b></a></Menu.Item>}
                        </Menu>
                    </Header>
                    <Layout>
                        <Row>
                            <Col>
                                <Carousel autoplay>
                                    {this.state.events.map((item, i) => {
                                        return <Card
                                            onClick={this.gotoEventPage.bind(this, item.eid)}
                                            hoverable
                                            style={{height: '80vh', width: '100%', margin: 'auto'}}
                                            cover={<img style={{
                                                height: '60vh',
                                                width: '100%',
                                                textAlign: 'center',
                                                objectFit: 'cover'
                                            }} src={item.poster}/>}
                                        >
                                            <Card.Meta title={item.title} description={
                                                <div>
                                                    <div>Location: {item.location}</div>
                                                    <div>{`Time: ${moment(item.start_time).format('MM/DD/YYYY hh:mm a')} - ${moment(item.end_time).format('MM/DD/YYYY hh:mm a')}`}</div>
                                                    <div>Location: {item.location}</div>
                                                </div>
                                            }/>
                                        </Card>

                                    })}
                                </Carousel>
                            </Col>
                            <Col>
                                <Form {...formItemLayout} style={{margin: 20}}>
                                </Form>
                            </Col>
                        </Row>
                        <Footer>
                            <div style={{"text-align": "center"}}>
                                @2019 SFEvents.com <a href="/privacy">privacy Policy</a>
                            </div>
                        </Footer>


                    </Layout>

                </Layout>
            </HashRouter>

        )

    }
}



