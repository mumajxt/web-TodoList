import React, { Component } from 'react'
import './index.css'
import {Button, Checkbox, DatePicker, Input} from "antd";
import moment from "moment";

export default class Item extends Component {

	state={
		isUpdateMode:false,
		name:'',
		deadline:moment()
	}
	//勾选、取消勾选某一个todo的回调
	handleCheck = (event)=>{
		console.log(this,this.props);
		this.props.finishTodo(this.props.id,event.target.checked);
	}

	//准备删除一个todo的回调
	handleToDelete = ()=>{
		if(window.confirm('确定删除吗？')){
			this.props.deleteTodo(this.props.id)
		}
	}
	handleToUpdate = ()=>{
		const {name,deadline} = this.props;
		this.setState({isUpdateMode:true,name,deadline:moment(deadline)});
	}
	handleSave=()=>{

	}


	render() {
		const {name,deadline,isFinished} = this.props;
		const {isUpdateMode,deadline:stateDeadline,name:stateName} = this.state;
		return (
			//{
				isUpdateMode ?
				<li>
					<Input value={stateName} onChange={this.handleChange} type="text" placeholder="请输入你的任务名称"/>
					<DatePicker showTime value={stateDeadline} placeholder="截止时间"/>
					<Button onClick={()=>this.setState({isUpdateMode: false})}>取消</Button>
					<Button type="primary" onClick={this.handleSave}>保存</Button>
				</li>
				:
				<li>
					<p>
						<Checkbox checked={isFinished} onChange={this.handleCheck}/>
						<span>{name}</span>
					</p>
					<small>截止日期：{deadline}</small>
					<Button type="primary" onClick={this.handleToUpdate}>修改</Button>
					<Button type="danger" onClick={this.handleToDelete}>删除</Button>
				</li>
			//}

		)
	}
}