<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="角色管理">
            <el-row style="height: 60px;">
              <el-button
                type="primary"
                icon="el-icon-plus"
                size="small"
                @click="showDialog=true"
              >
                新增角色
              </el-button>
            </el-row>
            <!-- 表格 -->
            <el-table :data="list">
              <el-table-column type="index" label="序号" width="120" align="center" />
              <el-table-column prop="name" label="名称" width="240" />
              <el-table-column prop="description" label="描述" />
              <el-table-column label="操作">
                <template slot-scope="{row}">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary" @click="editRole(row.id)">编辑权限</el-button>
                  <el-button size="small" type="danger" @click="deleteRole(row.id)">删除</el-button>
                </template>

              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-row type="flex" justify="center" style="height: 60px;" align="middle">
              <el-pagination
                layout="prev, pager, next"
                :total="page.total"
                :page-size="page.pagesize"
                :current-page="page.page"
                @current-change="changePage"
              />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              :closable="false"
              show-icon
            />
            <el-form label-width="120px" style="margin-top: 50px;">
              <el-form-item label="企业名称">
                <el-input v-model="formData.name" disabled style="width: 600px;" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="formData.companyAddress" disabled style="width: 600px;" />
              </el-form-item>
              <el-form-item label="公司电话">
                <el-input v-model="formData.companyPhone" disabled style="width: 600px;" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="formData.mailbox" disabled style="width: 600px;" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="formData.remarks" type="textarea" :rows="3" disabled style="width: 600px;" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <!-- 编辑/新增弹层 -->
    <el-dialog :title="showTitle" :visible="showDialog" @close="btnCancel">
      <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="120px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name" />
        </el-form-item>
        <el-form-item label="角色名称">
          <el-input v-model="roleForm.description" />
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="8">
          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button size="small" type="primary" @click="btnOk">确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRoleList,
  getCompanyInfo,
  deleteRole,
  getRoleDetail,
  updateRole,
  addRole
} from '@/api/setting'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      list: [], // 角色列表数据
      formData: {},
      page: {
        // 页码相关数据
        page: 1,
        pagesize: 10,
        total: 0
      },
      showDialog: false, // 控制弹层是否显示
      roleForm: {
        // 表单数据
        name: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['companyId']),
    showTitle() {
      return this.roleForm.id ? '编辑角色' : '新增角色'
    }
  },
  created() {
    this.getRoleList()
    this.getCompanyInfo()
  },
  methods: {
    // 获取所有角色列表
    async getRoleList() {
      const { total, rows } = await getRoleList(this.page)
      this.page.total = total
      this.list = rows
    },
    // 获取公司信息
    async getCompanyInfo() {
      this.formData = await getCompanyInfo(this.companyId)
    },
    // 切换分页后切换数据
    changePage(newPage) {
      this.page.page = newPage
      this.getRoleList()
    },
    // 删除角色
    async deleteRole(id) {
      try {
        await this.$confirm('确定删除该角色？')
        await deleteRole(id)
        this.getRoleList()
        this.$message({
          type: 'success',
          message: '删除角色成功!'
        })
        console.log(id)
      } catch (error) {
        console.log(error)
      }
    },
    // 编辑角色
    async editRole(id) {
      this.roleForm = await getRoleDetail(id)
      this.showDialog = true
    },
    // 确定关闭弹层
    async btnOk() {
      try {
        // 校验
        await this.$refs.roleForm.validate()
        if (this.roleForm.id) {
          // 编辑
          await updateRole(this.roleForm)
        } else {
          // 新增
          addRole(this.roleForm)
        }
        this.getRoleList()
        this.$message.success('操作成功')
        this.showDialog = false
      } catch (error) {
        return false
      }
    },
    // 取消关闭弹层
    btnCancel() {
      this.roleForm = {
        name: '',
        description: ''
      }
      this.showDialog = false
      this.$refs.roleForm.resetFields()
    }
  }

}
</script>

<style>

</style>
