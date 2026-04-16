<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24" class="right_panel">
                <el-form class="login_form">
                    <h1>Hello</h1>
                    <h2>欢迎来到硅谷甄选</h2>

                    <el-form-item>
                        <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="LoginForm.username" />
                    </el-form-item>

                    <el-form-item>
                        <el-input type="password" :prefix-icon="Lock" placeholder="请输入密码" v-model="LoginForm.password"
                            show-password />
                    </el-form-item>

                    <el-form-item>
                        <el-button class="login_btn" type="primary">
                            登录
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive } from 'vue';
//收集表单数据
let LoginForm = reactive({ username: 'admin', password: '111111' }) 
</script>

<style scoped lang="scss">
.login_container {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/background.jpg') no-repeat center center;
    background-size: cover;

    .right_panel {
        height: 100vh;
        display: flex;
        align-items: center;
    }

    .login_form {
        width: 420px;
        padding: 40px 32px 30px;
        margin-left: 60px;
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.08);
        backdrop-filter: blur(12px);
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.18);

        h1 {
            color: #fff;
            font-size: 48px;
            font-weight: 700;
            line-height: 1;
            margin-bottom: 20px;
        }

        h2 {
            color: #fff;
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 30px;
        }

        :deep(.el-form-item) {
            margin-bottom: 22px;
        }

        :deep(.el-input__wrapper) {
            height: 44px;
            border-radius: 10px;
            box-shadow: none;
            padding: 0 14px;
        }

        :deep(.el-input__inner) {
            height: 44px;
            font-size: 15px;
        }

        .login_btn {
            width: 100%;
            height: 44px;
            border: none;
            border-radius: 10px;
            font-size: 16px;
            font-weight: 600;
            letter-spacing: 2px;
        }
    }
}
</style>