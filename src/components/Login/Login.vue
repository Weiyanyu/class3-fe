<template>
	<transition name="login">
		<div class="container">
			<div class="row">
				<div class="col-md-offset-3 col-md-6">
					<div class="alert alert-danger alert-dismissible" v-if="errMsg" role="alert">
						{{errMsg}}
					</div>
					<form class="form-horizontal" @keyup.enter="login()">
							<span class="heading">用户登录</span>
							<div class="form-group">
									<input v-model="studentId" type="number" class="form-control" id="student-id" placeholder="学号">
									<i class="glyphicon glyphicon-user"></i>
							</div>
							<div class="form-group help">
									<input v-model="password" type="password" class="form-control" id="password" placeholder="密码">
									<i class="glyphicon glyphicon-lock"></i>
							</div>
							<div class="form-group">
									<div class="main-checkbox">
											<input type="checkbox" value="None" id="checkbox1" name="check"/>
											<label for="checkbox1"></label>
									</div>
									<span class="text">记住我</span>
									<span @click="login()" class="btn btn-default">立刻登录</span>
							</div>
					</form>
				</div>
			</div>
		</div>
	</transition>


</template>

<style>
@import "./style.css";
</style>

<script>
import _class from "../../util/class3";

import { mapGetters } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      studentId: "",
      password: ""
    };
  },
  computed: {
    ...mapGetters({
      errMsg: "getErrMsg"
    })
  },
  methods: {
    login() {
      const self = this;
      const userInfo = {
        studentId: this.studentId,
        password: this.password
      };
      const validResult = this.formVaild(userInfo);
      if (validResult.status) {
        this.$store.dispatch("login", userInfo);
      } else {
        this.$store.dispatch("error", validResult.msg);
      }
    },

    //表单验证
    formVaild: function(formData) {
      var result = {
        status: false,
        msg: ""
      };

      if (!_class.valid(formData.studentId, "studentId")) {
        result.msg = "学号长度不正确";
        return result;
      }
      if (!_class.valid(formData.password, "require")) {
        result.msg = "密码不能为空";
        return result;
      }
      result.status = true;
      result.msg = "验证成功";
      return result;
    }
  }
};
</script>
