<template>
	<transition name="userCenter">
		<div class="wrap user-center">
			<div class="panel panel-warning">
				<div class="panel-heading">{{isMe ? userInfo.userName : otherInfo.userName}}
					<span v-if="isMe" class="edit-profile btn btn-primary" data-toggle="modal" data-target="#editProfile">编辑个人资料</span>
				</div>
				<div class="panel-body">
					<div class="row">
						<div class="col-xs-6 col-md-3">
							<a href="#" class="thumbnail">
								<img :src="isMe ? userInfo.avatar : otherInfo.avatar">
							</a>
							<button class="btn btn-primary" type="button">
							评论 <span class="badge">{{commentLen}}</span>
							</button>
							<button class="btn btn-primary" type="button">
							通知 <span class="badge">{{noticeLen}}</span>
							</button>
						</div>
						<p>个人简介 ： </p>
						<span>&#12288;&#12288;{{isMe ? userInfo.profile : otherInfo.profile}}</span>
					</div>
				</div>
			</div>
			<div class="active-wrap">
				<div class="user-active">
					<div class="tab-content">
						<ul class="tab-list">
							<router-link :to="'/users/' + viewUserId + '/comments'"><li class="tab-item comments">我的评论</li></router-link>
							<router-link :to="'/users/' + viewUserId + '/notices'"><li class="tab-item details">我的通知</li></router-link>
						</ul>
					</div>
					<div class="detail-con">
						<transition name="detailContent" :key="key">
							<router-view></router-view>
						</transition>

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
	name: 'UserCenter',

	mounted() {
		console.log("重新渲染")
		var userId = -1
		if (this.isMe) {
			userId = this.$store.getters.getUserInfo.userId
		}
		else {
			userId = this.viewUserId
			this.$store.dispatch('getOthersInfo', userId)
		}
		this.$store.dispatch('getCommentListByUserId', userId)
		this.$store.dispatch('getNoticesByUserId', userId)
	},

	watch : {
		isMe(newIsMe) {
			console.log(newIsMe)
			var userId = -1
			if (newIsMe === true) {
				userId = this.$store.getters.getUserInfo.userId
			}
			else {
				userId = this.viewUserId
				this.$store.dispatch('getOthersInfo', userId)
			}
			this.$store.dispatch('getCommentListByUserId', userId)
			this.$store.dispatch('getNoticesByUserId', userId)
		}
	},

	data() {
		return {
			userName : '',
			profile : '',
		}
	},
	computed : {
		...mapGetters({
			userInfo : 'getUserInfo',
			commentLen : 'getCommentListLen',
			noticeLen : 'getNoticeListLen',
			otherInfo : 'getOthers',
		}),
		viewUserId() {
			return this.$route.params.id
		},
		isMe() {
			console.log(this.$route.params.id)
			console.log(this.$store.getters.getUserInfo.userId)
			return (parseInt(this.$route.params.id) === this.$store.getters.getUserInfo.userId)
		},
		key() {
      return this.$route.path.replace(/\//g, '_')
    }
	},
	methods : {
		updateUserInfo() {
			const userInfo = {
				userName 	: this.userName ? this.userName : this.$store.getters.getUserInfo.userName,
				profile		: this.profile ? this.profile : this.$store.getters.getUserInfo.profile,
				avatar		: this.$store.getters.getUserInfo.avatar,
				userId    : parseInt(this.$route.params.id),
			}
			const self = this
			this.$store.dispatch('updateUserInfo', userInfo)
			//因为后端头像图片文件名相同，所有这里得刷新一下当前界面，可能会出现卡顿
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

