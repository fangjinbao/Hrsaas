<template>
  <el-dialog title="分配角色" :visible="showRoleDialog" @close="btnCancel">
    <!-- 多选 -->
    <el-checkbox-group v-model="roleIds">
      <el-checkbox v-for="item in list" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
    </el-checkbox-group>
    <el-row slot="footer">
      <el-button @click="btnCancel">取消</el-button>
      <el-button type="primary" @click="btnOK">确认</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRoleList } from '@/api/setting'
import { getUserDetailById } from '@/api/user'
import { assignRoles } from '@/api/employees'
export default {
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false
    },
    userId: {
      type: String,
      default: null
    }

  },
  data() {
    return {
      list: [], // 所有角色列表
      roleIds: [] // 当前用户拥有的角色

    }
  },
  created() {
    this.getRoleList()
    this.getUserDetailById()
  },
  methods: {
    // 获取所有角色
    async getRoleList() {
      const { rows } = await getRoleList({ page: 1, pagesize: 20 })
      this.list = rows
    },
    // 获取用户拥有角色
    async getUserDetailById(id) {
      const { roleIds } = await getUserDetailById(id)
      this.roleIds = roleIds
    },
    async btnOK() {
      await assignRoles({ id: this.userId, roleIds: this.roleIds })
      this.$emit('update:showRoleDialog', false)
      this.$message.success('角色分配成功')
    },
    btnCancel() {
      this.$emit('update:showRoleDialog', false)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
