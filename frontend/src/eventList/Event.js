import React,{Component} from 'react';
import { Card, Icon, Avatar ,Menu} from 'antd';
const { Meta } = Card;
import Moment from 'react-moment';
import {Link,HashRouter,Route,Switch} from "react-router-dom";
import EventComp from "../event/Event";


export default class Event extends Component{
    constructor(props) {
        super(props);
        this.state={
           eid : 0
        }
    }

    handleClick = () =>{
        window.location.replace('/event?eventID='+this.state.eid);
    }


    viewEvent = () =>{
        window.location.replace('/event?eventID='+this.state.eid);
    }
    render(){
        const {data} = this.props;
        if(data){
            this.state.eid = data.eid;
           // https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            return (
                <HashRouter>


                <Card
                    onClick={this.viewEvent}
                    style={{height:450,marginBottom:20}}
                    hoverable
                        cover={<img alt="example" src={data.poster} style={{maxHeight: '200px'}}/>}
                >
                        <Meta
                            title={data.title}
                            description={<div style={{maxHeight: '4.5em',lineHeight: '1.5em'}}>{data.description}</div>}
                        />
                        <div>
                            Date: <Moment format="MM/DD/YYYY">
                            {data.start_time}
                             </Moment>
                        </div>
                        <div>
                            Start Time: <Moment format="hh:mm a">
                            {data.start_time}
                        </Moment>
                        </div>
                        <div>
                            End Time: <Moment format="hh:mm a">
                            {data.end_time}
                        </Moment>
                        </div>

                        <div>
                            Location: {data.location}
                        </div>
                        <div>
                            Public: {data.is_public ? 'YES':'NO'}
                        </div>
                        <div>
                            Price: {data.price}
                        </div>
                        <div>
                            Max Attendees: {data.maxAttending}
                        </div>

                    </Card>
                </HashRouter>
            )
        }else {
            return null
        }
        }


}