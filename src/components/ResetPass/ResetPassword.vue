<template>
<div class="container">
  <div class="row">
		<div class="col-md-offset-3 col-md-6">
			<div class="alert alert-danger" v-if="errMsg" role="alert">
				{{errMsg}}
			</div>
			<form class="form-horizontal" @keyup.enter="resetPwd()">
					<span class="heading">重置密码</span>
					<div class="form-group">
							<input v-model="oldPassword" type="password" class="form-control" id="old-password" placeholder="旧密码">
							<i class="glyphicon glyphicon-lock"></i>
					</div>
					<div class="form-group help">
							<input v-model="newPassword" type="password" class="form-control" id="new-password" placeholder="新密码">
							<i class="glyphicon glyphicon-lock"></i>
					</div>
					<div class="form-group help">
							<input v-model="confirmPassword" type="password" class="form-control" id="confirm-password" placeholder="确认新密码">
							<i class="glyphicon glyphicon-lock"></i>
					</div>
					<div class="form-group">
							<span @click="resetPwd()" class="btn btn-default">确认</span>
					</div>
			</form>
		</div>
  </div>
</div>
</template>

<script>

import {mapGetters} from 'vuex'

export default {
	name : 'ResetPassword',
	data() {
		return {
			oldPassword : '',
			newPassword : '',
			confirmPassword : '',
		}
	},
	computed : {
		...mapGetters({
			errMsg : 'getErrMsg',
			userId : 'getUserId',
		})
	},
	methods : {
		resetPwd() {
			const formData = {
				oldPassword 		: this.oldPassword,
				newPassword 		: this.newPassword,
				confirmPassword : this.confirmPassword,
				userId					: this.$store.getters.getUserId
			}
			const validResult = this.formVaild(formData)
			if (validResult.status) {
				this.$store.dispatch('resetPwd', {
					userId : formData.userId,
					oldPassword : formData.oldPassword,
					newPassword : formData.newPassword,
				})
			} else {
				this.$store.dispatch('error', validResult.msg)
			}
		},

		formVaild : function(formData) {
			var result = {
				status 	: false,
				msg		: ''
			}
			if (formData.newPassword.length < 6) {
				result.msg = "密码不能少于6位"
				return result
			}
			if (formData.confirmPassword !== formData.newPassword) {
				result.msg = "两次输入的密码不一致"
				return result
			}
			result.status = true
			result.msg = "验证成功"
			return result
		},
	}
}
</script>


<style>
@import './style.css';
</style>
