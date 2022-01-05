<template>
	<view class="indexContanier">
		<!-- 顶部导航条 -->
		<view class="topBarContanier">
			<view class="topBar" >
				<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text"
					activeColor="#d4237a"></uni-segmented-control>
			</view>
			<!-- 搜索图标 -->
			<view class="iconfont iconsearch"></view>
		</view>
		<!-- 显示内容 -->
		<view class="content">
			<view v-show="current === 0">
				<!-- 推荐内容 -->
				<recommend-com></recommend-com>
			</view>
			<view v-show="current === 1">
				<categoryList-com></categoryList-com>
			</view>
			<view v-show="current === 2">
				选项卡3的内容
			</view>
			<!-- 专辑 -->
			<view v-show="current === 3">
				<album-com></album-com>
			</view>
		</view>
	</view>
</template>

<script>
	import recommendCom from "../../components/index/recommend.vue"
	import albumCom from "../../components/index/album.vue"
	import categoryListCom from "../../components/index/categoryList.vue"
	
	export default {
		data() {
			return {
				current: 0,
				items: ["推荐", "分类", "最新", "专辑"]
			}
		},
		components: {
			recommendCom,
			albumCom,
			categoryListCom
		},

		methods: {
			onClickItem(index) {
				if (this.current !== index.currentIndex) {
					this.current = index.currentIndex;
				}
			},
		// 	ds() {
		// 		switch (this.current) {
		// 			case 0:
		// 				uni.setNavigationBarTitle({
		// 					title: "首页"
		// 				});
		// 				break;
		// 			case 1:
		// 				uni.setNavigationBarTitle({
		// 					title: "分类"
		// 				});
		// 				break;
		// 			case 2:
		// 				uni.setNavigationBarTitle({
		// 					title: "最新"
		// 				});
		// 				break;
		// 			case 3:
		// 				uni.setNavigationBarTitle({
		// 					title: "专辑"
		// 				});
		// 				break;
		// 			default:
		// 				break;
		// 		}
		// 	}
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
			// background-color: #808080;
			font-size: 39rpx;
		}
	}
</style>
