import React,{Component} from 'react';
import {Table} from 'antd'
import axios from "axios";
export default class ReportedEvent extends Component{
    constructor(props) {
        super(props);
        this.state={
            events:[]
        }
    }
    componentDidMount() {
        axios.get('/api/reported/event').then(({data})=>{
            this.setState({events:data})
        }).catch((err)=>{
            console.log(err)
        })

    }

    blockEvent(eid){
        axios.put(`/api/block/event/${eid}`).then(()=>{
            let events = this.state.events;
                events = events.field((item)=>{
                    return item.eid !==eid
                })
            this.setState({events})
        }).catch((err)=>{
            console.log(err)
        })
    }
    render(){
        const columns=[
            {title:'Event ID',dataIndex:'eid',align:'center'},
            {title:'Event Title',dataIndex:'title',align:'center'},
            {title:'Host',dataIndex:'host',align:'center'},
            {title:'Reason',dataIndex:'comment',align:'center'},
            {title:'Reported By',dataIndex:'username',align:'center'},
            {title:'Action',align:'center',dataIndex:'action',render:(value,record)=>{
                    return  <div style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
                        <a href={"javascript:void(0)"} onClick={this.blockEvent.bind(this,record.eid)}>Block</a>
                        <a href={"javascript:void(0)"} >Cancel</a>
                    </div>
                }},
        ]
        return (
            <Table columns={columns} dataSource={this.state.events}/>
        )
    }

}