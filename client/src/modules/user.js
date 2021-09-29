const LOGIN_USER = 'LOGIN_USER'; 
const LOGOUT_USER = 'LOGOUT_USER';


export const loginAction = (requestData) => {
    return {
      type: LOGIN_USER,
      username: requestData,
    };
  };
  
  export const logoutAction = () => {

    return {
      type: LOGOUT_USER,
      username: null,
    };
  };

  const initialState = {
    username: null,
    isLoggedIn: false,
  };
  
  const user = (state = initialState, action) => {
    switch (action.type) {
      case (LOGIN_USER):
        return ({
          ...state,
          username: action.username,
          isLoggedIn: true
        });
      case (LOGOUT_USER):
        return ({
          ...state,
          username: action.username,
          isLoggedIn: false
        });
      default:
        return state
    }
  };
  
  export default user;