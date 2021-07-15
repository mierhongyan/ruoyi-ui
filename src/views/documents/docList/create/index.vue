<template>
  <div class="app-container">
    
      <el-form :model="form" ref="form" :rules="rules" label-width="80px">
            <el-form-item label="报告路径" prop="docRoute">
              /....
            </el-form-item>
            <el-form-item label="报告名称" prop="docName">
              <el-input
                v-model="form.docName"
                placeholder="请输入文件夹或报告名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="报告简介" prop="docContents">
              <el-input
                v-model="form.docContents"
                placeholder="请输入报告简介"
              ></el-input>
            </el-form-item>
            <el-form-item label="附件" prop="annex">
              <el-upload
                  action=""
                  ref="upload"
                  :auto-upload="false"
                  multiple
                  :limit="5"
                  >
                  <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
                  <el-button style="margin-left: 10px;" size="small" type="success" >上传到服务器</el-button>
                  <div slot="tip" class="el-upload__tip">jpg/png文件大小请小于500kb</div>
              </el-upload>
              
            </el-form-item>
            <el-button type="primary" size="default">保存</el-button>
            <el-button type="info" size="default" >返回</el-button>
            
          </el-form>

    <!-- 忽略：用户导入对话框 -->
  </div>
</template>


<script>
export default {
  name: "createDocuments",
  data() {
    return {
      // 表单校验
      rules: {
        docName: [
          { required: true, message: "报告名称不能为空", trigger: "blur" },
        ],
        docContents: [
          { required: true, message: "报告内容不能为空", trigger: "blur" },
        ],
      },
      //文件表单参数
      form: {},
    };
  },
  watch: {

  },
  methods: {
    
  },
};
</script>

<style>

</style>