<template>
	<view class="camera">
		<view class="details_title">
			<view class="details_nav"></view>
			<view class="details-title_head flex">
				<view class="details_title_return" @click="returnTop">
					<image src="/static/image/publice/fanhui@2x.png" mode=""></image>
				</view>
				<view class="details_title_name">{{ name }}</view>
				<view class="details_title_mp3" @click="changePlay">
					<image :src="isPlay ? '/static/image/home/bofang@2x.png' : '/static/image/home/guanbiyinyue@2x.png' " mode=""></image>
				</view>
			</view>
		</view>
		<view class="camera_main">
			<view class="camera_main_head flex">
				<view class="details_head_price flexs">
					<view class="details_head_gold">我的余额：{{ info.coin }}金币</view>
					<view class="details_head_btn center" @click="recharge">充值</view>
				</view>
				<view class="details_head_rule flexs" @click="$refs.regulation.open()">
					<text>玩法规则</text>
					<image src="/static/image/home/wenhao@2x.png" mode=""></image>
				</view>
			</view>
			<view class="camera_main_box">
				<view class="camera_main_box_name">选择心仪的盒子</view>
				<view class="camera_main_box_ul flexs">
					<view class="camera_main_box_li center" @click="changeBox(item,index)" :class="{active:prizeList.indexOf(index)!=-1 || indexs == index}" v-for="(item,index) in 16" :key="index">
						<image src="/pagesA/static/hezi@2x.png" mode="aspectFill"></image>
					</view>
				</view>
			</view>
			<view class="camera_footer flex">
				<view class="camera_footer_li center" @click="unpack(index)" v-for="(item,index) in 2" :key="index"> {{ index == 0 ? ( i == 0 ? '随机一个' : '随机五个') : '开箱' }}</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom" :mask-click="false">
		  <view class="pay">
				<view class="pay_close" @click="$refs.popup.close()">
					<image src="/static/image/home/guanbi@2x.png" mode=""></image>
				</view>
		  	<view class="pay_head">支付</view>
				<view class="pay_shop flexs">
					<view class="pay_shop_img">
						<view class="pay_shop_img_top">
							<view class="pay_shop_img_left">
								<image :src="boxMessage.image" mode="aspectFill"></image>
							</view>
							<view class="pay_shop_img_right">
								<image :src="item" mode="aspectFill" v-for="(item,index) in boxMessage.right" :key="index"></image>
							</view>
						</view>
						<view class="pay_shop_img_bot">
							<image :src="item" mode="aspectFill" v-for="(item,index) in boxMessage.bot" :key="index"></image>
						</view>
					</view>
					<view class="pay_shop_main">
						<view class="pay_shop_name">{{ boxMessage.box_name }}</view>
						<view class="pay_shop_price flex">
							<view class="pay_shop_price_l">{{ boxMessage.coin_amount }}金币</view>
							<view class="pay_shop_price_btn center" v-if="boxMessage.coin_not_enough">金额不足</view>
						</view>

					</view>
				</view>
				<view class="pay_attention">{{ boxMessage.notice }}</view>
				<view class="pay_contant flexs">
					<image @click="isConsent = !isConsent" :src="isConsent ? '/static/image/publice/xuanzhong1@2x.png' : '/static/image/publice/weixuanzhong1@2x.png' " mode=""></image>
					<text @click="goBuyer">我已阅读并同意《欢乐拆盒买家须知》</text>
				</view>
				<button class="pay_gold" @click="goldPay" v-if="!boxMessage.coin_not_enough" hover-class="hover-view">金币支付</button>
				<view class="pay_ul flex" v-else>
				
				<button class="pay_ul_btn" @click="recharge()" hover-class="hover-view">立即充值</button>
				
				
					<!--button class="pay_ul_btn" @click="patternIndex(index)" hover-class="hover-view" v-for="(item,index) in 2" :key="index">{{ index == 0 ? '微信支付'+ boxMessage.rmb_amount +'金币' : '支付宝支付'+ boxMessage.rmb_amount +'金币' }}</button-->
				</view>
		  </view>
		</uni-popup>
		<!--S  玩法规则 -->
		<uni-popup ref="regulation" :mask-click="false">
		  <view class="regulation">
				<view class="regulation_close" @click="$refs.regulation.close()">
					<image src="/static/image/home/guanbi@2x.png" mode=""></image>
				</view>
		  	<view class="regulation_name">玩法规则</view>
				<view class="regulation_main">
					<scroll-view scroll-y="true" class="scroll-view">
						<u-parse :content="message" ></u-parse>
					</scroll-view>
				</view>
		  </view>
		</uni-popup>
		<!--E  玩法规则 -->
		<!-- S 奖品弹框 -->
		<uni-popup ref="prize" :mask-click="false">
			<view class="prize ">
				<view class="prize_box center">
					<view class="prize_close" @click="$refs.prize.close()">
						<image src="/static/image/open/guanbi@2x.png" mode=""></image>
					</view>
					<view class="prize_shop center" v-if="i == 0">
						<image v-if="prizedata&&prizedata.prizeInfo" :src="prizedata.prizeInfo[0].image" mode="aspectFill"></image>
						<text v-if="prizedata&&prizedata.prizeInfo">{{ prizedata.prizeInfo[0].goods_name }}</text>
					</view>
					<view class="prize_ul" v-else>
						<scroll-view scroll-x="true" class="scroll-view">
							<view class="prize_ul_li" v-for="(item,index) in prizedata.prizeInfo" :key="index">
								<image :src="item.image" mode="aspectFill"></image>
								<text>{{ item.goods_name }}</text>
							</view>
						</scroll-view>
					</view>
					<view class="prize_footer flex" v-if="type == 0">
						<view class="prize_footer_li center" v-for="(item,index) in 2" :key="index" @click="recycle(index)">{{ index == 0 ? '一键回收' : '立即发货'}}</view>
					</view>
					<view class="shiwan center" v-else>试玩结果仅供展示哦~</view>
				</view>
			</view>
		</uni-popup>
		<!-- E 奖品弹框 -->
		<!-- 收回弹框 -->
		<uni-popup ref="recycle" :mask-click="false">
			<view class="recycle">
				<view class="recycle_close" @click="$refs.recycle.close()">
					<image src="/static/image/publice/guanbi@2x.png" mode=""></image>
				</view>
				<view class="recycle_head">提示</view>
				<view class="recycle_price center">
					<text>￥{{ recycleMessage.amount }}</text>
					<text>回收金币</text>
				</view>
				<view class="recycle_ul">
					<view class="recycle_ul_li flex" v-for="(item,index) in recycleMessage.goods_info" :key="index">
						<view class="recycle_ul_li_txt">{{ item.name }}</view>
						<view class="recycle_ul_li_r flexs">
							<text>￥{{ item.price }}</text>
							<text>x{{ item.num }}</text>
						</view>
					</view>
				</view>
				<view class="recycle_txt">{{ recycleMessage.notice }}</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	var jweixin = require('@/js_sdk');
	const innerAudioContexts = uni.createInnerAudioContext();
	// innerAudioContexts.autoplay = true;
	innerAudioContexts.loop = true;
	innerAudioContexts.src = '/static/image/home/bj.mp3';
	
	const innerAudioContext = uni.createInnerAudioContext();
	innerAudioContext.obeyMuteSwitch = false
	export default {
		data() {
			return {
				name:'',
				box_id:'',//盒子ID
				prizeList:[],//奖品列表
				indexs: -1, // 当前转动到哪个位置，起点位置
				count: 9, // 总共有多少个位置
				timer: 0, // 每次转动定时器
				speed: 200, // 初始转动速度
				times: 0, // 转动次数
				cycle: 30, // 转动基本次数：即至少需要转动多少次再进入抽奖环节
				prize: -1, // 中奖位置
				click: true, //标识是否处于抽奖状态
				showToast: false ,//显示中奖弹窗
				indexList:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
				type:null,//1试玩0详情
				i:'',//一发还是五发
				message:'',//玩法规则
				boxMessage:{},//盒子详情
				goldFlag:true,
				prizedata:{},//奖品列表
				isConsent:false,//是否同意
				isHand:false,
				info:{},//个人信息
				recovery_rule:'',
				recycleMessage:{},//回收信息
				out_trade_no:'',//微信支付宝支付订单号
				isPlay:true,
			};
		},
		methods:{
			changePlay () {
				this.isPlay = !this.isPlay
				uni.setStorageSync('isPlay',this.isPlay)
				this.isPlay ? innerAudioContexts.play() : innerAudioContexts.pause()
			},
			//一键回收
			recycle (index) {
				let ids = []
				this.prizedata.prizeInfo.forEach(item=>{
					ids.push(item.prize_id)
				})
				this.$refs.prize.close()
				if (index == 0) {
					this.$api.exchange({record_ids:ids.join(',')}).then(res=>{
						if (res.code === 1) {
							this.recycleMessage = res.data
							this.$refs.recycle.open()
						}
					})
				} else {
					
					uni.redirectTo({url:'/pages/me/applyFaHuo?id=' + ids.join(',')})
				}
			},
			//买家须知
			goBuyer () {
				uni.navigateTo({url:'/pagesA/pages/buyer'})
			},
			//金币支付
			goldPay () {
				if (!this.isConsent) return uni.showToast({title:'请阅读并勾选买家须知',icon:'none'})
				if (!this.goldFlag) return
				this.goldFlag = false
				this.$api.coinPay({order_id:this.boxMessage.order_id}).then(res=>{
					if (res.code === 1) {
						this.prizedata = res.data.prize
						this.$refs.popup.close()
						if (!this.isHand) {
							this.getInfo()
							this.startRoll()
							this.playMp3()
						} else {
							this.$refs.prize.open()
						}
						this.goldFlag = true
					} else {
						this.goldFlag = true
					}
				})
			},
			
			
			
			
			
			//支付宝微信支付
			patternIndex (index) {
				if (!this.isConsent) return uni.showToast({title:'请阅读并勾选买家须知',icon:'none'})
				if (!this.goldFlag) return
				this.goldFlag = false
				let that = this
				this.$http.post(this.boxMessage.wechat).then(res=>{
					if (res.code === 1) {
						WeixinJSBridge.invoke('getBrandWCPayRequest', {
								"appId": res.data.appId,   //公众号ID，由商户传入    
								"timeStamp": res.data.timeStamp,   //时间戳，自1970年以来的秒数    
								"nonceStr": res.data.nonceStr,      //随机串    
								"package": res.data.package,
								"signType": res.data.signType,     //微信签名方式：    
								"paySign": res.data.paySign //微信签名
						},
						function(res) {
								if (res.err_msg == "get_brand_wcpay_request:ok") {
									that.type = 0
									that.getOpenByOrderTrade(0)
										// 使用以上方式判断前端返回,微信团队郑重提示：
										//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
								}
						});
					} else if (res.code === 403) {
						
					}
				})
				if (index == 0) {
					// this.$api.
				} else {
					location.href = this.boxMessage[index == 0 ? 'wechat' : 'alipay'] + '?type='+ this.type +'&index='+ this.i+'&id='+ this.box_id +'&name=' + this.name + '&token=' + uni.getStorageSync('token')
				}
				
			},
			//去充值
			recharge () {
				uni.navigateTo({url:'/pages/me/recharge'})
			},
			//播放音频
			playMp3 () {
				innerAudioContext.src = '/pagesA/static/jhr.mp3'
				innerAudioContext.loop = true
				innerAudioContext.play()
			},
			//开奖
			unpack (index) {
				this.isHand = index == 0 ? false : true
				if (index == 1) {
					if (this.i == 0) {
						 if (this.prizeList.length == 0) return uni.showToast({title:'请选择一个盒子',icon:'none'})
					} else {
						if (this.prizeList.length < 5) return uni.showToast({title:'请选择五个盒子',icon:'none'})
					}
				} else {
					this.prizeList = []
				}
				this.createOrder(index)
				
				// 
			},
			startRoll() {
				this.times += 1; // 转动次数
				this.oneRoll(); // 转动过程调用的每一次转动方法，这里是第一次调用初始化
				// 如果当前转动次数达到要求 && 目前转到的位置是中奖位置
				if (this.times > this.cycle + 10 && this.prize === this.indexs) {
					clearTimeout(this.timer); // 清除转动定时器，停止转动
					this.$refs.prize.open()
					innerAudioContext.stop()
					innerAudioContext.loop = false
					innerAudioContext.src = '/pagesA/static/hjo.mp3'
					innerAudioContext.play()
					this.prize = -1;
					// if (this.isDemo) {
					// 	this.$refs.single_prize.open()
					// } else {
					// 	this.num == 1 ? this.setlottery(true,this.$store.state.prizedata.type-1+2) : this.setlottery(true,9)
					// }
					// this.prizeList.push(this.indexs)
					
					// this.getBoxMessage()
					this.indexs = -1
					// 
					this.times = 0;
					this.speed = 46;
					this.click = true;
					this.pretreasurerunging = false
					var that = this;
					setTimeout(res => {
						that.showToast = true;
						// this.index = -1
					}, 500);
				} else {
					if (this.times < this.cycle) {
						this.speed -= 10; // 加快转动速度
					} else if (this.times === this.cycle) {
						const index = parseInt(Math.random() * 10, 0) || 0; // 随机获得一个中奖位置
						
						// this.prize = this.lotteryList.indexOf(this.prizeMessage.id); //中奖位置,可由后台返回
						this.prize = this.indexs
						
					} else if (this.times > this.cycle + 10 && ((this.prize === 0 && this.indexs === 7) || this.prize === this.indexs + 1)) {
						this.speed += 110;
					} else {
						this.speed += 20;
					}
					if (this.speed < 40) {
						this.speed = 46;
					}
					this.timer = setTimeout(this.startRoll, 46);
				}
			},
					
			// 每一次转动
			oneRoll() {
				let index = this.indexs; // 当前转动到哪个位置
				const count = this.count; // 总共有多少个位置
				index += 1;
				if (index > count - 1) {
					index = 0;
				}
				let num = parseInt(Math.random() * this.indexList.length);
				this.indexs = this.indexList[num]
				
			},
			//选择奖品
			changeBox (item,index) {
				var indexs = this.prizeList.indexOf(index);
				if(indexs>-1) {//大于0 代表存在，
					this.prizeList.splice(indexs,1);//存在就删除
				} else {
					if (this.i == 1) {
						if (this.prizeList.length == 5) {
							this.prizeList.shift()
							
						}
					} else {
						if (this.prizeList.length == 1) {
							this.prizeList = []
						}
					}
					
					
					this.prizeList.push(index)
				}
			},
			returnTop () {
				uni.navigateBack()
			},
			//玩法规则
			getMessage () {
				this.$api.agreement({name:'play_rule'}).then(res=>{
					if (res.code === 1) {
						this.message = res.data.content
					}
				})
				this.$api.agreement({name:'recovery_rule'}).then(res=>{
					if (res.code === 1) {
						this.recovery_rule = res.data.content
					}
				})
			},
			//创建订单
			createOrder (index) {
				this.$api[this.type == 1 ? 'haveATry' : 'createOrder']({box_id:this.box_id,num:this.i == 0 ? 1 : 5,msg:this.type == 1 ? '试玩' : '创建订单中',select:this.prizeList.join(',')}).then(res=>{
					if (res.code === 1) {
						if (this.type == 1) {
							this.prizedata = {prizeInfo:res.data.goodsInfo} 
							this.$refs.popup.close()
							if (!this.isHand) {
								this.startRoll()
								this.playMp3()
							} else {
								this.$refs.prize.open()
							}
						} else {
							res.data.right = []
							res.data.bot = []
							res.data.image = res.data.images[0]
							res.data.images.forEach((item,index)=>{
								if (index > 0 && index < 3) {
									res.data.right.push(item)
								}
								if (index > 2) {
									res.data.bot.push(item)
								}
							})
							this.boxMessage = res.data
							
							
							
							this.$refs.popup.open()
						}
						
					}
				})
			},
			//获取个人信息
			getInfo () {
				this.$api.userinfo().then(res=>{
					if (res.code === 1) {
						this.info = res.data
					}
				})
			},
			getOpenByOrderTrade (type) {
				this.$api.openByOrderTrade(type == 0 ? {order_id:this.boxMessage.order_id} : {out_trade_no:this.out_trade_no}).then(res=>{
					if (res.code === 1) {
						this.prizedata = res.data.prize
						this.$refs.popup.close()
						this.startRoll()
						this.playMp3()
						this.goldFlag = true
					}
				})
			},
		},
		onUnload() {
			innerAudioContexts.pause()
		},
		onLoad ({type,index,id,name,status,out_trade_no,token}) {
			this.isPlay = uni.getStorageSync('isPlay')
			this.isPlay ? innerAudioContexts.play() : innerAudioContexts.pause()
			if (token) {
				uni.setStorageSync('token',token)
			}
			if (out_trade_no) {
				this.out_trade_no = out_trade_no
			}
			if (status == 0 || status) {
				status == 0 ? uni.showToast({title:'取消支付',icon:'none'}) : this.getOpenByOrderTrade(1)
			}
			
			this.name = name
			this.box_id = id
			this.i = index
			this.type = type
			this.getMessage()
			this.getInfo()
		}
	}
