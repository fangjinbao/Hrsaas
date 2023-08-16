<template>
  <div>
    <el-upload
      list-type="picture-card"
      :limit="1"
      action="#"
      :on-preview="preview"
      :on-remove="handleRemove"
      :on-change="changeFile"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :http-request="upload"
      :class="{ disabled : fileComputed }"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress v-if="showPercent" :percentage="percent" style="width: 180px;" />
    <el-dialog :visible.sync="showDialog" title="图片预览">
      <img width="100%" :src="imgUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: '',
  SecretKey: ''
})
export default {

  data() {
    return {
      fileList: [],
      currentFileUid: '',
      showDialog: false,
      imgUrl: '',
      percent: 0,
      showPercent: false
    }
  },
  computed: {
    fileComputed() {
      return this.fileList.length === 1
    }
  },

  methods: {
    // 预览图片
    preview(file) {
      this.imgUrl = file.url
      this.showDialog = true
    },
    // 删除图片
    handleRemove(file, fileList) {
      this.fileList = fileList
    },
    // 图片上传
    changeFile(file, fileList) {
      this.fileList = fileList.map(item => item)
    },
    // 上传前检查
    beforeUpload(file) {
      // 检查文件类型
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.some(item => item === file.type)) {
        this.$message.error('上传图片只能是jpg、gif、bmp、png格式')
        return false
      }
      // 检查文件大小 5M
      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('上传的图片大小不能大于5M')
        return false
      }
      console.log(file.uid)
      this.currentFileUid = file.uid
      this.showPercent = true
      return true
    },
    upload(params) {
      if (params.file) {
        cos.putObject({
          Bucket: 'jinbao-1301827106',
          Region: 'ap-nanjing',
          Key: params.file.name,
          Body: params.file,
          StorageClass: 'STANDARD',
          onProgress: (progressData) => {
            this.percent = progressData.percent * 100
          }

        }, (err, data) => {
          console.log(err || data)
          if (!err && data.statusCode === 200) {
            this.fileList = this.fileList.map(item => {
              if (item.uid === this.currentFileUid) {
                return { url: 'http://' + data.Location, upload: true }
              }
            })
            console.log(this.fileList)
            setTimeout(() => {
              this.showPercent = false
              this.percent = 0
            }, 1000)
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .disabled .el-upload--picture-card {
    display: none;
}

</style>
