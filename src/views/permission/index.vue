<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools>
        <el-button slot="after" type="primary" @click="addPermission(1,'0')">添加权限</el-button>
      </PageTools>
      <el-card>
        <el-table :data="list" row-key="id">
          <el-table-column label="菜单名称" prop="name" />
          <el-table-column label="权限标识" prop="code" />
          <el-table-column label="描述" prop="description" />
          <el-table-column label="操作">
            <template v-slot="{row}">
              <el-button v-if="row.type ===1" type="text" @click="addPermission(2,row.id)">添加</el-button>
              <el-button type="text" @click="editPermission(row.id)">编辑</el-button>
              <el-button type="text" @click="delPermission(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <!-- 新增/编辑弹层 -->
    <el-dialog :visible="showDialog" :title="showText" @clone="btnCancel">
      <el-form ref="permForm" :model="formData" :rules="rules" label-width="120px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="标识" prop="code">
          <el-input v-model="formData.code" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="formData.description" />
        </el-form-item>
        <el-form-item label="开启">
          <el-switch v-model="formData.enVisible" active-value="1" inactive-value="0" />
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="end">
        <el-button @click="btnCancel">取消</el-button>
        <el-button type="primary" @click="btnOk">确定</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getPermissionList, delPermission, addPermission, updatePermission, getPermissionDetail } from '@/api/permission'
import { tranListToTreeData } from '@/utils'
export default {
  data() {
    return {
      list: [], // 权限点列表数据
      showDialog: false, // 新增/编辑弹窗显示
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      },
      rules: {
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {
    showText() {
      return this.formData.id ? '编辑权限' : '新增权限'
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    async getPermissionList() {
      this.list = tranListToTreeData(await getPermissionList(), '0')
    },
    delPermission(id) {
      this.$confirm('确定删除改权限吗？').then(async() => {
        await delPermission(id)
        this.$message.success('删除成功')
        this.getPermissionList()
      })
    },
    addPermission(type, pid) {
      this.formData.type = type
      this.formData.pid = pid
      this.showDialog = true
    },
    btnOk() {
      this.$refs.permForm.validate().then(async() => {
        if (this.formData.id) {
          // 编辑
          await updatePermission(this.formData)
        } else {
          // 新增
          await addPermission(this.formData)
        }
        this.$message.success('操作成功')
        this.showDialog = false
        this.getPermissionList()
      })
    },
    async editPermission(id) {
      this.formData = await getPermissionDetail(id)
      this.showDialog = true
    },
    btnCancel() {
      this.formData = {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      }
      this.$refs.permForm.resetFields()
      this.showDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
