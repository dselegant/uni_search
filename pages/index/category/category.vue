<template>
	<view class="categoryContanier">
		<!-- 顶部导航条 -->
		<view class="topBarContanier">
			<view class="topBar">
				<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text"
					activeColor="#d4237a"></uni-segmented-control>
			</view>
		</view>
		<!-- 显示内容 -->
		<scroll-view scroll-y="true" class="categoryScroll" @scrolltolower="scrolltolower">
			<!-- 图片列表 -->
			<view class="content">
				<imgList-com :imgList="current == 0?list.newList:list.hotList"></imgList-com>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import imgListCom from "@/components/imgList/imgList.vue"

	export default {
		data() {
			return {
				id: 0,
				current: 0,
				items: ["最新", "热门"],
				// 请求参数
				params: [{
						limit: 30,
						order: "new",
						skip: 0
					},
					{
						limit: 30,
						order: "hot",
						skip: 0
					}
				],
				list: {
					// 最新
					newList: [],
					// 最热
					hotList: []
				}
			};
		},
		onLoad(Object) {
			this.id = Object.id;
			this.getData(this.params[0]);
			uni.$on("toImgDetail",(id,imgSrc)=>{
				uni.navigateTo({
					url:`/pages/index/imgDetail/imgDetail?id=${id}&imgSrc=${imgSrc}`
				})
			})
		},
		methods: {
			onClickItem(index) {
				if (this.current !== index.currentIndex) {
					// 切换时清空列表
					if (this.current == 0) {
						this.list.newList = [];
					} else {
						this.list.hotList = [];
					}
					// 改变数据
					this.getData(this.params[index.currentIndex])
					this.current = index.currentIndex;
				}
			},
			async getData(params) {
				let ret = await this.request(`http://service.picasso.adesk.com/v1/vertical/category/${this.id}/vertical`, params);
				if (ret) {
					// 判断请求类型
					if (params.order == "new") {
						if (ret.res.vertical.length > 0) {
							this.list.newList = [...this.list.newList, ...ret.res.vertical];
						} else {
							uni.showToast({
								title: "没有新的图片了",
								icon: "none"
							})
						}
					} else {
						// 判断是否有数据
						if (ret.res.vertical.length > 0) {
							this.list.hotList = [...this.list.hotList, ...ret.res.vertical];
						} else {
							uni.showToast({
								title: "没有新的图片了",
								icon: "none"
							})
						}
					}
				}
			},
			// 下拉触底添加数据
			scrolltolower() {
				if (this.current == 0) {
					this.params[0].skip += 30;
					this.getData(this.params[0])
				} else {
					console.log("热门");
					this.params[1].skip += 30;
					this.getData(this.params[1])
				}
			},


		},
		components: {
			imgListCom
		}
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
	}

	.categoryScroll {
		// height: calc(100vh-80rpx);
		height: 1130rpx;
	}
</style>
