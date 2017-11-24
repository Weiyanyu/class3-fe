<template>
  <div class="admin-notice">
    <div class="input-group input-group-lg">
      <span class="input-group-addon" id="sizing-addon1">在这里输入标题</span>
      <input type="text" id="notice-title" class="form-control" placeholder="比如：今天要查人了" aria-describedby="sizing-addon1">
    </div>
    <div id="summernote"> 
    </div>
    <select v-model="selected" class="btn btn-default">
      <option disabled value="">请选择通知类型</option>
      <option value="21">重要通知</option>
      <option value="18">一般通知</option>
      <option value="19">学校通知</option>
      <option value="20">班级通知</option>
    </select>
    <button type="submit" class="btn btn-default" @click="addNotice"  data-toggle="modal" data-target="#submitInfo">提交通知</button>
    <button type="submit" class="btn btn-default" data-toggle="modal" data-target="#myModal">添加文件</button>
    <!-- 提示框 -->
    <div class="modal fade" id="submitInfo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
              &times;
            </button>
            <h4 class="modal-title" id="myModalLabel">
             提示信息
            </h4>
          </div>
          <div class="modal-body">
            <div v-if="noticeErrMsg === ''" class="alert alert-success" role="alert">添加成功，点击确定返回，取消则继续编辑</div>
            <div v-if="noticeErrMsg" class="alert alert-danger" role="alert">{{noticeErrMsg}}</div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭
            </button>
            <button v-if="noticeErrMsg === ''" type="button" @click="comfirmOP()" class="btn btn-primary" data-dismiss="modal">
              确定
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 文件上传 -->
    <div class="file-uoload">
      
      <form>
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">请选择文件</h4>
              </div>
              <div class="modal-body">
                <input type="file" name="uploadFiles" id="txt_file" multiple class="file-loading" />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
  
</template>

<script>
import 'summernote/dist/summernote.min.js'
import 'summernote/dist/summernote.css'
import 'summernote/dist/lang/summernote-zh-CN.js' 


import "bootstrap-fileinput/css/fileinput.min.css"
import "bootstrap-fileinput/js/fileinput.min.js"


//文件上传(bootstrap-fileinput)
var FileInput = function() {
  var oFile = new Object();

  //初始化fileinput控件（第一次初始化）
  oFile.Init = function(ctrlName, uploadUrl) {
    var control = $("#" + ctrlName);

    //初始化上传控件的样式
    control.fileinput({
      language: "zh", //设置语言
      uploadUrl: uploadUrl, //上传的地址
      allowedFileExtensions: ["zip", "rar", "pptx", "pdf", "docx", "xlsx"], //接收的文件后缀
      showUpload: true, //是否显示上传按钮
      showCaption: false, //是否显示标题
      browseClass: "btn btn-primary", //按钮样式
      maxFileSize: 20480,//单位为kb，如果为0表示不限制文件大小
      maxFileCount: 10, //表示允许同时上传的最大文件个数
      enctype: "multipart/form-data",
      validateInitialCount: true,
      previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
      msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
    });

    //导入文件上传完成之后的事件
    $("#txt_file").on("fileuploaded", function(
      event,
      data,
      previewId,
      index
    ) {
      $("#myModal").modal("hide");
      var insertUrl = data.response.data.url
      var insertFileName = data.files[0].name
      $('#summernote').summernote('editor.createLink', {
        text: insertFileName,
        url : insertUrl,
        isNewWindow: true
      })
      
    });
  };
  return oFile;
};


//插入图片回调
var sendFile = function(file, editor, welEditable) {
  var data = new FormData()
  data.append("noticeFile", file)
  $.ajax({
    url : 'http://s.yeonon.top/manage/notices/upload_file',
    data : data,
    xhrFields : {
      withCredentials : true,
    },
    cache : false,
    contentType: false,  
    processData: false, 
    type : 'POST',
    success: function(res) {
      console.log(res.data.url)
      $('#summernote').summernote('editor.insertImage', res.data.url)
    }
  })
}

import {mapGetters} from 'vuex'

export default {
  name: 'AdminNotice',
  mounted() {
    const self = this;
    $('#summernote').summernote({
      lang: 'zh-CN',
      placeholder : '请在这输入你的观点',
      height: 150,
      minHeight: null,
      maxHeight: null,
      focus: false,
      toolbar : [
        ['style', ['bold', 'italic', 'clear']],
        ['fontsize', ['fontsize']],
        ['fontname', ['fontname']],
        ['color', ['color']],
        ['para', ['ul','ol','paragraph']],
        ['insert', ['picture', 'link']]
      ],
      callbacks: {
        onImageUpload : function(files, editor, welEditable) {
          console.log("上传中.....")
          sendFile(files[0], editor, welEditable)
        }
      },
    })
    //文件上传
    var oFileInput = new FileInput();
    oFileInput.Init("txt_file", "http://s.yeonon.top/manage/files");
  },

  data() {
    return {
      selected : '',
    }
  },
  computed: {
    ...mapGetters({
      noticeErrMsg : 'getNoticeErrMsg'
    })
  },
  methods: {
    addNotice() {
      const newNoticeTitle = $('#notice-title').val()
      if (newNoticeTitle === '') {
        this.$store.dispatch('formValidErr', '标题不能为空')
        return;
      }
      console.log(this.selected)
      const newNoticeDesc = $('#summernote').summernote('code')
      const newNoticeTopicId = parseInt(this.selected)
      const newNotice = {
        topicId : newNoticeTopicId,
        title   : newNoticeTitle,
        description : newNoticeDesc,
      }
      this.$store.dispatch('addNotice', newNotice)
    },
    comfirmOP() {
      this.$router.go(-1)
    }
  }
}
</script>

<style>
.admin-notice .input-group {
  margin-bottom: 20px;
}
</style>

