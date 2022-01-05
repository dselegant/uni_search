<template>
	<view class="videoDetailContanier">
		<!-- 控制 -->
		<view class="control">
			<view class="iconfont " :class="muted?'iconjingyin':'iconshengyin'" @tap="isVoice"></view>
			<view class="iconfont iconzhuanfa">
				<button open-type="share"></button>	
			</view>
			
		</view>
		<!-- 背景图 -->
		<view class="bcg">
			<image :src="imgUrl" mode=""></image>
		</view>
		<!-- 视频 -->
		<view class="video">
			<video :src="videoUrl" objectFit="fill" :muted="muted"></video>
		</view>
		<!-- 下载视频 -->
		<view class="downloadVideo" @tap="downloadVideo">
			下载视频
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoUrl: "",
				imgUrl: "",
				muted:false
			};
		},
		onLoad(Object) {
			this.videoUrl = Object.videoUrl
			this.imgUrl = Object.imgUrl
		},
		methods:{
			// 声音开关
			isVoice(){
				this.muted = !this.muted;
			},
			async downloadVideo(){
				uni.showLoading({
					title:"正在下载"
				});
				let ret = await uni.downloadFile({
					url:this.videoUrl
				});
				const {tempFilePath} = ret[1];
				await uni.saveVideoToPhotosAlbum({
					filePath:tempFilePath
				});
				uni.hideLoading()
				uni.showToast({
					title:"下载完成"
				})
			}
		}
	}
</script>

<style lang="scss">
	.videoDetailContanier {
		height: 100%;
		position: relative;

		// 控制中心
		.control {
			position: absolute;
			top: 40rpx;
			right: 30rpx;
			display: flex;
			.iconfont {
				width: 80rpx;
				color: #fff;
				font-size: 50rpx;
				border-radius: 50%;
				background-color: rgba(0, 0, 0, 0.2);
				text-align: center;
				margin-right: 10rpx;
			}
		}

		//背景图
		.bcg {
			image {
				position: absolute;
				z-index: -1;
				border: 30rpx solid #000;
				filter: blur(10rpx);
				width: 100vw;
				height: 100vh;
			}
		}
	}

	// 视频
	.video {
		position: absolute;
		top: 200rpx;
		left: 50%;
		transform: translateX(-50%);

		video {
			width: 50vw;
			height: 50vh;
		}
	}

	//下载
	.downloadVideo {
		position: absolute;
		top: 850rpx;
		left: 50%;
		transform: translateX(-50%);
		padding: 20rpx 130rpx;
		border-radius: 20rpx;
		color: #fff;
		border: 1rpx solid #fff;
		background-color: rgba(0, 0, 0, 0.6);
	}
</style>
