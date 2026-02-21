import { createContext, useReducer } from 'react';

export const initialState = createContext({
	notifications: [],
	addNotification: () => {},
	removeNotification: () => {},
	clear: () => {},
});

function notificationReducer(state, action) {
	switch (action.type) {
		case 'ADD_NOTIFICATION':
			return {
				...state,
				notifications: [
					...state.notifications,
					{
						id: Math.random(),
						text: action.payload.text,
					},
				],
			};
		case 'REMOVE_NOTIFICATION':
			return {
				...state,
				notifications: state.notifications.filter(
					(n) => n.id !== action.payload.id,
				),
			};
		case 'CLEAR':
			return {
				...state,
				notifications: [],
			};
		default:
			return state;
	}
}

export default function NotificationProvider({ children }) {
	const [state, dispatch] = useReducer(notificationReducer, {
		notifications: [{ id: 1, text: 'Witaj w systemie!' }],
	});

	function handleAddNotification(text) {
		dispatch({
			type: 'ADD_NOTIFICATION',
			payload: { text },
		});
	}
	function handleRemoveNotification(id) {
		dispatch({
			type: 'REMOVE_NOTIFICATION',
			payload: { id },
		});
	}
	function handleClear() {
		dispatch({
			type: 'CLEAR',
		});
	}

	const contextValue = {
		notifications: state.notifications,
		addNotification: handleAddNotification,
		removeNotification: handleRemoveNotification,
		clear: handleClear,
	};

	return (
		<initialState.Provider value={contextValue}>
			{children}
		</initialState.Provider>
	);
}
