
import { queryData } from '@/utils'

export default {

    namespace: 'app',

    state: {
        name: '这是app的model',
        blogs: []
    },
    reducers: {
        GETBLOGS (state, action) {              //注意顺序，state在前面
            return {
                ...state,
                blogs: action.blogs
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
    },
};