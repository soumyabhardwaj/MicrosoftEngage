import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './rootReducer'
import thunk from 'redux-thunk'
import { verifyAuth } from '../../features/auth/authActions'
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory()

const configureStore = () => {    
    const store = createStore(rootReducer(history), composeWithDevTools(applyMiddleware(thunk)))

    store.dispatch(verifyAuth())

    return store
}

export default configureStore