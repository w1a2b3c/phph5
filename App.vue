<script>
	var jweixin = require('@/js_sdk');
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	*{
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	view,text {
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
		box-sizing: border-box;
	}
	image {
		display: block;
		width: 100%;
		height: 100%;
	}
	input {
		display: block;
		border: none;
		outline: none;
		box-sizing: border-box;
	}
	textarea {
		display: block;
		width: 100%;
		height: 100%;
		font-size: 26rpx;
		color: #333333;
	}
	page {
		background: #FAFAFA;
	}
	.flex {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.flexs {
		display: flex;
		align-items: center;
	}
	.center {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.footer_btn {
		position: fixed;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: space-around;
		color: #FFFFFF;
		font-size: 30rpx;
		font-weight: bold;
		width: 100%;
		height: 98rpx;
		bottom: 0;
		background: #DEBB81;
	}
	button {background: transparent;border: none;display: flex;align-items: center;justify-content: center;padding: 0;margin: 0;overflow: unset;color: #FFFFFF;font-size: 30rpx;}
	button::after {width: 0;height: 0;}
	.hover-view {
		opacity: 0.7;
	}
	scroll-view {
		box-sizing: border-box;
	}
</style>
