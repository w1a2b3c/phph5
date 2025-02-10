<template>
	<view class="message">
		<u-parse :content="message" ></u-parse>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				message:''
			};
		},
		onLoad() {
			this.message = JSON.parse(uni.getStorageSync('bannerMessage'))
		},
		onUnload() {
			uni.removeStorageSync('bannerMessage')
		}
	}
</script>
<style>
	page {
		background: #FFFFFF;
	}
</style>
<style lang="scss">
.message {
	padding: 30rpx;
}
</style>
