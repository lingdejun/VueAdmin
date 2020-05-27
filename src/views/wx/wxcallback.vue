<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="form" class="login-form" label-position="left">

      <div class="title-container">
        <h3 class="title">绑定邮箱</h3>
      </div>

      <el-form-item prop="email">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="email"
          v-model="form.email"
          placeholder="邮箱"
          name="邮箱"
          type="email"
        />
      </el-form-item>
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="bindAccount">绑定</el-button>
    </el-form>
  </div>
</template>

<script>
import { getOpenId, validateBinding, bind } from '@/api/wx'
export default {
  name: 'WXCallback',
  data() {
    return {
      code: '',
      openId: '',
      binded: '',
      loading: false,
      form: {
        email: ''
      }
    }
  },
  created() {
    this.code = this.$route.query.code
    console.log('code=' + this.code)
    // this.code = '123'
    this.checkBinding()
  },
  methods: {
    checkBinding() {
      const data = {
        code: this.code
      }
      console.log(data)
      getOpenId(data).then(response => {
        this.openId = response.Data
        const checkData = {
          openId: this.openId
        }
        validateBinding(checkData).then(response => {
          this.binded = response.Data
          if (this.binded === 1) {
            this.loading = true
            this.$store.dispatch('user/login', { username: 'admin', password: '123' })
              .then(() => {
                this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
                this.loading = false
              })
              .catch(() => {
                this.loading = false
              })
          }
        })
      })
    },
    bindAccount() {
      this.form.openId = this.openId
      bind(this.form).then(response => {
        if (response.Result === 1) {
          this.$notify({
            title: 'Success',
            message: '绑定成功',
            type: 'success',
            duration: 2000
          })
          this.$store.dispatch('user/login', { username: 'admin', password: '123' })
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        }
      })
    }
  }
}
</script>
<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
