import axios from 'axios';
import _ from 'lodash';
import Qs from 'qs';

export default {
	invoke : function(options) {
		return new Promise((resolve, reject) => {
		    if (!util.ajax) {
		        util.ajax = axios.create({
		            baseURL: window._TY_APIHost,
		            timeout: 30000,
		            withCredentials: true
		        });
		    }
		    util.ajax(options).then(function(response) {
		        if (response && response['data'] && response['data']['code'] && response['data']['code'] == -420 && util.isWX()) {
		            //微信端没有登录，跳转微信授权
		            location.href = response['data']['message'] || window._TY_SSOURL;
		        } else if (response && response['data'] && response['data']['code'] && response['data']['code'] <= -400) {
		            //所有Code小于等于-400都是属于没有登录授权的，统一走SSOURL配置路径
		            if (response['data']['code'] == -401) {
		                location.href = window._RS_SSOURL;
		            } else {
		                location.href = window._TY_SSOURL;
		            }
		        } else {
		            resolve(response);
		        }
		        // if (response && response['data'] && response['data']['code'] && response['data']['code'] == -420 && util.isWX()) {
		        //     //微信端没有登录，跳转微信授权
		        //     location.href = response['data']['message'] || window._TY_SSOURL;
		        // } else if (response && response['data'] && response['data']['code'] && response['data']['code'] == -401) {
		        //     //龙眼专用 未登录
		        //     location.href = window._TY_SSOURL;
		        // } else if (response && response['data'] && response['data']['code'] && response['data']['code'] == -400) {
		        //     //TY E端未登录
		        //     location.href = document.location.protocol + "//" + document.location.host + "/#/ty-login";
		        // } else if (response && response['data'] && response['data']['code'] && response['data']['code'] == -410) {
		        //     //TY B端未登录
		        //     location.href = document.location.protocol + "//" + document.location.host + "/#/ty_b_login";
		        // } else {
		        //     resolve(response);
		        // }
		    }).catch(function(error) {
		        reject(error);
		    });
		});
	},

	post : function(url, param, options) {
	    return this.invoke(_.assignIn({
	        url: url,
	        method: 'post',
	        data: Qs.stringify(param),
	        headers: {
	            'Content-Type': 'application/x-www-form-urlencoded'
	        }
	    }, options));
	},

	get : function(url, param, options) {
	    return this.invoke(_.assignIn({
	        url: url,
	        method: 'get',
	        params: param
	    }, options));
	},

	/**
	 * 解析字符串
	 * DEMO
	 * {{内置变量_是否编辑状态}} {{内置变量_localStorage.item.abc}}
     * => {{window.__Mokelay.InternalVar['Is_Edit_Status']}} {{window.__Mokelay.InternalVar['localStorage']['item']['abc']}}
	 * @param {字符串} str 
	 */
	resolve:function(str){
		return null;
	}
};