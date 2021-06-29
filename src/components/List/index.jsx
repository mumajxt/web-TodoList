import React, { Component } from 'react'
import Item from '../Item'
import './index.css'

export default class List extends Component {

	render() {
		const {todos,updateTodo,deleteTodo,finishTodo} = this.props
		const unFinishedTodos = todos.filter(todo=>!todo.isFinished)
		const finishedTodos = todos.filter(todo=>todo.isFinished)
		return (
			<div>
				<h3>未完成<span className="todo-count">{unFinishedTodos.length}</span></h3>
				<ul className="todo-main">
					{
						unFinishedTodos.map( todo =>{
							return <Item
								key={todo.id}
								{...todo}
								updateTodo={updateTodo}
								finishTodo={finishTodo}
								deleteTodo={deleteTodo}/>
						})
					}
				</ul>

				<h3>已完成<span className="todo-count">{finishedTodos.length}</span></h3>
				<ul className="todo-main">
					{
						finishedTodos.map( todo =>{
							return <Item
								key={todo.id}
								{...todo}
								finishTodo={finishTodo}
								deleteTodo={deleteTodo}/>
						})
					}
				</ul>

			</div>
			
		)
	}
}