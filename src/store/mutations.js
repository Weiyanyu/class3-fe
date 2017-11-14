import * as types from './mutation-types'


export default {
    [types.LOGOUT] (state) {
        state.logined = false
    }
}