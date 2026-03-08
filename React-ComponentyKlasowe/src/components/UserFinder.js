import { Fragment, useState, useEffect, Component } from 'react';

import Users from './Users';
import classes from './UserFinder.module.css';
import UsersContext from '../store/users-context';
import ErrorBoundary from './ErrorBoundary';

class UserFinder extends Component {
	static contextType = UsersContext;
	constructor() {
		super();
		this.state = {
			filteredUsers: [],
			searchTerm: '',
		};
	}
	//  componentDidUpdate jest metodą cyklu życia komponentu klasowego,
	// która jest wywoływana po każdej aktualizacji komponentu,
	//  czyli po zmianie stanu lub propsów.
	// W tym przypadku, componentDidUpdate sprawdza,
	// czy poprzednia wartość searchTerm różni się od aktualnej wartości searchTerm w stanie.
	//  Jeśli tak, to aktualizuje filteredUsers,
	// filtrując DUMMY_USERS na podstawie nowej wartości searchTerm.
	//  Dzięki temu, za każdym razem gdy użytkownik wpisuje coś w pole wyszukiwania,
	//  lista użytkowników jest aktualizowana i pokazuje tylko tych użytkowników,
	//  których nazwa zawiera wpisany tekst.

	componentDidMount() {
		//send http request...
		this.setState({ filteredUsers: this.context.users });
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.searchTerm !== this.state.searchTerm) {
			this.setState({
				filteredUsers: this.context.users.filter((user) =>
					user.name.includes(this.state.searchTerm),
				),
			});
		}
	}

	searchChangeHandler(event) {
		this.setState({ searchTerm: event.target.value });
	}

	render() {
		return (
			<Fragment>
				<div className={classes.finder}>
					<input
						type='search'
						onChange={this.searchChangeHandler.bind(this)}
					/>
				</div>
				<ErrorBoundary>
					<Users users={this.state.filteredUsers} />
				</ErrorBoundary>
			</Fragment>
		);
	}
}

// const UserFinder = () => {
// 	const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
// 	const [searchTerm, setSearchTerm] = useState('');

// 	useEffect(() => {
// 		setFilteredUsers(
// 			DUMMY_USERS.filter((user) => user.name.includes(searchTerm)),
// 		);
// 	}, [searchTerm]);

// 	const searchChangeHandler = (event) => {
// 		setSearchTerm(event.target.value);
// 	};

// 	return (
// 		<Fragment>
// 			<div className={classes.finder}>
// 				<input
// 					type='search'
// 					onChange={searchChangeHandler}
// 				/>
// 			</div>
// 			<Users users={filteredUsers} />
// 		</Fragment>
// 	);
// };

export default UserFinder;
