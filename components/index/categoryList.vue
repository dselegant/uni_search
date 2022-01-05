<template>
	<view class="categoryContanier">
		<scroll-view scroll-y="true" class="categoryScroll">
			<!-- 分类 -->
			<view class="categoryList">
				<view class="categoryItem" v-for="(item,index) in categoryList" :key="item.id"
				@tap="toCateogry(item.id)">
					<image :src="item.cover"></image>
					<view class="name">{{item.name}}</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name:"categoryList",
		data() {
			return {
				categoryList:[]
			};
		},
		created() {
			this.getData();
		},
		methods:{
			async getData(){
				let ret = await this.request("http://service.picasso.adesk.com/v1/vertical/category");
				if (ret){
					this.categoryList = ret.res.category;
				}
			},
			toCateogry(id){
				uni.navigateTo({
					url:`/pages/index/category/category?id=${id}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.categoryScroll{
		height: 1030rpx;
		// height: 100vh;
		padding-bottom:10rpx;
	}
	// 分类列表
	.categoryList{
		display: flex;
		flex-wrap: wrap;
		padding: 0 10rpx;
		.categoryItem{
			position: relative;
			border: 5rpx solid #fff;
			width: 33.3%;
			image{
				height: 220rpx;
			}
			.name{
				width: 100%;
				position: absolute;
				bottom: 0;
				color: #fff;
				background-image: linear-gradient(to right top,rgba(0,0,0,.2),rgba(0,0,0,0));
				font-size: 40rpx;
				padding-left: 20rpx;
			}
		}
	}
</style>
