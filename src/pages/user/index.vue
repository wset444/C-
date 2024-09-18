<template>
    <div class="container">
        <div class="user">
            <van-image class="img" :src="UserINfo.avatar" width="100" height="100" />
            <div class="text">
                {{ UserINfo.name }}
            </div>
            <van-button type="danger" @click="goback">退出</van-button>
        </div>

    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from 'vue-router'
const UserINfo = ref({})
const router = useRouter()
onMounted(() => {
    UserINfo.value = JSON.parse(localStorage.getItem('h5_userInfo')) || {}
})
const goback = () => {
    localStorage.removeItem('h5_userInfo')
    localStorage.removeItem('h5_token')
    router.push('/login')
}

</script>

<style lang="less" scoped>
.container {
    background-color: #f0f0f0;
    height: 100vh;
    overflow: hidden;

    .user {
        width: 95%;
        height: 200px;
        background-color: #fff;
        text-align: center;
        border-radius: 10px;
        margin: 10px;

        .img {
            margin-top: 30px;
        }

        .text {
            line-height: 30px;
            font-weight: bold;
        }
    }

    .order {
        width: 90%;
        margin: 10px;
        border-radius: 5px;
        background-color: #fff;
        padding: 10px;

        .top {
            margin: 10px;
            line-height: 50px;
            display: flex;
            justify-content: space-between;

            .text1 {
                color: #333;
            }

            .text2 {
                color: #999;
            }

            border-bottom: 0.5px solid #f5f5f5;
        }

        .buttom {
            padding: 10px;
            display: flex;
            justify-content: space-around;

            .item {
                font-size: 14px;
                color: #999;
            }
        }
    }

    .foot {
        margin: 0 10px;
        padding: 10px;
        line-height: 50px;
        background-color: #fff;

        .foot1,
        .foot2 {
            display: flex;
            justify-content: space-between;
            color: #555;
        }

        .foot1 {
            border-bottom: 0.5px solid #f5f5f5;
        }
    }

    .quit {
        width: 90%;
        margin: 20px;
    }

    .quit_text {
        margin: 20px 0;
        text-align: center;
    }
}
</style>
