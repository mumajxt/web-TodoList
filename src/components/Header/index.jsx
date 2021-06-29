import React, { Component } from 'react'
import {nanoid} from 'nanoid'
import './index.css'
import {Button, DatePicker, Input} from "antd";
import moment from "moment";

export default class Header extends Component {
	state={
		name:'',
		deadline:moment()
	}
	handleChange=(event)=>{
		this.setState({name:event.target.value});
	}
	addTodo=()=>{
		const {name,deadline}=this.state;
		if(name === ''){
			alert('输入不能为空')
			return
		}
		//准备好一个todo对象
		const todoObj = {id:nanoid(),name,deadline:deadline.format('YYYY-MM-DD HH:mm:ss'),isFinished:false,isDeleted:false}
		//将todoObj传递给App
		this.props.addTodo(todoObj)
		//清空输入
		this.setState()
	}
	render() {
		const {name,deadline} = this.state;
		return (
			<div className="todo-header">
				<Input value={name} onChange={this.handleChange} type="text" placeholder="请输入你的任务名称"/>
				<DatePicker showTime value={deadline} placeholder="截止时间"/>
				<Button type="primary" onClick={this.addTodo}>添加</Button>
			</div>
		)
	}
}