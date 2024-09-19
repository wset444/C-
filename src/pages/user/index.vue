<template>
    <div class="container">
        <div class="user">
            <van-image class="img" :src="UserINfo.avatar" width="100" height="100" />
            <div class="text">
                {{ UserINfo.name }}
            </div>


        </div>
        <div class="order">
            <div class="top">
                <div class="text1">我的订单</div>
                <div class="text1" @click="router.push('/order')">全部</div>
            </div>
            <div class="buttom">
                <div class="item">
                    <img @click="goOrder(1)" width="40" height="40" src="../user/image/od_10.png" />
                    <div>待支付</div>
                </div>
                <div class="item">
                    <img @click="goOrder(2)" width="40" height="40" src="../user/image/od_20.png" />
                    <div>待服务</div>
                </div>
                <div class="item">
                    <img @click="goOrder(3)" width="40" height="40" src="../user/image/od_30.png" />
                    <div>已完成</div>
                </div>
                <div class="item">
                    <img @click="goOrder(4)" width="40" height="40" src="../user/image/od_40.png" />
                    <div>已取消</div>
                </div>
            </div>

        </div>
        <div class="foot">
            <div class="foot1">
                <div class="text1">
                    <img width="20" height="20" src="../../assets/images/ic_clients.png" />
                    服务对象管理
                </div>
                <div class="text2">
                    <van-icon name="arrow"></van-icon>
                </div>
            </div>

            <div class="foot2">
                <div class="text1">
                    <img width="20" height="20" src="../../assets/images/ic_share.png" />
                    分享转发
                </div>
                <div class="text2">
                    <van-icon name="arrow"></van-icon>
                </div>
            </div>
        </div>
        <van-button type="danger" @click="show = true" class="quit">退出登录</van-button>
        <van-dialog v-model:show="show" title="提示" @confirm="onConfirm" show-cancel-button>
            <div class="quit_text">
                是否退出登录？
            </div>

        </van-dialog>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from 'vue-router'
const router = useRouter()
const show = ref(false)
const goOrder = (i) => {
    console.log(i);
    router.push(`/order?id=${i}`)
}
const UserINfo = ref({})

onMounted(() => {
    UserINfo.value = JSON.parse(localStorage.getItem('h5_userInfo')) || {}
})
const onConfirm = () => {
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
        width: 94%;
        margin: 20px 10px;
    }

    .quit_text {
        margin: 20px 0;
        text-align: center;
    }
}
</style>
