<template>
	<view class="albumDetailContanier">
		<!-- 头部 -->
		<view class="header">
			<image :src="detailInfo.lcover" mode="widthFix"></image>
			<view class="brief">
				<text class="title">{{detailInfo.name}}</text>
				<!-- 关注 -->
				<view class="attendtionContanier">
					<view class="attention">
						关注专辑
					</view>
				</view>
			</view>
		</view>
		<!-- 作者信息 -->
		<view class="userInfo">
			<view class="user">
				<view class="avatar">
					<image :src="detailInfo.user.avatar" mode="widthFix"></image>
				</view>
				<text class="username">{{detailInfo.user.name}}</text>
			</view>
			<view class="desc">
				{{detailInfo.desc?detailInfo.desc:"没有过多描述"}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:0,
				detailInfo:{}
			};
		},
		onLoad(Object){
			this.id = Object.id;
			this.getData();
		},
		methods:{
			async getData(){
				let ret = await this.request(`http://service.picasso.adesk.com/v1/wallpaper/album/${this.id}/wallpaper`,{
					limit: 30,
					order: "new",
					skip: 0,
					first:1
				});
				if (ret){
					this.detailInfo = ret.res.album;
				}
			}
		}
	}
</script>

<style lang="scss">
	.header {
		position: relative;
		padding-bottom: 20rpx;
		border-bottom: 2rpx solid #ccc;
		.brief {
			width: 80%;
			position: absolute;
			bottom: 50rpx;
			display: flex;
			justify-content: space-between;
			.title{
				padding-left: 30rpx;
				color: #fff;
				font-size: 40rpx;
				font-weight: bold;
			}
			// 关注容器
			.attendtionContanier {	
				overflow: hidden;
				// 关注
				.attention {
					margin-left: -30rpx;
					text-align: center;
					height: 60rpx;
					line-height: 60rpx;
					width: 150rpx;
					border: 2rpx solid #d4237a;
					position: absolute;
					background-color: #d4237a;
					color:#fff ;
					border-radius: 10rpx;
					font-size: 28rpx;
				}
			}
		}
	}
	// 作者信息
	.userInfo{
		padding: 15rpx;
		.user{
			display: flex;
			.avatar{
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				overflow: hidden;
			}
			.username{
				margin-top: 10rpx;
				font-size: 34rpx;
				color: #000;
				font-weight: bold;
			}
		}
		.desc{
			margin-top: 20rpx;
			font-size: 30rpx;

		}
	}
</style>
