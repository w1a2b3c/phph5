<template>
	<view class="">
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
		methods:{
			getMessage () {
				this.$api.agreement({name:'privacy_policy'}).then(res=>{
					if (res.code === 1) {
						this.message = res.data.content
					}
				})
			}
		},
		onLoad() {
			this.getMessage()
		}
	}
</script>

<style lang="scss">

</style>
