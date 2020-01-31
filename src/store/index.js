import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'

import rootReducer from './reducers'
import rootEpic from './epics'

// For initialize in application

const epicMiddleware = createEpicMiddleware()
function configureStore() {
    epicMiddleware.run(rootEpic)
    return createStore(rootReducer, applyMiddleware(epicMiddleware));
}

export const store = configureStore();
