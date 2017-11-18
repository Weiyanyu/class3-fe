<template>
	<transition name="userCenter" mode="in-out">
		<div class="wrap">
			<div class="info-wrap">
				<div class="user-info">
					<img class="user-avatar" v-if="userInfo" :src="userInfo.avatar" alt="">
					<div class="user-info-text">
						<p class="text user-name" v-if="userInfo">{{userInfo.userName}}</p>
						<p class="user-profile" v-if="userInfo">
							个人简介 ： {{userInfo.profile}}
						</p>
						<span class="text btn btn-primary" data-toggle="modal" data-target="#editProfile">编辑个人资料</span>
					</div>
				</div>
			</div>
			<div class="active-wrap">
				<div class="user-active">
					<div class="tab-content">
						<ul class="tab-list">
							<router-link to="/user-center/comments"><li class="tab-item comments">用户评论</li></router-link>
							<router-link to="/user-center/details"><li class="tab-item details">详细信息</li></router-link>
						</ul>
					</div>
					<div class="detail-con">
						<router-view></router-view>
					</div>
				</div>
			</div>

			<!-- 模态框（Modal） -->
			<div class="modal fade" id="editProfile" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
								&times;
							</button>
							<h4 class="modal-title" id="myModalLabel">
								编辑个人资料
							</h4>
						</div>
						<div class="modal-body">
							<form id="profile-form" >
								<div class="form-group">
									<label for="username">昵称：</label>
									<input v-model="userName" type="text" class="form-control" id="username" placeholder="请输入要修改的用户名（昵称）">
								</div>
								<div class="form-group">
									<label for="profile">个人简介</label>
									<textarea v-model="profile" id="profile" class="form-control" rows="3" maxlength="140" placeholder="请简单介绍一下自己（最长不能超过140个词）"></textarea>
								</div>
								<form id="upload-avatar" enctype="multipart/form-data">
									<label>上传头像</label>
									<input type="file" @change="handleChangeFile" name="avatar">
								</form>
							</form>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default" data-dismiss="modal">关闭
							</button>
							<button type="button" @click="updateUserInfo()" class="btn btn-primary" data-dismiss="modal">
								提交更改
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
import {mapGetters} from 'vuex'



export default {
	created() {
		this.$store.dispatch('getUserInfo')
	},
	name: 'UserCenter',
	data() {
		return {
			userName : '',
			profile : '',
		}
	},
	computed : {
		...mapGetters({
			userInfo : 'getUserInfo'
		}),
	},
	methods : {
		updateUserInfo() {
			const userInfo = {
				userName 	: this.userName ? this.userName : this.$store.getters.getUserInfo.userName,
				profile		: this.profile ? this.profile : this.$store.getters.getUserInfo.profile,
				avatar		: this.$store.getters.getUserInfo.avatar
			}
			const self = this
			this.$store.dispatch('updateUserInfo', userInfo)
			//因为后端头像图片文件名相同，所有这里得刷新一下当前界面，可能会出现卡顿
			this.$router.go(0)
		},
		handleChangeFile(e) {
			const self = this
			let file = e.target.files[0]
			let supportedTypes = ['image/jpg', 'image/jpeg', 'image/png']
			if (file && supportedTypes.indexOf(file.type) >= 0) {
				this.$store.dispatch('uploadAvatar', new FormData($("#upload-avatar")[0]))
			}
		},
	},
}
</script>

<style>
@import './style.css';
</style>

