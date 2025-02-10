<template>
	<view class="invite">
    <view class="invite_head flex">
    	<image src="../static/fanhui@2x.png" mode="" @click="retutnTop"></image>
    	<text class="title">代理中心</text>
    	<text class="righticon"></text>
    </view>
    
    <v-tabs v-model="current" :tabs="tabs" @change="changeTab"
    :fixed="false" :scroll="false" activeColor="#171A20" lineColor="#171A20" bgColor="transparent"
    fontSize="30rpx" lineHeight="6rpx" lineRadius="6rpx" :lineScale="0.15"></v-tabs>
    <swiper class="swiper" circular :current="current" @change="swiperChange">
      <swiper-item>
        <view class="coin-swiper">
          <view class="total-coin-view flex" style="justify-content: flex-start;align-items: flex-end;">
            <view class="">
              <text class="txt">总收益</text>
              <view class="coin-unit">
                <text class="coin">{{totalIn || 0}}</text>
                <text class="unit">&nbsp;元</text>
              </view>
            </view>
            <view class="" style="margin: 0 40rpx;">
              <text class="txt">已提现</text>
              <view class="coin-unit">
                <text class="coin">{{withd || 0}}</text>
                <text class="unit">&nbsp;元</text>
              </view>
            </view>
            
            <view class="tixian-btn" @click="toDeposit">提现</view>
          </view>
          <view class="nodata" v-if="retailList.length==0 && retailStatus=='noMore'">
            暂无数据
          </view>
          <scroll-view class="coin-list-view" scroll-y="true"
          @scrolltolower="lower('retail')">
            <view class="coin-item flex" v-for="(item, index) in retailList" :key="index">
              <view class="left flex">
                <view class="avatar-view">
                  <image :src="item.avatar || $imgDomain+'/default.png'" mode="aspectFit"></image>
                </view>
                <view class="name-time">
                  <view class="username">
                    {{item.nickname || 昵称}}
                  </view>
                  <view class="time">
                    {{item.create_time || 时间}}
                  </view>
                </view>
              </view>
              <view class="right">
                <view class="in-coin">
                  +{{item.coin || 佣金}}元
                </view>
                <view class="level">
                  {{item.level}}级
                </view>
              </view>
            </view>
          </scroll-view>
        </view>
      </swiper-item>
      <swiper-item>
        <view class="team-swiper">
          <view class="nodata" v-if="teamList.length==0 && teamStatus=='noMore'">
            暂无数据
          </view>
          <view class="team-wrapper">
            <view class="top-view flex" v-if="teamList.length > 0">
              <text>时间</text>
              <text>用户</text>
              <text>渠道</text>
            </view>
            <scroll-view class="team-list-view" scroll-y="true" 
            @scrolltolower="lower('team')">
                <view class="team-item flex" v-for="(item, index) in teamList" :key="index">
                  <text class="time-view">{{item.create_time || 时间}}</text>
                  <text class="name-view">{{item.username || 昵称}}</text>
                  <text>{{item.level || 渠道}}</text>
                </view>
            </scroll-view>
          </view>
        </view>
      </swiper-item>
      <swiper-item>
        <view class="qrcode-swiper">
          <view class="qrcode-wrap">
            <!-- <view class="qrcode-view">
              <view class="qrcode-box">
                <view class="qrcode-img-box">
                  <image :src="info.qr_code" mode="aspectFill"></image>
                </view>
              </view>
            </view> -->
            <canvas class="qrcode-view" canvas-id="firstCanvas" id="firstCanvas" v-if="!canvasImage"></canvas>
            <view class="qrcode-view" v-if="canvasImage">
              <!-- <image :src="canvasImage" mode="aspectFit"></image> -->
              <img class="img1" :src="canvasImage"/>
            </view>
            <!-- #ifndef H5 -->
            <view class="btn-view"></view>
            <!-- #endif -->
            <!-- #ifdef H5 -->
            <view class="tip">
              长按图片保存
            </view>
            <!-- #endif -->
          </view>
        </view>
      </swiper-item>
    </swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{},
        current: 0,
        tabs: ['佣金', '团队', '推广'],
        totalIn: 0,
        withd: 0, //已提现
        retailList: [],
        retailPage: 1,
        retailPageSize: 10,
        retailStatus: 'more',
        teamList: [],
        teamPage: 1,
        teamPageSize: 10,
        teamStatus: 'more',
        
        canvasImage: ''
			};
		},
    onLoad () {
      this.$api.getTotalCoin().then(data => {
        this.totalIn = data.data.total
        this.withd = data.data.dw
      })
      this.loadRetailList()
      this.loadTeamList()
    	this.getInfo()
    },
		methods:{
      toDeposit () {
        uni.navigateTo({url:'/pages/me/deposit'})
      },
      changeTab (index) {
        console.log('当前选中的项：' + index)
      },
      swiperChange ({ detail }) {
        this.current = detail.current
      },
			//返回上一级
			retutnTop () {
				uni.navigateBack()
			},
      loadRetailList () {
        if (this.retailStatus == 'loading' || this.retailStatus == 'noMore') {
          return
        }
        this.retailStatus = 'loading'
        let query = {
          page: this.retailPage,
          limit: this.retailPageSize
        }
        this.$api.getRetailList(query).then(data => {
          const list = data.data
          this.retailList = [...this.retailList, ...list]
          if (list.length < this.retailPageSize) {
            this.retailStatus = 'noMore'
          } else {
            this.retailStatus = 'more'
          }
        })
      },
      loadTeamList () {
        if (this.teamStatus == 'loading' || this.teamStatus == 'noMore') {
          return
        }
        this.teamStatus = 'loading'
        let query = {
          page: this.teamPage,
          limit: this.teamPageSize
        }
        this.$api.getTeamList(query).then(data => {
          const list = data.data
          this.teamList = [...this.teamList, ...list]
          if (list.length < this.teamPageSize) {
            this.teamStatus = 'noMore'
          } else {
            this.teamStatus = 'more'
          }
        })
      },
      lower (type = 'team') {
        switch (type) {
          case 'team':
            if (this.teamStatus == 'more') {
              this.teamPage++
              this.loadTeamList()
            }
            break;
          case 'retail':
            if (this.retailStatus == 'more') {
              this.retailPage++
              this.loadRetailList()
            }
            break;
        }
      },
			getInfo () {
				this.$api.userinfo().then(res=>{
					if (res.code === 1) {
						this.info = res.data
            this.makeCanvas()
					}
				})
			},
      makeCanvas () {
        var _this = this
        var ctx = uni.createCanvasContext('firstCanvas')
        const res = uni.getSystemInfoSync()
        var canvasW = 560*res.screenWidth/750, 
        canvasH = 1000*res.screenWidth/750
        uni.getImageInfo({
          src: '../static/renwu@2x.png',
          success: function (bg) {
            ctx.drawImage(bg.path, 0, 0, canvasW, canvasH)
            uni.getImageInfo({
              src: '../static/renwu@2x.png',
              success: function (bg2) {
                let w = canvasW
                let h = bg2.height/bg2.width * w
                let x = 0
                let y = (canvasH-h) / 2
                ctx.drawImage(bg2.path, x, y, w, h)
                uni.getImageInfo({
                  src: _this.info.qr_code,
                  success: function (qrcode) {
                    let w = 200 * res.screenWidth/750
                    let x = (canvasW-w)/2
                    let y = 370 * res.screenWidth/750
                    ctx.drawImage(qrcode.path, x, y, w, w)
                    ctx.draw(false, setTimeout(() => {
                      uni.canvasToTempFilePath({
                        x: 0,
                        y: 0,
                        width: canvasW,
                        height: canvasH,
                        canvasId: 'firstCanvas',
                        success: function(res) {
                          // 在H5平台下，tempFilePath 为 base64
                          // alert('成功')
                          _this.canvasImage = res.tempFilePath
                          console.log(_this.canvasImage)
                        }
                      }, _this)
                    }, 1000))
                  }
                });
              }
            });
          }
        });
      },
		}
	}
