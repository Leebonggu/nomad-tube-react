import axios from 'axios';

// 액션

// GET LOGIN INFO
const GET_LOGIN = 'auth/GET_LOGIN';
const GET_LOGIN_ERROR = 'auth/GET_LOGIN_ERROR';

// LOGOUT
const GET_LOGOUT = 'auth/GET_LOGOUT';

// LOGIN
const POST_LOGIN = 'auth/POST_LOGIN';
const POST_LOGIN_ERROR = 'auth/POST_LOGIN_ERROR';

// SIGNUP
const POST_SIGNUP = 'auth/POST_SIGNUP';
const POST_SIGNUP_ERROR = 'auth/POST_SIGNUP_ERROR';

// GET USER INFO
const GET_USER_INFO = 'auth/GET_USER_INFO';
const GET_USER_INFO_ERROR = 'auth/GET_USER_INFO_ERROR';

// RESET USER INFO
const RESET_USER_INFO = 'auth/RESET_USER_INFO';

// GET USER EIDT INFO 
const GET_USER_EIDT_INFO = 'auth/GET_USER_EIDT_INFO';
const GET_USER_EIDT_INFO_ERROR = 'auth/GET_USER_EIDT_INFO_ERROR';
const CHANGE_USER_INFORMATION = 'auth/CHANGE_USER_INFORMATION';

// POST USER EIDT INFO 
const POST_USER_EIDT_INFO = 'auth/POST_USER_EIDT_INFO';
const POST_USER_EIDT_INFO_ERROR = 'auth/POST_USER_EIDT_INFO_ERROR';

// POST USER EIDT INFO 
const POST_USER_CHANGE_PASSWORD = 'auth/POST_USER_CHANGE_PASSWORD';
const POST_USER_CHANGE_PASSWORD_ERROR = 'auth/POST_USER_CHANGE_PASSWORD_ERROR';

const initialState = {
  isLoggedIn: false,
  userId: null,
  error: null,
  userData: {},
};

// Thunk Function

export const getLoginAsync = () => async (dispatch) => {
  try {
    const res = await axios.get('/apis/root/login');
    const { data } = res;
    dispatch({
      type: GET_LOGIN,
      payload: data,
    });
  } catch (err) {
    const { msg } = err.response.data;
    dispatch({
      type: GET_LOGIN_ERROR,
      payload: msg,
    });
  } 
};

export const postLoginAsync = (loginData) => async (dispatch) => {
  try {
    const res =  await axios.post('/apis/root/login', { ...loginData });
    const { data } = res;
    dispatch({
      type: POST_LOGIN,
      payload: data,
    })
  } catch(err) {
    const { msg } = err.response.data;
    dispatch({
      type: POST_LOGIN_ERROR,
      payload: msg,
    });
  }
};

export const getLogout = () => async (dispatch) => {
  await axios.get('/apis/users/logout');
  dispatch({
    type: GET_LOGOUT,
  });
};

export const postSignup = (data) => async (dispatch) => {
  try {
    await axios.post('/apis/root/join', data);
    dispatch({
      type: POST_SIGNUP,
    });
    window.location.href = '/login';
  } catch (err) {
    const { msg } = err.response.data;
    dispatch({
      type: POST_SIGNUP_ERROR,
      payload: msg,
    });
  }
};

export const getUserInfo  = (userId) => async (dispatch)  => {
  try {
    const res =  await axios.get(`/apis/users/${userId}`);
    const { data: { profileData } } = res;
    dispatch({
      type: GET_USER_INFO,
      payload: profileData,
    })
  } catch(err) {
    const { msg } = err.response.data;
    dispatch({
      type: GET_USER_INFO_ERROR,
      payload: msg,
    });
  }
};

export const getUserEditInfo = () => async (dispatch) => {
  try {
    const res = await axios.get(`/apis/users/edit`)
    const { user } = res.data;
    dispatch({
      type: GET_USER_EIDT_INFO,
      payload: user,
    });

  } catch (err) {
    const { msg } = err.response.data;
    dispatch({
      type: GET_USER_EIDT_INFO_ERROR,
      payload: msg,
    });
  } 
};

// eslint-disable-next-line consistent-return
export const postUserEditInfo = (formData) => async (dispatch) => {
  try {
    const res = await axios.post('/apis/users/edit', formData)
    const { data } = res;
    dispatch({
      type: POST_USER_EIDT_INFO,
      payload: data,
    });
    return getLogout();
  } catch (err) {
    const { msg } = err.response.data;
    dispatch({
      type: POST_USER_EIDT_INFO_ERROR,
      payload: msg,
    });
  } 
};

export const postUserChangePassword = (passwordData) => async (dispatch) => {
  try {
    await axios.post('/apis/users/change-password', passwordData);
    dispatch({
      type: POST_USER_CHANGE_PASSWORD,
    });
  } catch (err) {
    const { msg } = err.response.data;
    console.log(msg);
    dispatch({
      type: POST_USER_CHANGE_PASSWORD_ERROR,
      payload: msg,
    });
  }
};

export const changeUserInformration = (value) => (disaptch) => {
  disaptch({
    type: CHANGE_USER_INFORMATION,
    payload: value,
  });
}

export const resetUserInfo = () => (disaptch) => {
  disaptch({
    type: RESET_USER_INFO,
    payload: {},
  });
};

// 리듀서
export default function auth(state = initialState, action) {
  switch (action.type) {
    case GET_LOGIN: {
      const { isLoggedIn, userId } = action.payload;
      return {
        ...state,
        isLoggedIn,
        userId,
        error: null,
      }
    }
    case GET_LOGIN_ERROR:
      return {
        ...state,
        isLoggedIn: false,
        userId: null,
        error: action.payload,
      }
    case POST_LOGIN: {
      return {
        ...state,
        isLoggedIn: true,
        userId: action.payload.userId,
        error: null,
      }
    }
    case POST_LOGIN_ERROR:
      return {
        ...state,
        isLoggedIn: false,
        userId: null,
        error: action.payload,
      }
    case GET_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        userId: null,
        error: null,
      }
    case POST_SIGNUP:
      return {
        ...state,
      }
    case POST_SIGNUP_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case GET_USER_INFO:
      return {
        ...state,
        userData: action.payload,
      }
    case GET_USER_INFO_ERROR:
      return {
        ...state,
        userData: {},
        error: action.payload
      }
    case GET_USER_EIDT_INFO:
      return {
        ...state,
        userData: action.payload,
      }
    case GET_USER_EIDT_INFO_ERROR:
      return {
        ...state,
        userData: {},
        error: action.payload
      }
    case POST_USER_EIDT_INFO:
      return {
        ...state,
        userData: action.payload,
      }
    case POST_USER_EIDT_INFO_ERROR:
      return {
        ...state,
        userData: {},
        error: action.payload
      }
    case POST_USER_CHANGE_PASSWORD:
      return {
        ...state,
        isLoggedIn: false,
      }
    case POST_USER_CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case CHANGE_USER_INFORMATION:
      return {
        ...state,
        userData: action.payload,
      }
    case RESET_USER_INFO:
      return {
        ...state,
        userData: action.payload,
      }
    default:
      return state;
  }
}