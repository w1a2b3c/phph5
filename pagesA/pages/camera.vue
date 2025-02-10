<template>
	<view class="camera">
		<audio id="audio" src="/h5/pagesA/static/bj1.mp3" loop></audio>
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
			<!-- <view class="camera_main_head flex">
				<view class="details_head_price flexs">
					<view class="details_head_gold">我的余额：{{ info.coin }}金币</view>
					<view class="details_head_btn center" @click="recharge">充值</view>
				</view>
				<view class="details_head_rule flexs" @click="$refs.regulation.open()">
					<text>玩法规则</text>
					<image src="/static/image/home/wenhao@2x.png" mode=""></image>
				</view>
			</view> -->
			<view class="camera_main_box">
				<view class="camera_main_box_name">{{name}}</view>
				<view class="camera_main_box_ul flexs">
					<view class="camera_main_box_li center" @click="changeBox(item,index)"  v-for="(item,index) in 9" :key="index">
						<!-- <image src="/pagesA/static/hezi@2x.png" mode="aspectFill"></image> -->
						<image :src="getIcon(item, index)" mode="aspectFill"></image>
						
					</view>
				</view>
				<!-- <view class="camera_footer_li center" @click="unpack(index)" v-for="(item,index) in 2" :key="index">
					{{ index == 0 ? ( i == 0 ? '随机一个' : '随机五个') : '开箱' }}
				</view> -->
				<view class="mybtn">
					<image :src="getNumBtn()" @click="unpack(0)"></image>
					<image src="../static/openx.png" @click="unpack(1)"></image>
				</view>
			</view>
			<view class="camera_footer">
				
				
				<view class="xz">开盲盒细则</view>
				
				<!-- <view class="sj">【随机一个】</view> -->
				<view class="nr" v-html="notice_to_buyers">
					
				</view>
				
				<!-- <view class="sj">【开箱】</view>
				<view class="nr" v-html="notice_to_buyers"> -->
				<!-- </view> -->
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
				<view class="prize_box">
					<view class="prize_close" @click="$refs.prize.close()">
						<image src="../static/guanbi@2x.png" mode=""></image>
					</view>
					<view class="prize-top" :class="`prize-top-${i}`">
					  <image src="../static/gaizi@2x.png" mode="aspectFit"></image>
					</view>
          <!-- 1开 -->
          <view :class="['prize_shop', 'center', 'onebox', 'tag-' + tag, scale && 'prize_shop_scale']" v-if="i == 0">
						<view class="left-top-tag">
							<image class="tag-img" :src="tagImg" mode="aspectFit"></image>
							<text class="tag-text">{{tagText}}</text>
						</view>
						<image class="one" v-if="prizedata&&prizedata.prizeInfo" :src="prizedata.prizeInfo[0].image" mode="widthFix"></image>
						<text class="colorblack" v-if="prizedata&&prizedata.prizeInfo">{{ prizedata.prizeInfo[0].goods_name }}</text>
					</view>
          <!-- 5开or10开 -->
					<view class="prize_ul" :class="`prize_ul-${i}`" v-else>
						<!-- <scroll-view scroll-x="true" class="scroll-view"> -->
							<view :class="['prize_ul_li', 'twobox', 'flex', 'tag-' + tagFun(item)]" v-for="(item,index) in prizedata.prizeInfo" :key="index">
								<view class="left-top-tag">
									<image class="tag-img" :src="tagImgFun(item)" mode="aspectFit"></image>
									<text class="tag-text">{{tagTextFun(item)}}</text>
								</view>
								<image class="two" :src="item.image" mode="widthFix"></image>
								<text class="a">{{ item.goods_name }}</text>
							</view>
						<!-- </scroll-view> -->
					</view>
					<view class="prize_footer" :class="`prize_footer-${i}`" v-if="type == 0">
            <!-- 立即收下 -->
            <view class="btn btn-1" @click="recycle(1)"></view>
            <!-- 一键回收 -->
            <view class="btn btn-0" @click="recycle(0)"></view>
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
        <view class="sure" @click="$refs.recycle.close()">
          确定
        </view>
			</view>
		</uni-popup>
		<view v-show="openLoading" class="loading-mask">
			<image class="loading-gif" src="/h5/pagesA/static/kh.gif" mode="aspectFit"></image>
		</view>
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
				openLoading: false,//打开盒子加载状态
				notice_to_buyers:"",
				scale: false
			};
		},
		computed:{
			//当前单抽商品
			currPrizedata(){
				if(!this.prizedata){
					return null
				}
				if(!this.prizedata.prizeInfo || this.prizedata.length < 1){
					return null
				}
				return this.prizedata.prizeInfo[0]
			},
			//单抽商品品质
			tag(){
				return this.tagFun(this.currPrizedata)
			},
			//单抽品质文本
			tagText(){
				return this.tagTextFun(this.currPrizedata)
			},
			//单抽品质角标
			tagImg(){
				return this.tagImgFun(this.currPrizedata)
			}
		},
		mounted(){
			let audio = document.getElementById("audio").querySelector("audio")
			audio.play()
		},
		methods:{
			getNumBtn()
			{
				if(this.i == 0){
					return "../static/round.png"
				}else if(this.i == 1){
					return "../static/round.png"
				}else{
					return "../static/round.png"
				}
			},
			getIcon(item, index)
			{
				if(this.prizeList.indexOf(index) !=-1 || this.indexs == index){
					console.log(1)
					return "../static/in.png";
				}else{
					return "../static/un.png";
				}
			},
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
					//进入发货
					// uni.redirectTo({url:'/pages/me/applyFaHuo?id=' + ids.join(',')})
					//进入鞋柜
					uni.navigateTo({url:'/pages/me/myBox'})
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
							//开启动画
							this.openLoading = true
							this.playMp3()
						} else {
							this.openResult()
							// this.$refs.prize.open()
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
					} else if (this.i == 1){
						if (this.prizeList.length < 5) return uni.showToast({title:'请选择五个盒子',icon:'none'})
					}else{
						if (this.prizeList.length < 9) return uni.showToast({title:'请选择九个盒子',icon:'none'})
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
					this.openResult()
					// this.$refs.prize.open()
					//关闭加载动画
					this.openLoading = false
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
					} else if(this.i == 0){
						if (this.prizeList.length == 1) {
							this.prizeList = []
						}
					}else{
						if (this.prizeList.length == 9) {
							this.prizeList.shift()
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
        this.$api.agreement({name:'notice_to_buyers'}).then(res=>{
        	if (res.code === 1) {
        		this.notice_to_buyers = res.data.content
        	}
        })
        
			},
			//创建订单
			createOrder (index) {
				var n = 1;
				if(this.i == 1) n = 5;
				if(this.i == 2) n = 9;
				this.$api[this.type == 1 ? 'haveATry' : 'createOrder']({box_id:this.box_id,num:n,msg:this.type == 1 ? '试玩' : '创建订单中',select:this.prizeList.join(',')}).then(res=>{
					if (res.code === 1) {
						if (this.type == 1) {
							this.prizedata = {prizeInfo:res.data.goodsInfo} 
							this.$refs.popup.close()
							if (!this.isHand) {
								this.startRoll()
								this.playMp3()
							} else {
								this.openResult()
								// this.$refs.prize.open()
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
			//打开结果页面
			openResult(){
				//品质不等于普通 
				if(this.tag != 'normal'){
					//开启震动
					try{
						uni.vibrate({
						    success: function () {
						        console.log('震动');
						    }
						});
					}catch(e){
						console.log(e)
					}
					//开启效果
					this.scale = true
					setTimeout(() => {
						this.scale = false
					}, 1000)
				}
				//打开结果
				this.$refs.prize.open()
			},
			//商品品质
			tagFun(prizeInfo){
				if(!prizeInfo) return null
				return prizeInfo.tag
			},
			//品质文本
			tagTextFun(prizeInfo){
				if(!prizeInfo) return null
				if(prizeInfo.tag == 'normal'){
					return "普通"
				}
				if(prizeInfo.tag == 'rare'){
					return "欧皇"
				}
				if(prizeInfo.tag == 'supreme'){
					return "超神"
				}
			},
			//品质角标
			tagImgFun(prizeInfo){
				if(!prizeInfo) return null
				if(prizeInfo.tag == 'normal'){
					return "/h5/pagesA/static/tag-1.png"
				}
				if(prizeInfo.tag == 'rare'){
					return "/h5/pagesA/static/tag-2.png"
				}
				if(prizeInfo.tag == 'supreme'){
					return "/h5/pagesA/static/tag-3.png"
				}
			}
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
	page{
		min-height: 100%;
    background-color: #693bec;
	}
  .sure{padding: 10rpx 20rpx;border-radius: 30rpx;font-size: 26rpx;background-color: #FFCB0F;color: #fff;width: 200rpx;text-align: center;margin: 0 auto;margin-top: 40rpx;}
	.one{height: 252rpx;width: 252rpx;}
	.two{height: 126rpx;width: 126rpx;}
	.onebox{height: 372rpx;width: 352rpx;border-radius:26rpx;background-color: #fff;}
	.twobox{height: 186rpx;width: 176rpx;border-radius:13rpx;background-color: #fff;
		
	}
	
	.sj{
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #AC3800;
		line-height: 40rpx;
		padding-left: 36rpx;
	}
	
	.nr{
		padding: 0 55rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #AC3800;
		line-height: 40rpx;
	}
	
	.xz{
		text-align: center;
		height: 48rpx;
		font-size: 34rpx !important;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #AC3800;
		line-height: 48rpx;
	}
	
	
	.mybtn{
		display: flex;
		width: 100%;
		justify-content: space-between;
		padding: 20rpx 32rpx 36rpx 32rpx;
		image{
			width: 308rpx;
			height: 84rpx;
		}
	}
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
	// height: calc(100vh - 88rpx);
	height: 793px;
	padding-top: 58rpx;
	background: url(../static/choubg@2x.png) no-repeat;
	background-color: #693BEC;
	background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
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
		width: 680rpx;
		height: 1000rpx;
		margin: 0 auto;
		
		// background: url(../static/xuanzehezi@2x.png) no-repeat;
		background-size: 100% 100%;
		.camera_main_box_name {
			line-height: 132rpx;
			text-align: center;
			padding-top: 50rpx ;
			height: 60rpx;
			font-size: 44rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #EDEC6F;
		}
		.camera_main_box_ul {
			width: 100%;
			padding: 0 118rpx;
			margin: 0 auto;
			margin-top: 140rpx;
			flex-wrap: wrap;
			justify-content: space-between;
			.camera_main_box_li {
				width: 140rpx;
				height: 164rpx;
				margin-bottom: 42rpx;
				&:nth-child(4n) {
					margin-right: 0;
				}
				// background: url(../static/hezibeijing@2x.png) no-repeat;
				background-size: cover;
				// border-image: linear-gradient(164deg, #FFA800, #FF3904, #FF8A00) 2 2;
				border-radius: 8rpx;
				image {
					width: 100%;
					height: 100%;
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
	width: 722rpx;
	// background: linear-gradient(180deg, #F3E163 0%, #F5E76B 100%);
	margin: 0 auto;
  background-color: #f4e569;
  border: 4rpx solid;
  border-top: 0;
  border-bottom: 0;
  padding: 20rpx;
	// border: 4rpx solid #000000;
	// margin-top: 190rpx;
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
	justify-content: center;
	.prize_box {
		width: 100%;
		height: 1120rpx;
		position: relative;
		flex-direction: column;
		background: url(../static/guang@2x.png) no-repeat;
		background-size: 100% auto;
    background-position: top;
    background-repeat: no-repeat;
		.prize_close {
			width: 64rpx;
			height: 64rpx;
			top: 64rpx;
			right: 30rpx;
			position: absolute;
		}
    .prize-top {
      width: 528rpx;
      height: 170rpx;
      position: absolute;
      top: 120rpx;
      left: 118rpx;
      &-2 {
        top: 40rpx;
      }
    }
    .prize_footer {
      width: 100%;
      height: 472rpx;
      background-image: url(../static/btns@2x.png);
      background-position: center;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      position: absolute;
      left: 0;
      bottom: -34rpx;
      &-2 {
        bottom: -114rpx;
      }
      .btn {
        width: 310rpx;
        height: 84rpx;
        border-radius: 16rpx;
        position: absolute;
        left: 220rpx;
      }
      .btn-1 {
        top: 210rpx;
      }
      .btn-0 {
        top: 316rpx;
      }
    }
	}
	.shiwan {
		background: url(../../static/image/open/tanchuangbeijing@2x.png) no-repeat;
		background-size: cover;
	}
	.prize_ul{
		width: 566rpx;
		// padding: 0 92rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
    position: absolute;
    top: 336rpx;
    left: 92rpx;
    &-2 {
      top: 226rpx;
    }
		&::after{
			content: "";
			width: 176rpx;
		}
	}
	// .scroll-view {
	// 	width: 522rpx;
	// 	white-space:nowrap;
		.prize_ul_li {
			margin-bottom: 16rpx;
			position: relative;
			width: 176rpx;
			height: 186rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			display: flex;
			padding: 8rpx 0;
			// margin-right: 20rpx;
			box-sizing: border-box;
			
			image {
				margin: 0 auto;
			}
			text {
				font-size: 24rpx;
				// font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #171A20;
				width: 146rpx;
				overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
			}
			.left-top-tag{
				width: 3rem;
				height: 3rem;
				.tag-text{
					font-size: 0.6rem !important;
				}
			}
		}
	// }
	.prize_shop {
		transition: 1s;
    position: absolute;
    top: 336rpx;
    left: 198rpx;
		display: flex;
		flex-direction: column;
		image {
			width: 174rpx;
			height: 235rpx;
			margin-bottom: 20rpx;
		}
		text {
			width: 70%;
			font-size: 16rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #171A20;
			overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
      text-align: center;
		}
		.colorblack{
			font-size: 32rpx !important;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #171A20;
		}
		.left-top-tag{
			width: 5rem;
			height: 5rem;
			.tag-text{
				font-size: 1rem;
			}
		}
	}
	.tag-rare{
		box-shadow: 0 0 40rpx 18rpx #dd00ff91;
	}
	.tag-supreme{
		box-shadow: 0 0 40rpx 32rpx #ffd700ab;
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
.left-top-tag{
	z-index: 999999;
	position: absolute;
	left: -2px;
	top: -3px;
	.tag-img{
		height: 100% !important;
		width: 100% !important;
	}
	.tag-text{
		position: absolute;
		top: 30%;
		left: 30%;
		color: #fff !important;
		width: auto !important;
		transform: translateX(-50%) translateY(-50%) rotate(-45deg);
	}
}
.prize_shop_scale{
	transform: scale(1.3);
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

.loading-mask{
	position: fixed;
	height: 100vh;
	width:100vw;
	top: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #76767652;
	.loading-gif{
		width: 60%;
	}
}
</style>