</script>

<style lang="scss">
	.camera_head {
		height: 88rpx;
	}
	.details_title {
		width: 100%;
		position: sticky;
		top: 0;
		z-index: 2021;
		.details_nav {width: 100%;}
		.details-title_head {
			width: 100%;
			height: 88rpx;
			padding: 0 30rpx;
			background: #FFFFFF;
			.details_title_return {
				width: 44rpx;
				height: 44rpx;
			}
			.details_title_name {
				width: 466rpx;
				text-align: center;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
				font-size: 36rpx;
				font-weight: bold;
			}
			.details_title_mp3 {
				width: 44rpx;
				height: 44rpx;
			}
		}
	}
.camera_main {
	height: calc(100vh - 88rpx);
	background: url(../static/beijing@2x.png) no-repeat;
	background-size: cover;
	.camera_main_head {
		padding: 30rpx 30rpx 80rpx 30rpx;
		.details_head_gold {
			color: #FFFFFF;
			font-size: 30rpx;
			font-weight: bold;
		}
		.details_head_btn {
			width: 120rpx;
			height: 50rpx;
			color: #FFFFFF;
			font-size: 28rpx;
			background: linear-gradient(0deg, #F6AF32 0%, #F7751F 100%);
			border-radius: 25rpx;
			margin-left: 30rpx;
		}
		.details_head_rule {
			image {
				width: 24rpx;
				height: 24rpx;
				margin-left: 10rpx;
			}
			text {
				color: #FFFFFF;
				font-size: 26rpx;
			}
		}
	}
	.camera_main_box {
		width: 713rpx;
		height: 628rpx;
		margin: 0 auto;
		background: url(../static/xuanzehezi@2x.png) no-repeat;
		background-size: cover;
		.camera_main_box_name {
			color: #FFFFFF;
			height: 140rpx;
			line-height: 140rpx;
			padding-top: 10rpx;
			text-align: center;
			font-size: 30rpx;
		}
		.camera_main_box_ul {
			width: 592rpx;
			margin: 0 auto;
			flex-wrap: wrap;
			.camera_main_box_li {
				width: 142rpx;
				height: 110rpx;
				margin: 0 8rpx 8rpx 0;
				&:nth-child(4n) {
					margin-right: 0;
				}
				background: url(../static/hezibeijing@2x.png) no-repeat;
				background-size: cover;
				border-image: linear-gradient(164deg, #FFA800, #FF3904, #FF8A00) 2 2;
				border-radius: 8rpx;
				image {
					width: 72rpx;
					height: 72rpx;
				}
			}
			.active {
				background: url(../static/xuanzhongbeijing@2x.png) no-repeat;
				background-size: cover;
			}
		}
	}
}
.camera_footer {
	padding: 0 30rpx;
	margin-top: 190rpx;
	.camera_footer_li {
		width: 330rpx;
		height: 88rpx;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		text-shadow: 0rpx 2rpx 1rpx #FC985C;
		&:first-child {
			background: linear-gradient(145deg, #FB986E, #FA7E48);
			box-shadow: 0rpx 5rpx 5rpx 0rpx rgba(138, 56, 6, 0.44);
		}
		&:last-child {
			background: linear-gradient(145deg, #FF6666, #FF413F);
			box-shadow: 0rpx 5rpx 5rpx 0rpx rgba(138, 56, 6, 0.44);
			border-radius: 44rpx;
		}
		
		border-radius: 44rpx;
	}
}
.pay {
	background: #FFFFFF;
	border-radius: 20rpx 20rpx 0rpx 0rpx;
	padding: 0 50rpx 32rpx 50rpx;
	position: relative;
	.pay_close {
		top: 30rpx;
		right: 30rpx;
		width: 44rpx;
		height: 44rpx;
		position: absolute;
	}
	.pay_head {
		text-align: center;
		font-size: 30rpx;
		font-weight: bold;
		padding: 40rpx 0 50rpx 0;
	}
	.pay_shop {
		
		margin-bottom: 40rpx;
		.pay_shop_main {
			display: flex;
			flex: 1;
			height: 200rpx;
			flex-direction: column;
			justify-content: space-around;
		}
		.pay_shop_img {
			width: 200rpx;
			height: 200rpx;
			padding: 12rpx;
			.pay_shop_img_top {
				display: flex;
				margin-bottom: 12rpx;
				.pay_shop_img_left {
					image {
						width: 114rpx;
						height: 114rpx;
						border-radius: 6rpx;
					}
					margin-right: 12rpx;
				}
				.pay_shop_img_right {
					image {
						width: 51rpx;
						height: 51rpx;
						&:first-child {
							margin-bottom: 12rpx;
						}
						border-radius: 6rpx;
					}
				}
			}
			.pay_shop_img_bot {
				display: flex;
				justify-content: flex-end;
				image {
					width: 51rpx;
					height: 51rpx;
					margin-left: 12rpx;
					&:first-child {
						margin-left: 0;
					}
					border-radius: 6rpx;
				}
			}
			margin-right: 30rpx;
		}
		.pay_shop_name {
			font-size: 28rpx;
		}
		.pay_shop_price_l {
			color: #CF271B;
			font-size: 30rpx;
		}
		.pay_shop_price_btn {
			width: 183rpx;
			height: 50rpx;
			color: #FA7E48;
			font-size: 30rpx;
			font-weight: bold;
			background: rgba(246, 175, 50, 0.5);
			border-radius: 25rpx;
		}
	}
	.pay_attention {
		color: #666666;
	}
	.pay_contant {
		margin: 24rpx 0 59rpx 0;
		image {
			width: 32rpx;
			height: 32rpx;
			margin-right: 10rpx;
		}
		text {
			font-size: 26rpx;
		}
	}
	.pay_gold {
		height: 78rpx;
		font-size: 26rpx;
		background: #FF6666;
		border-radius: 39rpx;
	}
	.pay_ul_btn {
		width: 310rpx;
		height: 78rpx;
		font-size: 26rpx;
		background: #FA7E48;
		border-radius: 39rpx;
		&:last-child {
			background: #FF6666;
		}
	}
}
.regulation {
	width: 650rpx;
	.scroll-view {
		height: 735rpx;
	}
	padding: 0 0 0 30rpx;
	background: #FFFFFF;
	border-radius: 20rpx;
	position: relative;
	.regulation_close {
		position: absolute;
		width: 44rpx;
		height: 44rpx;
		top: 30rpx;
		right: 30rpx;
	}
	.regulation_name {
		padding: 40rpx 0;
		padding-right: 30rpx;
		text-align: center;
		font-size: 30rpx;
		font-weight: bold;
	}
}
.prize {
	width: 750rpx;
	display: flex;
	justify-content: flex-end;
	.prize_box {
		width: 709rpx;
		height: 876rpx;
		padding: 160rpx 160rpx 0 0 ;
		position: relative;
		flex-direction: column;
		background: url(../../static/image/open/beijing@2x.png) no-repeat;
		background-size: cover;
		.prize_close {
			width: 30rpx;
			height: 30rpx;
			top: 70rpx;
			right: 127rpx;
			position: absolute;
		}
	}
	.shiwan {
		background: url(../../static/image/open/tanchuangbeijing@2x.png) no-repeat;
		background-size: cover;
	}
	.scroll-view {
		width: 522rpx;
		white-space:nowrap;
		.prize_ul_li {
			margin-right: 20rpx;
			&:last-child {
				margin-right: 0;
			}
			display: inline-block;
			image {
				width: 174rpx;
				height: 235rpx;
				margin: 0 auto;
				margin-bottom: 20rpx;
			}
			text {
				width: 100%;
				text-align: center;
				color: #FFFFFF;
				display: inline-block;
				font-size: 28rpx;
			}
		}
	}
	.prize_shop {
		display: flex;
		flex-direction: column;
		image {
			width: 174rpx;
			height: 235rpx;
			margin-bottom: 20rpx;
		}
		text {
			color: #FFFFFF;
			font-size: 28rpx;
		}
	}
	.prize_footer {
		margin-top: 40rpx;
		.prize_footer_li {
			width: 180rpx;
			height: 60rpx;
			color: #FFFFFF;
			font-size: 26rpx;
			background: #FF6666;
			border-radius: 30rpx;
			&:last-child {
				background: #FA7E48;
				margin-left: 60rpx;
			}
		}
	}
	.shiwan {
		width: 399rpx;
		height: 48rpx;
		color: #FFFFFF;
		font-size: 30rpx;
		margin-top: 40rpx;
		background: #000000;
		border-radius: 27rpx 27rpx 27rpx 27rpx;
	}
}
.recycle {
	width: 640rpx;
	padding-bottom: 95rpx;
	position: relative;
	background: #FFFFFF;
	box-shadow: 0rpx -5rpx 20rpx 0rpx rgba(0, 0, 0, 0.1);
	border-radius: 30rpx;
	.recycle_close {
		top: 20rpx;
		right: 30rpx;
		width: 44rpx;
		height: 44rpx;
		position: absolute;
	}
	.recycle_head {
		height: 100rpx;
		text-align: center;
		line-height: 100rpx;
		font-size: 32rpx;
		font-weight: bold;
		border-bottom: 2rpx solid #E9E9E9;
	}
	.recycle_price {
		margin: 40rpx 0 0rpx 0;
		flex-direction: column;
		text {
			color: #FA7E48;
			font-size: 36rpx;
			font-weight: bold;
			&:last-child {
				color: #333333;
				margin-top: 10rpx;
				font-size: 26rpx;
			}
		}
	}
	.recycle_ul {
		padding: 0 30rpx;
		margin: 50rpx 0;
	}
	.recycle_ul_li {
		margin-bottom: 30rpx;
		&:last-child {
			margin-bottom: 0;
		}
		.recycle_ul_li_txt {
			color: #999999;
			font-size: 26rpx;
		}
		.recycle_ul_li_r {
			text {
				color: #999999;
				font-size: 26rpx;
				&:last-child {
					width: 80rpx;
					text-align: right;
					color: #FA7E48;
					font-size: 30rpx;
				}
			}
		}
	}
	.recycle_txt {
		padding: 0 30rpx;
		color: #999999;
		font-size: 26rpx;
	}
}
</style>
