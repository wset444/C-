<template>
    <div class="container">
        <Headers title="订单详情" />
        <statusBar :item="state" />
        <div class="tips">
            <div class="dzf" v-if="DetailList.trade_state === '待支付'">
                <div class="text1">订单待支付</div>
                <div class="text2">
                    请在
                    <counter :second="second" />内完成支付,超时订单自动取消
                </div>
                <div class="text3">
                    <van-button @click="isShow" type="success">立即支付({{ DetailList.price }}元)</van-button>
                </div>
            </div>
            <div class="dzf" v-if="DetailList.trade_state === '待服务'">
                <div class="text1">正在为您安排服务专员..</div>
                <div class="text2">
                    请保持手机畅通，稍后将有服务专员与您联系
                </div>
            </div>
            <div class="dzf" v-if="DetailList.trade_state === '已完成'">
                <div class="text1">服务已完成...</div>
                <div class="text2">
                    感谢您的使用，如有售后问题请联系客服
                </div>
            </div>
            <div class="dzf" v-if="DetailList.trade_state === '已取消'">
                <div class="text1">订单已取消</div>
                <div class="text2">
                    期待下次为您服务，如需帮助可咨询客服
                </div>
            </div>
            <van-dialog v-model:show="showCenter" :show-confirm-button="false">
                <van-icon name="cross" @click="showCenter = false" class="close" />
                <div>微信支付</div>
                <van-image :src="imgUrls" alt="" />
                <div>请使用本人微信扫描二维码</div>
            </van-dialog>
            <van-cell-group class="card">
                <div class="header-text">预约信息</div>
                <van-cell v-for="(item, index) in makeInfo" :key="index" :title="item" :value="formatData(index)" />
            </van-cell-group>
            <van-cell-group class="card">
                <div class="header-text">订单信息</div>
                <van-cell v-for="(item, index) in orderInfo" :key="index" :title="item" :value="formatData(index)" />
            </van-cell-group>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getDetail } from '../../api/detail/index'
import Headers from '../../components/headers.vue'
import statusBar from '../../components/statusBar.vue'
import counter from '../../components/counter.vue'
import Qrcode from 'qrcode'


const formatData = (key) => {
    if (key.indexOf(".") === -1) {
        if (key === "order_start_time") {
            return formatTimestamp(DetailList.value[key]);
        }
        return DetailList.value[key];
    }
    let arr = key.split(".").reduce((o, p) => {
        return (o || {})[p];
    }, DetailList.value);
    return arr;
}
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份是从0开始的，所以需要+1
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

const makeInfo = {
    service_name: '预约服务',
    hospital_name: '就诊医院',
    starttime: '期望就诊时间',
    'client.name': '就诊人',
    'client.mobile': '就诊人电话',
    receiveAddress: '接送地址',
    demand: '其他需求'
}
const orderInfo = {
    tel: '就诊人电话',
    order_start_time_: '下单时间',
    price: '应付金额',
    out_trade_no: '订单编号'
}


const showCenter = ref(false)
const imgUrls = ref('')
const isShow = () => {
    Qrcode.toDataURL(DetailList.value.code_url).then(url => {
        showCenter.value = true
        imgUrls.value = url

    })

}

const stateMap = {
    '已取消': 40,
    '待支付': 10,
    '待服务': 20,
    '已完成': 30
}
const state = ref(0)

//计算倒计时
const second = computed(() => {
    return DetailList.value.order_start_time ? DetailList.value.order_start_time + 7200000 - Date.now() : 0
})


const route = useRoute()
const DetailList = ref({})
onMounted(() => {
    getDetail({
        oid: route.query.oid
    }).then(({ data }) => {
        DetailList.value = data.data
        console.log(data.data);
        state.value = stateMap[DetailList.value.trade_state]

    })
})
</script>

<style lang="less" scoped>
.container {
    background-color: #f0f0f0;
    height: 100vh;
    padding-bottom: 20px;
}

.header {
    background-color: #fff;
    line-height: 40px;
    text-align: center;

    .header-left {
        float: left;
    }
}

.card {
    margin: 15px 0;
    padding: 10px;

    .header-text {
        padding-left: 5px;
        line-height: 30px;
        font-size: 16px;
        font-weight: bold;
        border-left: 4px solid red;
    }
}

.dzf {
    padding: 20px;

    .text1 {
        font-size: 20px;
        font-weight: bold;
        line-height: 30px;
        color: #666;
    }

    .text2 {
        font-size: 14px;
        color: #666;
    }

    .text3 {
        text-align: center;

        .van-button {
            margin-top: 10px;
            margin-left: 10px;
            width: 80%;
            font-weight: bold;
        }
    }
}

::v-deep(.van-dialog__content) {
    text-align: center;
    padding: 20px;

    .close {
        position: absolute;
        left: 20px;
    }
}
</style>
