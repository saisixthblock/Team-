import { combineReducers } from "redux";
import cakeReducer from "./cake/CakeReducer";
import IceCreamReducer from "./iceCream/IceCreamReducer";
import reducer from "./user/userReducer";

const rootReducer=combineReducers({
    cake:cakeReducer,
    iceCream:IceCreamReducer,
    user:reducer

})
export default rootReducer