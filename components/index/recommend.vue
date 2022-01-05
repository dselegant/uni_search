<template>
	<view class="recommedContanier">
		<!-- 推荐滚动区 -->
		<scroll-view scroll-y="true" class="recommendScroll" @scrolltolower="scrolltolower">
			<!-- 横幅 -->
			<view class="bannerList">
				<view class="banner" v-for="(item,index) in bannerList" :key="item._id">
					<image :src="item.thumb" mode="widthFix"></image>
				</view>
			</view>
			<!-- 月份 -->
			<view class="monthContaniner">
				<!-- 头部信息 -->
				<view class="header">
					<view class="time"><text class="day">{{time.day}}</text>/ {{time.month}}月</view>
					<view class="title">{{title}}</view>
					<view class="more">更多></view>
				</view>
				<!-- <view class="monthList">
					<view class="month" v-for="(item,index) in monthList" :key="item.id">
						<image mode="aspectFill" :src="item.thumb"></image>
					</view>
				</view> -->
				<imgList-com :imgList="monthList"></imgList-com>
			</view>
			<!-- 热门 -->
			<view class="hotContanier">
				<view class="header">
					热门
				</view>
<!-- 				<view class="hotList">
					<view class="hot" v-for="(item,index) in hotList" :key="item.id">
						<image mode="aspectFill" :src="item.thumb"></image>
					</view>
				</view> -->
				<imgList-com :imgList="hotList"></imgList-com>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import moment from "moment"
	import imgListCom from "@/components/imgList/imgList.vue"
	export default {
		name: "recommend",
		data() {
			return {
				// 横幅
				bannerList: [],
				// 月份
				monthList: [],
				// 时间
				time: {
					month: "",
					day: ""
				},
				// 标题
				title:"",
				// 热门
				hotList: [],
				params:{
					limit: 30,
					order: "hot",
					skip: 0
				}
			};
		},
		created() {
			this.getData();
			// 监听跳转事件
			uni.$on("toImgDetail",(id,imgSrc)=>{
				uni.navigateTo({
					url:`/pages/index/imgDetail/imgDetail?id=${id}&imgSrc=${imgSrc}`
				})
			})
		},
		components:{
			imgListCom
		},
		methods: {
			// 获取页面所有数据
			async getData() {
				let dataList = await this.request("http://service.picasso.adesk.com/v3/homepage/vertical",this.params)
				// 获取初始横幅图和月份
				if (dataList.res.homepage.length > 0 && this.bannerList.length ==0) {
					// 横幅
					this.bannerList = dataList.res.homepage[1].items;
					// 月份
					this.monthList = dataList.res.homepage[2].items;
					// 标题
					this.title = dataList.res.homepage[2].title
					// 时间
					this.time.day = moment(dataList.res.homepage[2].stime).format("DD");
					this.time.month = moment(dataList.res.homepage[2].stime).format("MM")
				}
				// 热门		
				if (dataList.res.vertical.length > 0) {
					this.hotList = [...this.hotList,...dataList.res.vertical];
				}else{
					uni.showToast({
						title:"没有新的图片了",
						icon:"none"
					})
				}
			},
			scrolltolower() {
				this.params.skip+=30;
				this.getData();
			}

		},
	}
</script>

<style lang="scss" scoped>
	.recommendScroll {
		height: 100vh;
		padding: 10rpx 20rpx;

		// 横幅
		.bannerList {
			display: flex;
			flex-wrap: wrap;

			// 图片
			.banner {
				padding: 8rpx;
				width: 50%;
			}
		}

		// 月份
		.monthContaniner {
			padding-top: 20rpx;

			// 头部信息
			.header {
				padding: 0 20rpx;
				display: flex;
				position: relative;
				line-height: 66rpx;
				font-weight: bold;

				// 时间
				.time {
					font-size: 40rpx;
					color: #d4237a;

					// 日
					.day {
						font-size: 50rpx;
						padding-right: 10rpx;
					}
				}

				// 标题
				.title {
					padding-left: 20rpx;
					font-size: 40rpx;
				}

				.more {
					position: absolute;
					right: 0;
					font-size: 30rpx;
				}
			}

			// 月份
			// .monthList {
			// 	display: flex;
			// 	flex-wrap: wrap;
			// 	.month {
			// 		width: 33.3%;
			// 		height: 360rpx;
			// 		border: 5rpx solid #fff;
			// 		image {
			// 			width: 100%;
			// 			height: 100%;
			// 		}
			// 	}
			// }
		}

		// 热门
		.hotContanier {
			padding: 20rpx 11rpx;
			.header {
				font-size: 40rpx;
				padding-left: 10rpx;
				border-left: 10rpx solid #d4237a;
				font-weight: bold;
				margin-bottom: 10rpx;
				
			}
			// .hotList {
			// 	display: flex;
			// 	flex-wrap: wrap;
			// 	.hot {
			// 		width: 33.3%;
			// 		height: 360rpx;
			// 		border: 5rpx solid #fff;
			// 		image {
			// 			width: 100%;
			// 			height: 100%;
			// 		}
			// 	}
			// }
		}
	}
</style>
