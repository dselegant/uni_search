<template>
	<view class="albumContanier">
		<!-- 轮播图 -->
		<scroll-view scroll-y="true" class="scrollContanier" @scrolltolower="handleBottom">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item class="swiperItem" v-for="(item,index) in banners" :key="item._id">
					<image :src="item.new_thumb"></image>
				</swiper-item>
			</swiper>
			<!-- 专辑 -->
			<view class="album">
				<!-- 专辑图 -->
				<view class="albumItem" v-for="(item,index) in album" :key="item.id"
				@tap="toAlbumDetail(item.id)">
					<view class="image">
						<image :src="item.lcover"></image>
					</view>
					<!-- 专辑信息 -->
					<view class="albumInfo">
						<!-- 名字 -->
						<text class="name">{{item.name}}</text>
						<!-- 描述 -->
						<text class="desc" v-if="item.desc">{{item.desc}}</text>
						<text class="remind" v-else>没有过多的描述···</text>
						<!-- 关注 -->
						<view class="attendtionContanier">
							<view class="attention">
								+关注
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: "album",
		data() {
			return {
				params: {
					limit: 30,
					order: "new",
					skip: 0
				},
				banners: [],
				album: []
			};
		},
		created() {
			this.getData();
		},
		methods: {
			// 获取数据
			async getData() {
				let ret = await this.request('http://service.picasso.adesk.com/v1/wallpaper/album', this.params);
				if (ret) {
					if (this.banners.length == 0) {
						this.banners = ret.res.banner;
					}
					if (ret.res.album.length > 0) {
						this.album = [...this.album, ...ret.res.album];
					} else {
						uni.showToast({
							title: "没有新的数据了",
							icon: "none"
						})
					}
				}
			},
			handleBottom() {
				this.params.skip += 30;
				this.getData()
			},
			toAlbumDetail(id){
				uni.navigateTo({
					url:`/pages/index/albumDetail/albumDetail?id=${id}`
				})
			}
		},
	}
</script>

<style lang="scss">
	// 342*214
	.albumContanier {

		// 滑动容器
		.scrollContanier {
			height: 100vh;
			// 轮播图
			swiper {
				margin-top: 5rpx;
				height: 310rpx;

				.swiperItem {
					image {
						height: 100%;
					}
				}
			}

			// 专辑容器
			.album {
				// 专辑项
				.albumItem {
					display: flex;
					justify-content: space-between;
					padding:20rpx 0rpx;
					border-bottom: 2rpx solid #ccc;
					image {
						width: 200rpx;
						height: 200rpx;
					}

					// 专辑介绍
					.albumInfo {

						display: flex;
						flex-direction: column;
						width: 480rpx;
						height: 200rpx;
						justify-content: space-between;

						// 名字
						.name {
							font-size: 40rpx;
							font-weight: 500;
							color: #000;
						}

						//描述
						.desc {
							margin-top: -50rpx;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}

						// 提示
						.remind {
							margin-top: -50rpx;
							color: #d4237a;
						}

						// 关注容器
						.attendtionContanier {
							position: relative;

							// 关注
							.attention {
								text-align: center;
								height: 50rpx;
								width: 100rpx;
								padding: 3rpx;
								border: 2rpx solid #d4237a;
								position: absolute;
								right: 0;
								bottom: 0;
								color: #d4237a;
							}
						}
					}
				}
			}
		}
	}
</style>
