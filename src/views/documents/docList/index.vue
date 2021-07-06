<template>
  <div class="app-container">
    <el-row>
      <!-- 文件夹目录 -->
      <el-col :span="6" :xs="24">
        <!-- <div class="head-container">
          <el-input
            v-model="docName"
            placeholder="请输入文件或文件夹名称"
            size="small"
            clearable
            prefix-icon="el-icon-search"
            style="margin-bottom: 20px"
          ></el-input>
        </div> -->
        <div>【固收智库】目录列表</div>
        <div class="head-container">
          <el-tree
            ref="tree"
            :data="docOptions"
            :props="defaultProps"
          ></el-tree>
        </div>
      </el-col>

      <!-- 文件数据 -->
      <el-col :span="18" :xs="24">
        <!-- 忽略：el-form 搜索部分，暂时省略。 -->

        <!-- 文件的新增（创建报告）；批量删除 el-row/el-table/pagination-->
        <!-- todo:文件夹的新增(创建目录) -->
        <!-- 忽略：批量导入和导出 -->
        <div>当前路径</div>
        <el-row :gutter="10">
          <el-col :span="1.5" :offset="1">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-plus"
              @click="handleAdd"
              >创建目录</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" size="mini" icon="el-icon-edit"
              >创建报告</el-button
            >
          </el-col>
        </el-row>
        <!-- 文件列表 -->
        <!-- todo:将类型type_id对应成相应的字段，比如type_id = 1 是文件夹 -->
        <el-table v-loading="loading" :data="docList">
          <el-table-column label="名称" align="center" prop="name" />
          <el-table-column label="类型" align="center" prop="type_id" />
          <el-table-column label="创建人" align="center" prop="create_uname" />
          <el-table-column label="修改人" align="center" prop="update_uname" />
          <el-table-column
            label="修改时间"
            align="center"
            prop="update_datetime"
          />
          <el-table-column
            label="操作"
            align="center"
            width="180"
            class-name="small-padding fixed-width"
          >
            <template>
              <el-button type="text" size="mini" icon="el-icon-edit"
                >修改</el-button
              >
              <el-button type="text" size="mini" icon="el-icon-delete"
                >删除</el-button
              >
              <el-button type="text" size="mini" icon="el-icon-key"
                >重置</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页条 -->
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />
      </el-col>
    </el-row>
    <!-- todo:添加或修改参数配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="600px" close="">
      <el-tabs type="card" tab-position="top">
        <el-tab-pane label="常规" name="first">
            <!-- <el-form :model="form" ref="form" :rules="rules" label-width="80px">
              <el-form-item label="名称">
                <el-input ></el-input>
              </el-form-item>
              
            </el-form> -->
            
        </el-tab-pane>
        <el-tab-pane label="权限" name="second">

        </el-tab-pane>
        <el-tab-pane label="历史版本" name="third">

        </el-tab-pane>
      </el-tabs>
      
      <span slot="footer">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="cancel">取消</el-button>
      </span>
    </el-dialog>

    <!-- 忽略：用户导入对话框 -->
  </div>
</template>


<script>
import { listDoc } from "@/api/documents/doc"; //仿user
import { treeselect } from "@/api/documents/docNode";

export default {
  name: "documents",
  data() {
    return {
      // 遮罩层
      loading: false,
      // 总条数
      total: 0,
      // 用户表格数据
      docList: null,
      //目录树选项
      docOptions: undefined,
      // 是否显示弹出层
      open: false,
      // 弹出层标题
      title: "",
      //目录名称
      docName: undefined,
      //文件表单参数
      form: {},
      defaultProps: {
        children: "nodes",
        label: "text",
        disabled: true,
      },
      //获取树列表的入参
      //todo：参数值应该从路由里取。
      query: {
        fid: 69,
        pid: 69,
        type_id: 1,
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        // userName: undefined,
        // phonenumber: undefined,
        // status: undefined,
        // deptId: undefined
      },
      //创建目录的切换
      activeName:'second'
    };
  },
  watch: {},
  created() {
    this.getList();
    this.getTreeselect(this.query);
  },
  methods: {
    /** 查询文件列表 */
    getList() {
      this.loading = true;
      listDoc().then((response) => {
        this.docList = response.data;
        this.total = response.data.length;
        this.loading = false;
      });
    },
    /** 查询文件夹下拉树结构 */
    getTreeselect(query) {
      treeselect(query).then((response) => {
        this.docOptions = response.tree_data;
        // this.deptOptions = response.data;
      });
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.open = true;
      this.title = "--属性";
      //todo:发请求获取能够对目录所进行的操作列表：比如查看、编辑、移动、删除

      //todo:发请求获取本部门的全部人员

    },
    /** 提交按钮 */
    submitForm(){
       /** todo:新增成功 */
      /** todo:或者修改成功 */
    },
    /** 取消按钮 */
    cancel(){
      this.open = false;
    },
    /** 创建目录的切换 */
    handleClick(tab, event) {
      // console.log(tab, event);
    }
  },
};
</script>

<style>
</style>