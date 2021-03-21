//APP
var myapp=new Vue({
	el:"#myapp",
	data:{
		wateringCount:0,//浇水次数
		growUp:3,//长大
		bloom:7,//开花
		fruit:12,//结果
		levelRes:"长大",
		treeChange:0,//树是否已结果
		waterCount:190,//玩家拥有的水量
		zhezhao:0,//遮罩层开关
		signAcSwitch:0,//签到开关
		lotteryDrawAcSwitch:0,//抽奖开关
		//左侧活动列表
		activities:[
			{id:0,url:"./images/have-price.png",name:"signAc"},
			{id:1,url:"./images/lottery-draw.png",name:"lotteryDrawAc"}
		],
		//进度条
    	bar:{progress:0,myBarStopStyle:''},
    	//好友列表
    	friends:[
    		{id:0,url:"./images/friend-img.png",nickname:"种树种树种树种树种树"},
    		{id:1,url:"./images/timg.jpg",nickname:"美国队长"},
    		{id:2,url:"./images/xiaoc.jpg",nickname:"小丑"},
    		{id:3,url:"./images/huoy.jpg",nickname:"火影忍者"}
    	],
    	//底部菜单列表
    	menus:[
    		{id:0,name:"informationPanel",url:"./images/information.png"},
    		{id:1,name:"getWaterPanel",url:"./images/get-water.png"},
    		{id:2,name:"packagePanel",url:"./images/user-package.png"}
    	],
    	getWaterPanelSwitch:0,//领水滴面板开关
    	informationPanelSwitch:0,//信息面板开关
    	packagePanelSwitch:0,//背包面板开关
    	//领水滴面板子活动数据列表
    	getWaterPanelAcItems:[
    		{id:0,img:"./images/friend-img.png",title:"领水滴",content:"领水滴面板开关",button:"领水滴"}
    	],
    	//领水滴签到进度条数据
    	getWaterSignDaysProgress:0,
    	//领水滴签到奖励
    	getWaterSignDaysAward:[
    		{id:1,img:"./images/getWater-progress-award.png"},
			{id:2,img:"./images/getWater-progress-award.png"},
			{id:3,img:"./images/getWater-progress-award.png"},
			{id:4,img:"./images/getWater-progress-award.png"},
			{id:5,img:"./images/getWater-progress-award.png"}
    	],
    	//领水滴签到按钮
    	getWaterSignDaysBtns:[
			{id:"01",name:'第一天',num:1},
			{id:"02",name:'第二天',num:0},
			{id:"03",name:'第三天',num:0},
			{id:"04",name:'第四天',num:0},
			{id:"05",name:'第五天',num:0}
		]
    	
	},
	computed:{
		//需要浇多少次水就。。。
		needToWatering:function(){
			if(this.levelRes=="长大"){
				return this.growUp-this.wateringCount;
			}else if(this.levelRes=="开花"){
				return this.bloom-this.wateringCount;
			}else if(this.levelRes=="结果"){
				return this.fruit-this.wateringCount;
			};
		}
	},
	methods:{
		//左侧活动列表
		acClick:function(name){
			alert(name);
			myapp.zhezhao=1;
			var acSwitch=name+"Switch";
			console.log(acSwitch);
			myapp[acSwitch]=1;
			console.log(myapp.signAcSwitch);
		},
		//控制左侧签到面板弹出、关闭
		signX:function(){
			myapp.zhezhao=0;
			myapp.signAcSwitch=0;
		},
		//进度条
		myProgress:function(num){
			// var progress=setInterval(function(){
			// 	myapp.bar.progress++;
			// 	if(myapp.bar.progress==100){
			// 		console.log("stop");
			// 		clearInterval(progress);
			// 	};
			// },500);
			var singleProgress=(parseInt(100/num*100)+1)/100;
			myapp.bar.progress+=singleProgress;
			if(myapp.bar.progress>=100) myapp.bar.progress=100;
		},
		//点击好友头像
		friendClick:function(name){
			alert(name);
		},
		//点击底部菜单图标
		menuClick:function(name){
			alert(name);
			myapp.zhezhao=1;
			var menuSwitch=name+"Switch";
			console.log(menuSwitch);
			myapp[menuSwitch]=1;
		},
		//控制领水滴面板弹出、关闭
		getWaterPanelX:function(){
			myapp.zhezhao=0;
			myapp.getWaterPanelSwitch=0;
		},
		//点击浇水
		watering:function(){
			if(this.waterCount>=10){
				this.waterCount-=10;
				this.wateringCount++;
				if(this.wateringCount>=this.growUp&&this.wateringCount<this.bloom){
					this.levelRes="开花";
					if(this.wateringCount==this.growUp){
						myapp.bar.progress=100;
					}else {
						if(this.wateringCount==this.growUp+1) myapp.bar.progress=0;
						myapp.myProgress(this.bloom-this.growUp);
					};
				}else if(this.wateringCount>=this.bloom&&this.wateringCount<this.fruit){
					this.levelRes="结果";
					if(this.wateringCount==this.bloom){
						myapp.bar.progress=100;
					}else {
						if(this.wateringCount==this.bloom+1) myapp.bar.progress=0;
						myapp.myProgress(this.fruit-this.bloom)
					};
				}else if(this.wateringCount>=this.fruit){
					this.treeChange=1;
					myapp.bar.progress=100;
				}else{
					myapp.myProgress(this.growUp);
				};
			}else{
				alert("水量不足！");
			};
		},
		//领水滴签到按钮
		getWaterbtnClick:function(num){
			alert(parseInt(num));
			var index=parseInt(num)-1;
			this.getWaterSignDaysBtns[index].num=2;
			if(index>0) this.getWaterSignDaysProgress=index*25+"%";
			this.getWaterSignDaysAward[index].img="./images/checked.png";
		}

	},
	mounted:function(){

	},
	created:function(){
		
	},
	
})
// myapp.myProgress();