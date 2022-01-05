import config from "./config.js"
let {host} = config;

export default (url,data={},method="get")=>{
	return new Promise((resolve,rejected)=>{
		uni.showLoading({
			title:"正在加载"
		})
		wx.request({
			url,
			method,
			data,
			success:(res) =>{
				resolve(res.data);
			},
			fail:(err) => {
				rejected(err);
			},
			complete:()=>{
				uni.hideLoading()
			}
		})
	})
}