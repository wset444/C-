<template>
    <div class="login-content">
        <h2 class="title">登录</h2>
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field v-model="form.userName" name="用户名" label="用户名" placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]" />
                <van-field v-model="form.passWord" type="password" name="密码" label="密码" placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]" />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">
                    提交
                </van-button>
            </div>
        </van-form>

    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from '../../api/user/index'
const router = useRouter()
const userReg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/


const form = ref({
    userName: '',
    passWord: ''
})
const onSubmit = (values) => {
    console.log('submit', values);
    login(form.value).then(
        ({ data }) => {
            if (data.code == 10000) {
                console.log(data);
                localStorage.setItem('h5_token', data.data.token)
                localStorage.setItem('h5_userInfo', JSON.stringify(data.data.userInfo))
                router.push('/')
            }

        }
    )
};
</script>

<style lang="less" scoped>
.login-content {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;

    .title {
        text-align: center;
        margin: 10px 0;
    }
}
</style>