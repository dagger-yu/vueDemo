//左侧活动列表
Vue.component('activity-item',{
	props:['item'],
	methods:{
		//activity
		childClick:function () {
           this.$emit('ac-click')//仅仅说明子组件注册父级事件，ac-click是父事件在子组件里是点击事件，要传参数的话，不懂
        }
	},
	template:`
		<li @click="childClick"><img class="activity-item" v-bind:src="item.url"/></li>
	`
})

//签到活动panel
Vue.component('sign-panel',{
	template:`
		<div class="sign-bg">
			<div v-on:click="$emit('sign-x')" class="sign-x"></div>
		</div>
	`
})

// 进度条组件
Vue.component('myprogress',{
	props:['item'],
	template:`
		<div id="myProgress">
			<div id="myBar" v-bind:style="{width:item.progress+'%'}" v-html="" v-bind:class="item.myBarStopStyle">
				<div id="myBarTop" v-bind:class="item.myBarStopStyle"></div>
			</div>
		</div>
	`,
	watch:{
		item:{
			handler(val,old){
				if(val.progress==100){
					val.myBarStopStyle="myBar-stop";
				}else{val.myBarStopStyle="";};
			},
			deep:true
		}
	}
})

//好友模版
Vue.component('friend-item',{
	props:['item'],
	template:`
			<li @click="$emit('friend-click')" class="friend-item">
				<img v-bind:src="item.url" />
				<p>{{item.nickname}}</p>
			</li>
	`
})

//底部菜单模版
Vue.component('menu-item',{
	props:['item'],
	template:`
		<li class="menu-item">
			<img v-bind:src="item.url" @click="$emit('menu-click')">
		</li>
	`
})

//领水滴面板下的进度条奖励列表
Vue.component('getWater-sign-progress-award-item',{
	props:['item'],
	template:`
		<li><img class="getWater-sign-progress-award-item" v-bind:src="item.img"></li>
	`
})

//领水滴面板下的进度条签到按钮,第一天、第二天。。。。
Vue.component('getWater-sign-progress-button-item',{
	props:['item'],
	template:`
		<li v-if="item.num==0" class="getWater-sign-progress-button-item">{{item.name}}</li>
		<li v-else-if="item.num==1" class="getWater-sign-progress-button-item"><div @click="$parent.getWaterbtnClick(item.id)"  class="btn"></div></li>
		<li v-else-if="item.num==2" class="getWater-sign-progress-button-item"><div class="btn_done"></div></li>
	`
})

//领水滴面板下的子活动
Vue.component('get-water-panel-ac-frist',{
	props:{
		
	},
	data:function(){
		return {
			switch:1,//1可领，0倒计时，2领完
			img:"./images/getWater-progress-award.png",
			title:"签到送水滴",
			count:3,
			button:"领水滴",
			ticktock:'00:00:05'
		}
	},
	methods:{
		fticktock:function(){
			var self=this;
			self.count--;
			self.switch=0;
			var daojishi=setInterval(function(){
				var h=parseInt(self.ticktock.split(":")[0]);
				var m=parseInt(self.ticktock.split(":")[1]);
				var s=parseInt(self.ticktock.split(":")[2]);
				if(s==0&&m==0&&h==0){
					self.ticktock="00:00:05";
					clearInterval(daojishi);
					self.switch=self.count>0?1:2;
				}else{
					s--;
					if(s==-1&&m>0){s=59;m--;
						if(m==-1&&h>0){m==59;h--;};
					};
					var H,M,S;
					H=h;M=m;S=s;
					if(h<10) H="0"+h;
					if(m<10) M="0"+m;
					if(s<10) S="0"+s;
					self.ticktock=H+":"+M+":"+S;
				};
			},1000);
		}
	},
	mounted:function(){
		// this.fticktock();
		axios
	      .get('http://mytest.com/my/tree/ajax.php')
	      .then(response => (this.ticktock = response.data))
	      .catch(function (error) { // 请求失败处理
	        console.log(error);
	      });
	},
	template:`
		<li class="get-water-panel-ac-item">
			<div class="get-water-panel-ac-item-img" v-bind:style="{backgroundImage:'url('+this.img+')'}"></div>
			<div class="get-water-panel-ac-item-content">
				<h3>{{this.title}}</h3>
				<p>奖励10-30g水滴，剩余{{this.count}}次</p>
			</div>
			<div class="get-water-panel-ac-item-incident">
				<button v-if="this.switch==1" @click="fticktock">{{this.button}}</button>
				<button v-else-if="this.switch==2">已领完</button>
				<div class="ticktock-wrap" v-else>
					<p id="ticktock">{{ticktock}}</p>
					<p>后可领取</p>
				</div>
			</div>
		</li>
	`
})