</script>

<style lang="scss" scoped>
page {
  background-color: #F5F6FA;
}
$swiperH: calc(100vh - 70rpx - 44px);
.invite {
  background-image: url(../static/topbg@2x.png);
  background-repeat: no-repeat;
  background-position: top;
  background-size: 100% calc(44px + 70rpx);
  .invite_head {
  	width: 100%;
  	height: 44px;
  	padding: 0 20rpx;
  	image {
  		width: 44rpx;
  		height: 44rpx;
  	}
  	.title {
      font-size: 34rpx;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #333333;
      line-height: 36rpx;
  	}
    .righticon {
      width: 44rpx;
      height: 44rpx;
    }
  }
  
  .swiper{
    height: $swiperH;
  }
  .coin-swiper{
    .total-coin-view{
      width: 690rpx;
      height: 200rpx;
      background-image: url(../static/bg@2x.png);
      background-repeat: no-repeat;
      background-size: 100%;
      background-position: center;
      margin: 24rpx auto 0;
      padding: 48rpx 40rpx;
      .txt {
        font-size: 28rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
      }
      .coin-unit {
        justify-content: flex-start;
        .coin {
          font-size: 40rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #FFFFFF;
        }
        .unit {
          font-size: 28rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #FFFFFF;
        }
      }
      .tixian-btn{
        height: 50rpx;
        line-height: 50rpx;
        text-align: center;
        color: #FFFFFF;
        font-size: 30rpx;
        border-radius: 39rpx;
        background: #FA7E48;
        padding: 0 40rpx;
      }
    }
    .coin-list-view {
      max-height: calc(100vh - 70rpx - 44px - 24rpx - 200rpx);
      .coin-item{
        width: 690rpx;
        background-color: #FFF;
        margin: 20rpx auto;
        border-radius: 16rpx;
        padding: 30rpx;
        .left {
          .avatar-view{
            width: 80rpx;
            height: 80rpx;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 20rpx;
            border: 1px solid #eee;
          }
          .name-time {
            .username {
              font-size: 28rpx;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #333333;
              line-height: 40rpx;
            }
            .time {
              font-size: 24rpx;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #7A808D;
              line-height: 34rpx;
            }
          }
        }
        .right {
          text-align: right;
          .in-coin{
            font-size: 32rpx;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #FA6400;
            line-height: 44rpx;
          }
          .level {
            font-size: 24rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
            line-height: 34rpx;
          }
        }
      }
    }
  }
  .team-swiper{
    .team-wrapper{
      overflow: hidden;
      .top-view {
        background: #FFF;
        border-radius: 24rpx 24rpx 0 0;
        width: 690rpx;
        margin: 24rpx auto 0;
        font-size: 28rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #2E333F;
        padding: 32rpx 30rpx 14rpx;
        height: 86rpx;
      }
      .team-list-view{
        max-height: calc(100vh - 70rpx - 44px - 24rpx - 86rpx);
        // padding-bottom: 24rpx;
        .team-item{
          width: 690rpx;
          margin: 0 auto;
          height: 88rpx;
          padding: 0 30rpx;
          background-color: #F9F5FF;
          font-size: 26rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #171A20;
          line-height: 36rpx;
          justify-content: flex-start;
          &:nth-child(2n-1) {
            background-color: #F6F8FF;
          }
          &:last-child {
            border-radius: 0 0 24rpx 24rpx;
            margin-bottom: 24rpx;
          }
          .time-view{
            width: 288rpx;
          }
          .name-view{
            width: 300rpx;
          }
        }
      }
    }
  }
  .qrcode-swiper{
    position: relative;
    &::before {
      // content: '';
      width: 54rpx;
      height: calc(1000rpx - 100rpx);
      background: #CDC7C7;
      border-radius: 0 24rpx 24rpx 0;
      position: absolute;
      left: 0;
      top: 50rpx;
    }
    &::after {
      // content: '';
      width: 54rpx;
      height: calc(1000rpx - 100rpx);
      background: #CDC7C7;
      border-radius: 24rpx 0 0 24rpx;
      position: absolute;
      right: 0;
      top: 50rpx;
    }
    .qrcode-wrap{
      overflow-y: auto;
      height: $swiperH;
    }
    .qrcode-view {
      .img1{
        width: 100%;
        height: 100%;
      }
      width: 560rpx;
      height: 1000rpx;
      margin: 26rpx auto 0;
      background: #FF7674;
      border-radius: 24rpx;
      background-image: url(../static/bj.png);
      background-repeat: no-repeat;
      background-size: 100% auto;
      background-position: center;
      position: relative;
      display: flex;
      overflow: hidden;
      .qrcode-box{
        width: 100%;
        background-image: url(../static/renwu@2x.png);
        background-repeat: no-repeat;
        background-size: 100% auto;
        background-position: center;
      }
      .qrcode-img-box{
        width: 200rpx;
        height: 200rpx;
        position: absolute;
        top: 370rpx;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    
    .btn-view{
      width: 308rpx;
      height: 84rpx;
      background-image: url(../static/button@2x.png);
      margin: 50rpx auto;
      background-size: 100%;
      background-position: center;
    }
    .tip{
      margin: 50rpx auto;
      text-align: center;
      font-size: 33rpx;
    }
  }
  
  .nodata{
    text-align: center;
    padding: 40% 0;
    font-size: 30rpx;
  }
}
</style>
