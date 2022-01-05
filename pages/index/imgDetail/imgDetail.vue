<template>
	<view class="imgDetailContanier">
		<!-- 头部 -->
		<view class="header">
			<!-- 用户信息 -->
			<view class="userInfo">
				<!-- 头像 -->
				<view class="avatar">
					<image :src="avatar" mode="widthFix"></image>
				</view>
				<!-- 介绍 -->
				<view class="brief">
					<view class="name">
						DS
					</view>
					<text class="time">2年前</text>
				</view>
			</view>
			<!-- 图片 -->
			<view class="image">
				<image :src="img" mode="aspectFit"></image>
			</view>
			<!-- bar -->
			<view class="user_rank">
				<view class="rank">
					<text class="iconfont icondianzan">6666</text>
				</view>
				<view class="user_collect">
					<text class="iconfont iconshoucang">收藏</text>
				</view>
			</view>
		</view>
		<!-- 评论区 -->
		<view class="commentContanier" v-if="hot.length>0">
			<!-- 热门 -->
			<view class="hot">
				<!-- 标题 -->
				<view class="hotTitle">
					<text class="iconfont iconhot1"></text>
					<text class="comment_text">最热评论</text>
				</view>
				<!-- 评论项 -->
				<view class="hotItem" v-for="(item,index) in hot" :key="item.id">
					<view class="user">
						<image :src="item.user.avatar" mode="widthFix"></image>
						<view class="brief">
							<text>{{item.user.name}}</text>
							<view class="">
								{{item.atime}}
							</view>
						</view>
					</view>
					<!-- 评论 -->
					<view class="comment">
						<text class="comment_content">
							{{item.content}}
						</text>
						<text class="iconfont icondianzan">{{item.size}}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 评论区 -->
		<view class="commentContanier" v-if="comment.length>0">
			<!-- 最新 -->
			<view class="hot">
				<!-- 标题 -->
				<view class="hotTitle">
					<text class="iconfont iconpinglun"></text>
					<text class="comment_text">最新评论</text>
				</view>
				<!-- 评论项 -->
				<view class="hotItem" v-for="(item,index) in comment" :key="item.id">
					<view class="user">
						<image :src="item.user.avatar" mode="widthFix"></image>
						<view class="brief">
							<text>{{item.user.name}}</text>
							<view class="">
								{{item.atime}}
							</view>
						</view>
					</view>
					<!-- 评论 -->
					<view class="comment">
						<text class="comment_content">
							{{item.content}}
						</text>
						<text class="iconfont icondianzan">{{item.size}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 下载区 -->
		<view class="downloadContanier" @tap="download">
			<view class="download">
				下载图片
			</view>
		</view>
	</view>
</template>

<script>
	// 设置语言为中文
	moment.locale("zh-cn");
	
	import moment from "moment"
	export default {
		data() {
			return {
				avatar: "/static/image/Sakura.png",
				img: "",
				atime: 1575703219,
				id: "",
				comment: [],
				hot: []
			};
		},
		onLoad(Object) {
			this.id = Object.id
			this.img = Object.imgSrc
			this.getData();

		},
		methods: {
			async getData() {
				let ret = await this.request(`http://service.picasso.adesk.com/v2/vertical/vertical/${this.id}/comment`);
				if (ret.res.comment.length>0 || ret.res.hot.length>0 ) {
					// 修改发表日期
					ret.res.comment.forEach((item,index)=>{
						item.atime = moment(item.atime * 1000).fromNow();
						this.comment.push(item);
					})
					ret.res.hot.forEach((item,index)=>{
						item.atime = moment(item.atime * 1000).fromNow();
						this.hot.push(item);
					})

				}
			},
			// 下载图片
			async download(){
				uni.showLoading({
					title:"下载中"
				})
				// 1 将远程文件下载到小程序的内存中 tempFilePath
				let ret = await uni.downloadFile({
					url:this.img
				})
				const {tempFilePath} = ret[1];
				// 保存图片到系统相册。
				await uni.saveImageToPhotosAlbum({
					filePath:tempFilePath
				})
				uni.hideLoading();
				uni.showToast({
					title:"下载完成"
				})
				

			}
		}
	}
</script>

<style lang="scss">
	.header {

		// 用户信息
		.userInfo {
			padding: 40rpx;
			display: flex;
			align-items: center;

			// 头像
			.avatar {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				overflow: hidden;
				margin-right: 30rpx;
			}

			// 用户名字
			.name {
				font-size: 32rpx;
				color: #000;
				font-weight: bold;
			}

			.time {
				font-size: 28rpx;
				color: #ccc;

			}
		}

		// 图片
		.image image{
			height: 600rpx;
			width: 100vw;
			border-bottom: 1rpx solid #eee;
			// overflow: hidden;
		}
	}

	.user_rank {
		display: flex;
		height: 80rpx;
		border-bottom: 5rpx solid #eee;

		.rank {
			display: flex;
			justify-content: center;
			align-items: center;

			flex: 1;

			.iconfont {}
		}

		.user_collect {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;

			.iconfont {}
		}
	}

	// 最热评论
	.commentContanier {
		// padding: 10rpx;
		border-bottom: 8rpx solid #eee;

		// 标题
		.hotTitle {
			margin-bottom: 20rpx;

			.iconhot1 {
				color: red;
				font-size: 50rpx;
				padding-right: 10rpx;
			}

			.comment_text {
				color: #000;
				font-weight: bold;
			}
		}

		// 评论项
		.hotItem {
			padding-bottom: 20rpx;
			border-bottom: 8rpx solid #eee;

			.user {
				margin: 20rpx 0;
				display: flex;

				image {
					width: 90rpx;
					margin-right: 20rpx;
				}

				text {
					color: #ccc;
					font-size: 32rpx;
				}
			}

			// 评论区
			.comment {
				display: flex;
				justify-content: space-between;
				align-items: center;

				// 评论内容
				.comment_content {
					padding-left: 110rpx;
					font-weight: bold;
				}
			}
		}
	}

	.iconpinglun {
		color: skyblue;
		font-size: 50rpx;
		padding-right: 10rpx;
	}
	.downloadContanier{
		display: flex;
		justify-content: center;

		.download{
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 70rpx;
			line-height: 70rpx;
			background-color: #d4237a;
			color: #fff;
			font-size: 40rpx;
			text-align: center;
			border-radius: 20rpx;
		}
	}
</style>
