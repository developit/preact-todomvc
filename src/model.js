import { uuid, store, extend } from './util';

export default class TodoModel {
	constructor(key) {
		this.key = key;
		this.todos = store(key);
		this.onChanges = [];
	}

	subscribe(fn) {
		this.onChanges.push(fn);
	}

	inform() {
		store(this.key, this.todos);
		this.onChanges.forEach( cb => cb() );
	}

	addTodo(title) {
		this.todos = this.todos.concat({
			id: uuid(),
			title,
			completed: false
		});
		this.inform();
	}

	toggleAll(completed) {
		this.todos = this.todos.map(
			todo => extend({}, todo, { completed })
		);
		this.inform();
	}

	toggle(todoToToggle) {
		this.todos = this.todos.map( todo => (
			todo !== todoToToggle ? todo : extend({}, todo, {completed: !todo.completed})
		) );
		this.inform();
	}

	destroy(todo) {
		this.todos = this.todos.filter( t => t !== todo );
		this.inform();
	}

	save(todoToSave, title) {
		this.todos = this.todos.map( todo => (
			todo !== todoToSave ? todo : extend({}, todo, { title })
		));
		this.inform();
	}

	clearCompleted() {
		this.todos = this.todos.filter( todo => !todo.completed );
		this.inform();
	}
}
