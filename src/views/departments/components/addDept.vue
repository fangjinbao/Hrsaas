<template>
  <el-dialog :title="showTitle" :visible="showDialog" @close="btnCancel">
    <el-form ref="deptForm" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" clearable name="name" style="width: 80%;" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" clearable name="code" style="width: 80%;" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          v-model="formData.manager"
          filterable
          clearable
          placeholder="请选择"
          style="width: 80%;"
          @focus="getEmployeeSimple"
        >
          <el-option
            v-for="item in peoples"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model="formData.introduce"
          placeholder="1-300个字符"
          style="width: 80%;"
          type="textarea"
          :rows="3"
        />
      </el-form-item>
    </el-form>
    <!-- <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span> -->
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small" @click="btnCancel">取消</el-button>
        <el-button type="primary" size="small" @click="btnOk">确认</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartments, addDepartment, getDepartDetail, updateDepartments } from '@/api/departments'
import { getEmployeeSimple } from '@/api/employees'
export default {
  name: 'AddDept',
  props: {
    showDialog: {
      default: false,
      type: Boolean
    },
    treeNode: {
      type: Object,
      default: null
    }
  },
  data() {
    const checkNameRepeat = async(rule, value, callback) => {
      const { depts } = await getDepartments()
      let isRepeat = false
      if (this.formData.id) {
        // 编辑校验逻辑
        isRepeat = depts.filter(item => {
          return item.pid === this.formData.pid && item.id !== this.formData.id
        }).some(item => {
          return item.name === value
        })
      } else {
        // 新增校验逻辑
        isRepeat = depts.filter(item => {
          return item.pid === this.treeNode.id
        }).some(item => {
          return item.name === value
        })
      }
      if (isRepeat) {
        callback(new Error(`同级部门下已经存在这个${value}部门了`))
      } else {
        callback()
      }
    }
    const checkCodeRepeat = async(rule, value, callback) => {
      const { depts } = await getDepartments()
      let isRepeat = false
      if (this.formData.id) {
        // 编辑校验逻辑
        isRepeat = depts.filter(item => item.id !== this.formData.id).some(item => item.code === value && value)
      } else {
        // 新增校验逻辑
        isRepeat = depts.some(item => {
          return item.code === value && value
        })
      }
      if (isRepeat) {
        callback(new Error('部门编码已存在'))
      } else {
        callback()
      }
    }
    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理员
        introduce: ''// 部门介绍
      },
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称长度为1-50个字符', trigger: 'blur' },
          { trigger: 'blur', validator: checkNameRepeat }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码长度为1-50个字符', trigger: 'blur' },
          { trigger: 'blur', validator: checkCodeRepeat }
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { min: 1, max: 300, message: '部门介绍长度为1-300个字符', trigger: 'blur' }
        ]
      },
      peoples: [] // 部门负责人下拉数据
    }
  },
  computed: {
    showTitle() {
      return this.formData.id ? '编辑部门' : '新增子部门'
    }
  },
  methods: {
    // 获取部门负责人
    async getEmployeeSimple() {
      this.peoples = await getEmployeeSimple()
    },
    // 获取部门详情
    async getDepartDetail(id) {
      this.formData = await getDepartDetail(id)
    },
    btnOk() {
      this.$refs.deptForm.validate(async isOk => {
        if (isOk) {
          if (this.formData.id) {
            // 编辑部门
            await updateDepartments(this.formData)
            this.$message.success('更新部门信息成功')
          } else {
            // 添加部门
            await addDepartment({ ...this.formData, pid: this.treeNode.id })
            this.$message.success('添加部门成功')
          }
          // 前端页面更新数据
          this.$emit('addDepts')
          // 关闭弹窗
          this.$emit('update:showDialog', false)
        }
      })
    },
    btnCancel() {
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
      // 关闭弹窗
      this.$emit('update:showDialog', false)
      this.$refs.deptForm.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
