
import { queryData } from '@/utils'

export default {

    namespace: 'app',

    state: {
        name: '这是app的model',
        blogs: [],
        user: {
            isLogin: 0,
            email: ''
        }
    },
    reducers: {
        GETBLOGS (state, action) {              //注意顺序，state在前面
            return {
                ...state,
                blogs: action.blogs.reverse()
            }
        },
        DELETEBLOG (state, action) {
            return {
                ...state,

            }
        },
        USERLOGIN (state, action) {
            return {
                ...state,
                user: {
                    ...state.user,
                    isLogin: action.payload.isLogin,
                    email: action.payload.email
                }
            }
        },
        USERLOGOUT (state, action) {
            return {
                ...state,
                user: {
                    ...state.user,
                    isLogin: 0,
                    email: ''
                }
            }
        }
    },
    subscriptions: {

    },

    effects: {

        *getBlogs (action, { call, put }) {
            const response = yield call(queryData, action.payload, '/blog');
            console.log(2)
            console.log(response);
            yield put({
                type: 'GETBLOGS',
                blogs: response,
            });
        },
        *deleteBlog (action, { call, put }) {
            const response = yield call(queryData, action.payload, '/blog');
            console.log(2)
            console.log(response);
            yield put({
                type: 'GETBLOGS',
                blogs: response,
            });
        }
    },
};