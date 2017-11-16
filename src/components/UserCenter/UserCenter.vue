<template>
  <div class="container">
		<div class="user-info">
			<img class="user-avatar" src="../../assets/logo.png" alt="">
			<ul class="user-info-text">
				<li class="user-name">{{userInfo.userName}}</li>
				<li class="user-profile">个人简介 ： 这家伙很懒，什么也没留下</li>
				<li class="create-time">用户创建时间			: {{userInfo.createTime}}</li>
				<li class="create-time">最后一次登录时间	: {{userInfo.updateTime}}</li>
			</ul>
		</div>
	</div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
	name: 'UserCenter',
	computed : {
		...mapGetters({
			userInfo : 'getUserInfo'
		})
	}
}
</script>

<style>

.user-info .user-avatar {
	float: left;
	margin-right: 50px
}
.user-info .user-info-text {
	float: left;
	margin-left: 50px;
	list-style-type: none;
}

.user-info .user-info-text .user-name {
	font-size: 20px;
	padding-bottom: 10px;
	margin-bottom: 10px;
	border-bottom: 1px solid #ccc;
}



</style>

