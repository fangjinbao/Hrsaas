<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :show-before="true">
        <template v-slot:before>
          <span>共{{ page.total }}条记录</span>
        </template>
        <template v-slot:after>
          <el-button size="small" type="success" @click="$router.push('/import')">excel导入</el-button>
          <el-button size="small" type="danger">excel导出</el-button>
          <el-button size="small" type="primary" :disabled="!checkPermission('point-user-delete')" @click="addEmployee">新增员工</el-button>
        </template>
      </PageTools>
      <el-card>
        <el-table v-loading="loading" :data="list">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="员工头像">
            <template v-slot="{row}">
              <img
                v-imagerror="require('@/assets/common/bigUserHeader.png')"
                :src="row.staffPhoto"
                style="border-radius: 50%; width: 100px; height: 100px; padding: 10px;cursor: pointer;"
                @click="showQrCode(row.staffPhoto)"
              >
            </template>
          </el-table-column>
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable=""
            prop="formOfEmployment"
            :formatter="formatEmployment"
          />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
            <template v-slot="obj">{{ obj.row.timeOfEntry | formatDate }}</template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="" prop="enableState">
            <template v-slot="{row}">
              <el-switch
                :value="row.enableState ===1"
                active-color="#13ce66"
                inactive-color="#ff4949"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template v-slot="{row}">
              <el-button type="text" size="small" @click="$router.push(`/employees/detail/${row.id}`)">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="editRole(row.id)">角色</el-button>
              <el-button type="text" size="small" @click="deleteEmployee(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="center" align="middle" style="height: 60px;">
          <el-pagination
            layout="prev, pager, next"
            :current-page="page.page"
            :page-size="page.size"
            :total="page.total"
            @current-change="changePage"
          />
        </el-row>
      </el-card>
    </div>
    <!-- 新增员工 -->
    <AddEmployee :show-dialog.sync="showDialog" />
    <!-- 二维码 -->
    <el-dialog title="二维码" :visible.sync="showCodeDialog">
      <el-row type="flex" justify="center">
        <canvas ref="myCanvas" />
      </el-row>
    </el-dialog>
    <!-- 分配角色 -->
    <AssignRole
      ref="assignRole"
      :show-role-dialog.sync="showRoleDialog"
      :user-id="userId"
    />
  </div>
</template>

<script>
import { getEmployeeList, delEmployee } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees'
import AddEmployee from './components/AddEmployee'
import AssignRole from './components/AssignRole'
import QrCode from 'qrcode'
export default {
  components: { AddEmployee, AssignRole },
  data() {
    return {
      list: [], // 员工列表数据
      page: {
        page: 1,
        size: 10,
        total: 0
      },
      loading: false,
      showDialog: false, // 控制弹层显示
      showCodeDialog: false, // 控制二维码弹层显示
      showRoleDialog: false, // 控制分配角色弹层显示
      userId: null // 员工id
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    // 获取员工列表
    async getEmployeeList() {
      const { total, rows } = await getEmployeeList(this.page)
      this.list = rows
      this.page.total = total
    },
    // 分页请求数据
    changePage(newPage) {
      this.page.page = newPage
      this.getEmployeeList()
    },
    // 处理聘用形式数据
    formatEmployment(row, column, cellValue, index) {
      // console.log(row, column, cellValue, index)
      const obj = EmployeeEnum.hireType.find(item => item.id === cellValue)
      return obj ? obj.value : '未知'
    },
    // 删除员工
    async deleteEmployee(id) {
      try {
        await this.$confirm('确定删除该员工嘛？')
        await delEmployee(id)
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      } catch (error) {
        console.log(error.message)
      }
    },
    // 添加员工
    addEmployee() {
      this.showDialog = true
    },
    // 打印员工信息表
    showQrCode(url) {
      if (url) {
        this.showCodeDialog = true
        this.$nextTick(() => {
          QrCode.toCanvas(this.$refs.myCanvas, url)
        })
      } else {
        this.$message.warning('该用户未上传头像')
      }
    },
    // 员工分配角色
    async editRole(id) {
      this.userId = id
      await this.$refs.assignRole.getUserDetailById(id)
      this.showRoleDialog = true
    }
  }

}
</script>

<style>

</style>
