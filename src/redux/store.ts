import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {rootReducer} from './reducers';

import { configureStore } from '@reduxjs/toolkit';
export type RootState = ReturnType<typeof rootReducer>;

/* const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
); */



const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),

});

export  {store};