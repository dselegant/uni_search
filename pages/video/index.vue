<template>
	<view class="videoContanier">
		<!-- 顶部导航条 -->
		<view class="topBarContanier">
			<view class="topBar">
				<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text"
					activeColor="#d4237a"></uni-segmented-control>
			</view>
			<!-- 搜索图标 -->
			<view class="iconfont iconsearch"></view>
		</view>
		<!-- 显示内容 -->
		<view class="content">
			<scroll-view scroll-y="true" class="imgListScroll" @scrolltolower="handleLower">
				<view class="imgList">
					<view class="img" v-for="(item,index) in imgList" :key="item.id" @tap="toVideoDetail(item.img,item.video)">
						<image mode="aspectFill" :src="item.img"></image>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				items: ["推荐", "娱乐", "最新", "热门"],
				imgList: [],
				infos: [{
						title: "推荐",
						url: "http://157.122.54.189:9088/videoimg/v1/videowp/featured",
						params: {
							limit: 30,
							skip: 0,
							order: "hot"
						}
					},
					{
						title: "娱乐",
						url: "http://157.122.54.189:9088/videoimg/v1/videowp/category/59b25abbe7bce76bc834198a",
						params: {
							limit: 30,
							skip: 0,
							order: "new"
						}
					},
					{
						title: "最新",
						url: "http://157.122.54.189:9088/videoimg/v1/videowp/videowp",
						params: {
							limit: 30,
							skip: 0,
							order: "new"
						}
					},
					{
						title: "热门",
						url: "http://157.122.54.189:9088/videoimg/v1/videowp/videowp",
						params: {
							limit: 30,
							skip: 0,
							order: "hot"
						}
					},
					{
						title: "分类",
						url: "http://157.122.54.189:9088/videoimg/v1/videowp/category",
						params: {}
					}
				]
			}
		},
		created() {
			// 初始化数据
			this.getData(0);
		},
		methods: {
			onClickItem(index) {
				if (this.current !== index.currentIndex) {
					// 点击时更新数据
					this.infos[index.currentIndex].params.skip=0;
					this.getData(index.currentIndex)
					this.current = index.currentIndex;
					
				}
			},
			async getData(index) {
				let ret = await this.request(this.infos[index].url, this.infos[index].params);
				if (ret) {
					if (ret.res.videowp.length>0){
						this.imgList = ret.res.videowp;
					}else{
						uni.showToast({
							title:"没有更多数据了···",
							icon:"none"
						})
					}
					
				}
			},
			handleLower(){
				this.infos[this.current].params.skip+=30;
				this.getData(this.current);
			},
			toVideoDetail(imgUrl,videoUrl){
				uni.navigateTo({
					url:`/pages/video/videoDetail/videoDetail?imgUrl=${imgUrl}&videoUrl=${videoUrl}`
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.topBarContanier {
		display: flex;
		align-items: center;
		height: 80rpx;

		// 导航条
		.topBar {
			width: 50%;
			margin: 0 auto;
		}

		.iconsearch {
			width: 50rpx;
			height: 50rpx;
			font-size: 39rpx;
		}
	}

	.imgList {
		display: flex;
		flex-wrap: wrap;

		.img {
			width: 33.3%;
			height: 360rpx;
			border: 5rpx solid #fff;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.imgListScroll {
		height: 1020rpx;
	}
</style>
