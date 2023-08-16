<template>
  <div class="login-container">
    <el-card class="box-card">
      <div class="card-left">
        <img src="@/assets/common/login_left.jpg" alt="">
      </div>
      <div class="card-right">
        <div class="right-header">
          <div class="logo">
            <img src="@/assets/common/log2.png" alt="">
          </div>
          <div class="title">
            <h2>统一身份登录</h2>
          </div>
        </div>
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item prop="mobile">
            <span class="svg-container">
              <svg-icon class="me" icon-class="me" />
            </span>
            <el-input v-model="loginForm.mobile" name="mobile" placeholder="请输入手机号" @keyup.enter.prevent="handleLogin" />
          </el-form-item>
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              v-model="loginForm.password"
              type="password"
              name="password"
              placeholder="请输入密码"
              @keyup.enter.prevent="handleLogin"
            />
          </el-form-item>
          <el-from-item class="loginBtn">
            <el-button
              type="primary"
              :loading="loading"
              @click.native.prevent="handleLogin"
            >{{ loading ? '登录中' : '立即登录' }}</el-button>
          </el-from-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { validMobile } from '@/utils/validate'
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data() {
    const validateMobile = (rule, value, callback) => {
      if (!validMobile(value)) {
        callback(new Error('手机号格式不正确'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      loginForm: {
        mobile: '13800000002',
        password: '888itcast.CN764%...'
      },
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { validator: validateMobile, trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
          {
            min: 6,
            max: 25,
            message: '长度在 6 到 25 个字符',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    ...mapActions(['user/login']),
    handleLogin() {
      this.$refs.loginForm.validate(async(valid) => {
        if (valid) {
          try {
            this.loading = true
            await this['user/login'](this.loginForm)
            this.$message({
              message: '登录成功',
              type: 'success'
            })
            this.$router.push('/dashboard')
          } catch (error) {
            console.log(error)
          } finally {
            this.loading = false
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  height: 100vh;
  background: url('~@/assets/common/bg001.png') center no-repeat;
  // background-size: 100% 100%;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .box-card {
    width: 980px;
    height: 623px;
    box-shadow: 0px 6px 12px rgba(188, 198, 209, 0.5);
    border: unset;
    border-radius: 32px;
    ::v-deep .el-card__body {
      display: flex;
      padding: 0;
      .card-left {
        width: 490px;
        height: 100%;
        img {
          width: 100%;
        }
      }
      .card-right {
        flex: 1;
        height: 100%;
        padding: 30px 36px;
        .right-header {
          .title {
            h2 {
              font-size: 24px;
              font-family: 500;
              margin-bottom: 50px;
            }
          }
          .logo {
            display: flex;
            flex-direction: row-reverse;
            img {
              width: 200px;
              height: 58px;
              margin-bottom: 10px;
            }
          }
        }
        .demo-ruleForm {
          .el-form-item {
            margin-bottom: 40px;
            .el-form-item__content {
              margin-left: unset !important;
              height: 100%;
              .svg-container {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 22px;
                height: 22px;
                // background-color: red;
                position: absolute;
                left: 14px;
                top: 12px;
                z-index: 1;
                color: rgba(166, 166, 166, 1);
               .svg-icon {
                  width: 18px;
                  height: 18px;
                  color: red;

                }
                 .me {
                  width: 20px;
                  height: 20px;

                }
              }
              .el-input__inner {
                padding-left: 42px;
                height: 50px;
                border-radius: 10px;
                border: 1.5px solid rgba(220, 222, 226, 1);
                &:focus {
                  border: 1.5px solid #0089ff;
                }
              }
              .el-form-item__error {
                font-size: 14px;
                margin-top: 2px;
              }
            }
          }
          .loginBtn {
            .el-button {
              width: 100%;
              height: 50px;
              margin-top: 16px;
              background-color: #0089ff;
              border: unset;
              &:hover {
                background: rgba(0, 137, 255, 0.8);
              }
              span {
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
