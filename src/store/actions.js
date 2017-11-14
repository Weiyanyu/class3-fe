import * as types from './mutation-types'
import _user from '../service/user-service'

export default {
    logout({commit}) {
        _user.logout(function(res) {
            commit(types.LOGOUT)
        }, function(err) {
            //do nothing
        })
    }
}