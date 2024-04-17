import { configureStore } from "@reduxjs/toolkit";
// import blogReducer from "../reducers/blogReducer";
import loginReducer from "../reducers/loginReducer";
// import commentReducer from "../reducers/commentReducer";
// import notificationReducer from "../reducers/notificationReducer";
import userReducer from "../reducers/userReducer";

const store = configureStore({
    reducer: {
        allUsers: userReducer,
        loggedInUser: loginReducer
    },
});
store.subscribe(() => {
    console.log(store.getState());
});

export default store;