<template>
	<view class="invite">
		<view class="invite_head flex">
			<image src="/static/image/publice/fanhui1@2x.png" mode="" @click="retutnTop"></image>
			<text>邀请好友</text>
			<text></text>
		</view>
		<view class="invite_main center">
			<view class="invite_main_img">
				<image :src="info.qr_code" mode="aspectFill"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{},//
			};
		},
		methods:{
			//返回上一级
			retutnTop () {
				uni.navigateBack()
			},
			getInfo () {
				this.$api.userinfo().then(res=>{
					if (res.code === 1) {
						this.info = res.data
						console.log(res.data);
					}
				})
			}
		},
		onLoad () {
			this.getInfo()
		}
	}
</script>

<style lang="scss">
.invite {
	min-height: calc(100vh);
	background: url(../static/bj.png) no-repeat;
	background-size: cover;
	.invite_main {
		height: 900rpx;
		padding-bottom: 40rpx;
		background: url(../static/renwu@2x.png) no-repeat;
		background-size: cover;
		.invite_main_img {
			width: 200rpx;
			height: 200rpx;
		}
	}
	.invite_head {
		width: 100%;
		height: 88rpx;
		margin-bottom: 40rpx;
		padding: 0 20rpx;
		image {
			width: 44rpx;
			height: 44rpx;
		}
		text {
			color: #FFFFFF;
			font-size: 36rpx;
			&:last-child {
				width: 44rpx;
				height: 44rpx;
			}
		}
	}
}
</style>
