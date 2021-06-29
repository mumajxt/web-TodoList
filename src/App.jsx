import React, { Component } from 'react'
import Header from './components/Header'
import List from './components/List'
import './App.css'
import type from './js/type'
import moment from 'moment';



export default class App extends Component {
	state={todos:[],logs:[]}
	componentDidMount() {
		const todosString = window.localStorage.getItem('todos');
		const logsString = window.localStorage.getItem('logs');
		if (todosString!==null){
			const todos=JSON.parse(todosString);
			this.setState({todos});
		}
		if (logsString!==null){
			const logs=JSON.parse(logsString);
			this.setState({logs});
		}
	}
	
	//addTodo用于添加一个todo，接收的参数是todo对象
	addTodo = (todoObj)=>{
		const {todos,logs} = this.state;
		const newTodos = [todoObj,...todos];
		const newLogs = [{
			type:type.ADD,
			todoId:todoObj.id,
			date:moment().format('YYYY-MM-DD HH:mm:ss')
		},...logs];
		window.localStorage.setItem('todos',JSON.stringify(newTodos));
		window.localStorage.setItem('logs',JSON.stringify(newLogs));
		//更新状态
		this.setState({todos:newTodos,logs:newLogs});
	}

	//finishTodo
	finishTodo = (id,isFinished)=>{
		//获取状态中的todos
		const {todos,logs} = this.state
		//匹配处理数据
		const newTodos = todos.map((todoObj)=>{
			if(todoObj.id === id) return {...todoObj,isFinished}
			else return todoObj
		})
		const newLogs = [{
			type:type.FINISH,
			todoId:id,
			date:moment().format('YYYY-MM-DD HH:mm:ss')
		},...logs];
		window.localStorage.setItem('todos',JSON.stringify(newTodos));
		window.localStorage.setItem('logs',JSON.stringify(newLogs));
		//更新状态
		this.setState({todos:newTodos,logs:newLogs});
	}

	//updateTodo更新内容
	updateTodo = (id,todo)=>{
		//获取状态中的todos
		const {todos,logs} = this.state;
		const {name,deadline} = todo;
		//匹配处理数据
		const newTodos = todos.map((todoObj)=>{
			if(todoObj.id === id) return {...todoObj,name,deadline}
			else return todoObj
		})
		const newLogs = [{
			type:type.UPDATE,
			todoId:id,
			updatedName:name,
			updatedDeadline:deadline,
			date:moment().format('YYYY-MM-DD HH:mm:ss')
		},...logs];
		window.localStorage.setItem('todos',JSON.stringify(newTodos));
		window.localStorage.setItem('logs',JSON.stringify(newLogs));
		//更新状态
		this.setState({todos:newTodos,logs:newLogs});
	}

	//deleteTodo用于删除一个todo对象
	deleteTodo = (id)=>{
		//获取原来的todos
		const {todos,logs} = this.state;
		//删除指定id的todo对象
		const newTodos = todos.filter((todoObj)=>{
			if(todoObj.id === id) return {...todoObj,deleted:true}
			else return todoObj
		})
		const newLogs = [{
			type:type.DELETE,
			todoId:id,
			date:moment().format('YYYY-MM-DD HH:mm:ss')
		},...logs];
		window.localStorage.setItem('todos',JSON.stringify(newTodos));
		window.localStorage.setItem('logs',JSON.stringify(newLogs));
		//更新状态
		this.setState({todos:newTodos,logs:newLogs});
	}

	render() {
		const {todos} = this.state
		return (
			<div className="todo-container">
				<div className="todo-wrap">
					<h1>待办事宜</h1>
					<Header addTodo={this.addTodo}/>
					<List 
						todos={todos} 
						finishTodo={this.finishTodo}
						deleteTodo={this.deleteTodo}
						updateTodo={this.updateTodo}
					/>
				</div>
			</div>
		)
	}
}
