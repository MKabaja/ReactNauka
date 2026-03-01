import { createContext, useContext, useReducer, type ReactNode } from 'react';

export type Timer = {
	name: string;
	duration: number;
};

type TimersState = {
	isRuning: boolean;
	timers: Timer[];
};

type TimersContextValue = TimersState & {
	addTimer: (timerData: Timer) => void;
	startTimers: () => void;
	stopTimers: () => void;
};
const initialState: TimersState = {
	isRuning: true,
	timers: [],
};
const TimersContext = createContext<TimersContextValue | null>(null);

type TimersContextProviderProps = {
	children: ReactNode;
};
type StartTimersAction = {
	type: 'START_TIMERS';
};
type StopTimersAction = {
	type: 'STOP_TIMERS';
};
type AddTimerAction = {
	type: 'ADD_TIMER';
	payload: Timer;
};

type Action = StartTimersAction | StopTimersAction | AddTimerAction;

function reducer(state: TimersState, action: Action): TimersState {
	switch (action.type) {
		case 'START_TIMERS':
			return {
				...state,
				isRuning: true,
			};
		case 'STOP_TIMERS':
			return {
				...state,
				isRuning: false,
			};
		case 'ADD_TIMER':
			return {
				...state,
				timers: [
					...state.timers,
					{
						name: action.payload.name,
						duration: action.payload.duration,
					},
				],
			};
		default:
			return state;
	}
}

function TimersContextProvider({ children }: TimersContextProviderProps) {
	const [timersState, dispatch] = useReducer(reducer, initialState);
	const ctx: TimersContextValue = {
		timers: timersState.timers,
		isRuning: timersState.isRuning,
		addTimer(timerData) {
			dispatch({ type: 'ADD_TIMER', payload: timerData });
		},
		startTimers() {
			dispatch({ type: 'START_TIMERS' });
		},
		stopTimers() {
			dispatch({ type: 'STOP_TIMERS' });
		},
	};

	return (
		<TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
	);
}

export default TimersContextProvider;

export function useTimersContext() {
	const timersCtx = useContext(TimersContext);
	if (timersCtx === null) {
		throw new Error('TimerContext is null - that should not be the case!');
	}
	return timersCtx;
}
