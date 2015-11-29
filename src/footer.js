import { h, Component } from 'preact';
import { Link } from 'preact-router';
import { pluralize } from './util';

const ALL_TODOS = 'all';
const ACTIVE_TODOS = 'active';
const COMPLETED_TODOS = 'completed';

export default class TodoFooter extends Component {
	render({ nowShowing, count, completedCount, onClearCompleted }) {
		return (
			<footer class="footer">
				<span class="todo-count">
					<strong>{count}</strong> {pluralize(count, 'item')} left
				</span>
				<ul class="filters">
					<li>
						<Link href="/" class={{ selected: nowShowing===ALL_TODOS }}>All</Link>
					</li>
					&nbsp;
					<li>
						<Link href="/active" class={{ selected: nowShowing===ACTIVE_TODOS }}>Active</Link>
					</li>
					&nbsp;
					<li>
						<Link href="/completed" class={{ selected: nowShowing===COMPLETED_TODOS }}>Completed</Link>
					</li>
				</ul>
				{ completedCount > 0 ? (
					<button class="clear-completed" onClick={onClearCompleted}>
						Clear completed
					</button>
				) : null }
			</footer>
		);
	}
}
