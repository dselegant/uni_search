<template>
	<view class="imgList">
		<view class="img" v-for="(item,index) in imgList" :key="item.id"
		@tap="to1(item.id,item.thumb)">
			<image mode="aspectFill" :src="item.thumb"></image>
		</view>
	</view>
</template>

<script>
	export default {
		name: "imgList",
		props:["imgList"],
		data() {
			return {

			};
		},
		methods:{
			to1(id,imgSrc){
				// 传递参数
				uni.$emit("toImgDetail",id,imgSrc)
			}
		}

	}
</script>

<style lang="scss" scoped>
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
</style>
