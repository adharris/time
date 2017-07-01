
import { Store, Dispatch, Action } from 'redux';


export function LogMiddleware<S, A extends Action>(store: Store<S>) {
    return function(next: Dispatch<S>) {
        return function(action: A) {
            console.group(action.type);
            console.log('Dispatching', action);
            let result = next(action)
            console.log('State is now', store.getState());
            console.groupEnd();
            return result;
        }
    }
}
