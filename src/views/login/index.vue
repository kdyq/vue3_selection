<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24" class="right_panel">
                <el-form class="login_form" :model="LoginForm" :rules="rules" ref="loginForms">
                    <h1>Hello</h1>
                    <h2>欢迎来到硅谷甄选</h2>

                    <el-form-item prop="username">
                        <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="LoginForm.username" />
                    </el-form-item>

                    <el-form-item prop="password">
                        <el-input type="password" :prefix-icon="Lock" placeholder="请输入密码" v-model="LoginForm.password"
                            show-password />
                    </el-form-item>

                    <el-form-item>
                        <el-button :loading="loading" class="login_btn" type="primary" @click="login">
                            登录
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts" name="login">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue';
import { useUserStore } from '@/store/modules/user';
import { useRouter } from 'vue-router';
import { ElNotification } from 'element-plus';
//获取时间
import { getTime } from '@/utils/time';
import type { FormItemRule } from 'element-plus'
const userStore = useUserStore();
const router = useRouter()
//收集表单数据
let LoginForm = reactive({ username: '', password: '' })
let loading = ref(false)
let loginForms = ref()
//登录回调
const login = async () => {
    await loginForms.value.validate();
    //设置加载
    loading.value = true
    try {
        //登录成功
        await userStore.userLogin(LoginForm);
        router.replace('/')
        ElNotification({
            type: 'success',
            message: '欢迎回来',
            title: `Hi，${getTime()}好`
        })
        loading.value = false
    } catch {
        loading.value = false
    }
}
//定义表单验证的配置对象
const rules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'change' },
        { min: 5, max: 16, message: '用户名长度为5-16位', trigger: 'change' },
        {
            validator(rule: FormItemRule, value: string, callback: Function) {
                // 任何空格都不允许
                if (value.includes(' ')) {
                    callback(new Error('用户名不能包含空格'))
                } else {
                    callback()
                }
            },
            trigger: 'change'
        }
    ] as FormItemRule[],

    // 密码：6-16位 + 不能有任何空格
    password: [
        { required: true, message: '请输入密码', trigger: 'change' },
        { min: 6, max: 16, message: '密码长度为6-16位', trigger: 'change' },
        {
            validator(rule: FormItemRule, value: string, callback: Function) {
                if (value.includes(' ')) {
                    callback(new Error('密码不能包含空格'))
                } else {
                    callback()
                }
            },
            trigger: 'change'
        }
    ] as FormItemRule[]
}
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