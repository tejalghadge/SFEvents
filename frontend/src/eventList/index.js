import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Layout, Input, Row, Col, Menu, Icon, DatePicker, Button, InputNumber} from 'antd';
import axios from 'axios';
import Event from './Event'

const {Header, Content} = Layout
const Search = Input.Search;
import 'antd/dist/antd.css';
import {HashRouter} from "react-router-dom";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class EventList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            filter: "",
            start_time: null,
            end_time: null,
            price: 0

        }
    }

    componentDidMount() {

        const urlParams = new URLSearchParams(window.location.search);
        const event = urlParams.get('filter');
        this.setState({filter: event});
        axios.get('/api/search?filter=' + event).then(({data}) => {
            this.setState({events: data})

        }).catch((err) => {
            console.log(err)
        })

    }

    onTextChange(e) {
        this.setState({
            filter: e.target.value
        })
    }

    updateEndDate=(date)=>{
        this.setState({end_time: date.format('YYYY-MM-DD')});
    }

    updateStartDate=(date)=>{
        this.setState({start_time: date.format('YYYY-MM-DD')});
    }
    search() {
        window.location.replace('/api/loadSearch?filter=' + this.state.filter)
    }

    sortAsc =() =>{
        let sortedArray = this.state.events.sort((a, b) => a.title.localeCompare(b.title));
        this.setState({events: sortedArray});
        console.log(sortedArray);
    }

    sortDesc=() =>{
        let sortedArray = this.state.events.sort((a, b) => b.title.localeCompare(a.title));
        this.setState({events: sortedArray})
        console.log(sortedArray);
    }

    searchFilter =()=>{

        let filterStr =   '/api/searchFilter?'
        if(this.state.start_time){
            filterStr = filterStr +'start_time='+this.state.start_time
        }

        if(this.state.end_time){
            filterStr = filterStr +'&end_time='+this.state.end_time
        }

        if(this.state.end_time){
            filterStr = filterStr +'&price='+this.state.price
        }

        axios.get(filterStr).then(({data}) => {
            this.setState({events: data})

        }).catch((err) => {
            console.log(err)
        })
    }

    render() {
        const {events} = this.state;
        console.log(this.state.filter)
        return (

            <div style={{margin: 20}}>
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
                        <Menu.Item key="3" style={{float: 'left', width: '70%'}}>
                            <Search value={this.state.filter}
                                    placeholder="Type to Search Event by Name, Description or Location"
                                    onSearch={this.search.bind(this)} onChange={this.onTextChange.bind(this)} />
                        </Menu.Item>
                        {/*<Menu.Item key="4" style={{float: 'left'}} ><a><Icon type="sort-ascending" style={{fontSize: 24}} onChange={this.sortAsc.bind(this)} /></a></Menu.Item>
                        <Menu.Item key="5" style={{float: 'left'}} ><Icon type="sort-descending" style={{fontSize: 24}} onClick={this.sortDesc(this)}/></Menu.Item>*/}

                        <Menu.Item key="6" style={{float: 'right'}}><a href="/login"><b>Login</b></a></Menu.Item>
                        <Menu.Item key="7" style={{float: 'right'}}><a href="/signup"><b>Register</b></a></Menu.Item>
                    </Menu>
                </Header>

                <Layout>
                    <Row gutter={8}>
                        <Col lg={4}>
                            <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="vertical"
                                  style={{width: 256, height: '100%'}}>
                                <MenuItemGroup title="Start Date">
                                <Menu.Item key="startTime">
                                    <DatePicker showTime placeholder="Select Time" format={'MM/DD/YYYY'} showTime={{format:'hh:mm'}} onChange={this.updateStartDate}></DatePicker>
                                </Menu.Item>
                                </MenuItemGroup>
                                <MenuItemGroup title="End Date">
                                <Menu.Item key="endTime">
                                    <DatePicker showTime placeholder="Select Time" format={'MM/DD/YYYY'} showTime={{format:'hh:mm'}} onChange={this.updateEndDate}></DatePicker>
                                </Menu.Item>
                                </MenuItemGroup>
                                <MenuItemGroup title="Price">
                                <Menu.Item key="price">
                                    <InputNumber min={1} max={10000} defaultValue={3} >{this.state.price}
                                    </InputNumber>
                                </Menu.Item>
                                </MenuItemGroup>

                                <MenuItemGroup title="Sort By">
                                    <Menu.Item key="price">
                                        <Icon type="sort-ascending" title='Sort By Ascending' style={{fontSize: 24}} onClick={this.sortAsc} />
                                        <Icon type="sort-descending"  title='Sort By Descending' style={{fontSize: 24, marginLeft: 10}} onClick={this.sortDesc} />
                                    </Menu.Item>
                                </MenuItemGroup>

                                <Menu.Item key="search">
                                    <Button type="primary" style={{marginLeft: 10, width: '200px'}} onClick={this.searchFilter} >
                                        Search
                                    </Button>
                                </Menu.Item>
                            </Menu>
                        </Col>
                        <Col lg={20} md={20}>
                            <Content>
                                <Row gutter={8}>
                                    {events.map((item, i) => {

                                        return <Col style={{marginTop: 20}} lg={6} md={8} xs={12} key={i}> <Event
                                            data={item} key={i}/></Col>
                                    })}
                                    <Event/>
                                </Row>
                            </Content>
                        </Col>
                    </Row>
                </Layout>

            </div>

        )
    }

}

ReactDOM.render(
    <EventList/>,
    document.getElementById('app')
);

module.hot.accept();