import {createStore} from "redux"
import myReducer from "./reducres"

const Store = createStore(myReducer);

export default Store;