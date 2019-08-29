import React,{Component} from 'react';
import {Table} from 'antd'
import axios from 'axios'
export default class ReportedUser extends Component{
    constructor(props) {
        super(props);
        this.state={
                users:[]
        }
    }
    componentDidMount() {
        axios.get('/api/reported/user').then(({data})=>{
            console.log(data)
            this.setState({users:data})
        }).catch((err)=>{
            console.log(err)
        })

    }
    blockUser(uid){
        axios.put(`/api/block/user/${uid}`).then(()=>{
                let users = this.state.users;
                users = users.filter((item)=>{
                    return item.user_id !== uid
                })
            this.setState({users})
        }).catch((err)=>{
            console.log(err)
        })
    }
    render(){
        const columns=[
            {title:'User ID',dataIndex:'user_id',align:'center'},
            {title:'Username',dataIndex:'username',align:'center'},
            {title:'Reason',dataIndex:'reason'},
            {title:'Reported By',dataIndex:'reportedBy',align:'center'},
            {title:'Action',dataIndex:'action',align:'center',render:(value,record)=>{
                    return  <div style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
                        <a href={"javascript:void(0)"} onClick={this.blockUser.bind(this,record.user_id)}>Block</a>
                        <a href={"javascript:void(0)"} >Cancel</a>
                    </div>
                }},
        ]
        return (
            <Table columns={columns} rowKey={'user_id'} dataSource={this.state.users}/>
        )
    }

}