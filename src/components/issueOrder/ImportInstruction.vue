<!--
内容：默认首页（下达指令页面）
作者：BOBO
日期： 20170802
-->
<template>
  <div class="import-instruction">
  	<header class="table-common-head clearfix">
  		<span class="tit fl">导入指令</span>


  		<input id="fileId" type="file" name="file" style="display:none;" @change="onFileChange($event)" />
  		<label for="fileId"><span class="file-btn">本地上传</span></label>
  	</header>

	<section class="instruction-ed" v-if="simulatedData.length > 0">
		<p>已导入指令如下：</p>

	  	<table cellpadding="0" cellspacing="0" class="table-common-main-lang">
	  	  <thead>
	  	    <tr>
	  	      <th v-for="item in tableData.tHead">
	  	        <strong>{{ item.title }}</strong>
	  	        {{ item.lang }}
	  	      </th>  
	  	    </tr>
	  	  </thead>
	  	  <tbody>
	  	    <tr v-for="(item,index) in simulatedData">
	  	      <td>{{ item.prodCode }}</td>
	  	      <td>{{ item.prodCode === 'Au(T+D)' ? '黄金延期' : (item.prodCode === 'mAu(T+D)' ? '迷你黄金延期' : '白银延期') }}</td>
	  	      <td>{{ item.tradeSignalCond !== 0 ? ((item.tradeSignalCond == 1) ? '&gt;=' : '&lt;=') : '' }}</td>
	  	      <td>{{ item.offsetFlag == 0 ? '开仓' : '平仓' }}</td>
	  	      <td>{{ item.entrPrice }}</td>
	  	      <td>{{ item.entrAmount }}</td>
	  	      <td>{{ item.orderDeadline }}</td>

	  	      <td><a href="javascript:;" @click="editing(index)">修改</a></td>

	  	    </tr>
	  	  </tbody>
	  	</table>
		
		<div class="btn-wrap">
			<Button type="primary" @click="cancelInstruction">取消</Button>
			<Button type="primary" @click="definiteInstruction">确定下发指令</Button>
		</div>
	</section>
	
	<!-- 提示信息 -->
  	<msg :msg="msgCont" v-if="showMsgState" @close-tc="closeMsg" :msg-style="msgStyle"></msg>

	<!-- 修改导入指令 -->
  	<pop-up v-if="showPopUpState" @close-tc="closePopUp">
  	  <div slot="content">
  	    <table cellpadding="0" cellspacing="0">
  	      <thead>
  	        <tr>
  	          <th v-for="item of editingData.tHead">{{ item.title }}<br/> {{ item.lang }}</th>
  	        </tr>
  	      </thead>
  	      <tbody>
  	        <tr>
  	          <td>
	  	          <Select v-model="itemImportPopUpData.prodCode" style="width:80px">
	  	              <Option value="Au(T+D)" key="0">Au(T+D)</Option>
	  	              <Option value="mAu(T+D)" key="1">mAu(T+D)</Option>
	  	              <Option value="Ag(T+D)" key="2">Ag(T+D)</Option>
	  	          </Select>
  	          </td>
  	          <td>{{ itemImportPopUpData.prodCode === 'AuTD' ? '黄金延期' : (itemImportPopUpData.prodCode === 'mAuTD' ? '迷你黄金延期' : '白银延期') }}</td>
  	          <td>
	  	          <Select v-model="itemImportPopUpData.tradeSignalCond" style="width:80px">
	  	              <Option value="1" key="0">大于等于</Option>
	  	              <Option value="2" key="1">小于等于</Option>
	  	          </Select>
  	          </td>
  	          <td>
	  	          <Select v-model="itemImportPopUpData.offsetFlag" style="width:80px">
	  	              <Option value="0" key="0">开仓</Option>
	  	              <Option value="1" key="1">平仓</Option>
	  	          </Select>
  	          </td>
  	          <td><input type="text" v-model="itemImportPopUpData.entrPrice" style="width:80px"></td>
  	          <td><input type="text" v-model="itemImportPopUpData.entrAmount" style="width:80px"></td>
  	          <td>
  	         	 <Time-picker format="HH:mm" v-model="itemImportPopUpDataOrderDeadline"  placeholder="选择时间" style="width: 140px" placement="top"></Time-picker>
  	          </td>
  	        </tr>
  	      </tbody>
  	    </table>
  	  </div>
  	</pop-up>


  </div>
</template>

<script>
import Msg from '@/components/common/Msg'
//引入弹窗组件
import PopUp from '@/components/common/PopUp'

function timeFormatter(s){
	var _str = [];
	if(s !== '') {
	  //小时HH
	  s.getHours() > 9 ? _str[0] = s.getHours() : _str[0] = '0' + s.getHours();
	  //分钟mm
	  s.getMinutes() > 9 ? _str[1] = s.getMinutes() : _str[1] = '0' + s.getMinutes();
	  
	  return _str.join(':');
	}
}

export default {
	components:{
		Msg,
		PopUp
	},
  	name: 'import-instruction',
  	data () {
	    return {
	    	msgStyle: 'width:300px',
	    	showPopUpState: false,
	      	files:[],
	      	simulatedData: {},
	      	msgCont: '',
	      	showMsgState: false,
	      	itemImportPopUpData: null,
	      	orderDeadline: '',
	      	currentEditIndex: 0,

	      	tableData: {
	      	    tHead: [
	      	      {
	      	          title: '合约代码',
	      	          lang: 'Prod Code'
	      	      },
	      	      {
	      	          title: '合约',
	      	          lang: 'Spot Name'
	      	      },
	      	      {
	      	          title: '交易信号',
	      	          lang: 'Trade Signal'
	      	      },
	      	      {
	      	          title: '操作',
	      	          lang: 'Offset Flag'
	      	      },
	      	      {
	      	          title: '交易价格',
	      	          lang: 'Order Price'
	      	      },
	      	      {
	      	          title: '交易数量',
	      	          lang: 'Order Amount'
	      	      },
	      	      {
	      	          title: '指令截止时间',
	      	          lang: 'Deadline'
	      	      },
	      	      {
	      	          title: '操作',
	      	          lang: 'Oprate'
	      	      }
	      	    ]
	      	},
	      	editingData: {
	      	    tHead: [
	      	      {
	      	          title: '合约代码',
	      	          lang: 'Prod Code'
	      	      },
	      	      {
	      	          title: '合约',
	      	          lang: 'Spot Name'
	      	      },
	      	      {
	      	          title: '交易信号',
	      	          lang: 'Trade Signal'
	      	      },
	      	      {
	      	          title: '操作',
	      	          lang: 'Offset Flag'
	      	      },
	      	      {
	      	          title: '交易价格',
	      	          lang: 'Order Price'
	      	      },
	      	      {
	      	          title: '交易数量',
	      	          lang: 'Order Amount'
	      	      },
	      	      {
	      	          title: '指令截止时间',
	      	          lang: 'Deadline'
	      	      }
	      	    ]
	      	}
	    }
  	},
  	methods: {
  		onFileChange(event) {
  			var vm = this;
	        this.file = event.target.files[0];
	        // console.log(this.file.name);
	        // console.log('-----------------------');
	        if(this.file.name.indexOf('.xlsx') != -1 || this.file.name.indexOf('.xls') != -1){
		  		var formData = new FormData();
		  		formData.append("file" , this.file);

		        let config = {
		          headers: {
		            'Content-Type': 'multipart/form-data'
		          },
		          params: {
      	    			trading_token: vm.$store.state.trading_token
      	    		}
		        };
		        this.$http.post(
		            process.env.BASE_URL + '/marketOrder/fileupload',
		            formData, config
		        ).then(function (res) {
		          if(res.data.code === 100){
		            // alert(1);
		            vm.simulatedData = res.data.data.batchOrder;
		          }else{
		          	vm.msgCont = res.data.message;
		          	vm.showMsgState = true;
		          }
		        }).catch(function (error) {
		          console.log(error);
		        });
	        }else{
	        	vm.msgCont = '上传文件格式不对，必须是Excel类型';
	        	vm.showMsgState = true;
	        }

	    },
	    closeMsg(){
	      this.showMsgState = false;
	    },
	    editing(index){
	    	this.showPopUpState = true;
	    	this.currentEditIndex = index;
	    	this.itemImportPopUpData = this.simulatedData[index];
	    },
	    closePopUp(){
	      this.showPopUpState = false;
	    },
	    //取消指令
	    cancelInstruction(){
	    	//解决inputfile选取相同文件后，change事件不起作用的方法
	    	var obj = document.getElementById('fileId'); 
	    	obj.value=''; 

	    	this.simulatedData = [];
	    },
	    //确定下发指令
	    definiteInstruction(){
	    	var vm = this;
	    	var params = {
	    		trading_token: vm.$store.state.trading_token, //交易token
	    	  	batchOrder: JSON.stringify(this.simulatedData)
	    	};

	    	  // batchOrder: JSON.stringify(this.simulatedData)
			this.$http({
				method: 'post',
				url: process.env.BASE_URL + '/marketOrder/batchSubmit',
				params: params,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			})
			.then(function (response) {
				if(response.data.code === 100){
					vm.msgCont = '导入指令成功';
					vm.showMsgState = true;

					// var obj = document.getElementById('fileId'); 
					// obj.value=''; 

					// vm.simulatedData = [];
				}
			})
			.catch(function (error) {
				console.log(error);
			});

	    }
  	},
  	watch: {
  		itemImportPopUpData(){
  			console.log('change');
  		}
  	},
  	computed: {
 		itemImportPopUpDataOrderDeadline: {
 			get: function(){
		      	return this.simulatedData[this.currentEditIndex].orderDeadline;
		    },
 			set: function(newValue){
		      	return this.simulatedData[this.currentEditIndex].orderDeadline = timeFormatter(newValue);
		    }
 		}
  	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.import-instruction{
		.table-common-head{ height: 40px;}
		.file-btn{ display: inline-block; margin-bottom: 0; margin-top: 5px; height: 30px; font-weight: 400; text-align: center; vertical-align: middle; -ms-touch-action: manipulation; touch-action: manipulation; cursor: pointer; background-image: none; border: 1px solid transparent; white-space: nowrap; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; padding: 4px 15px; font-size: 12px; border-radius: 4px; transition: color .2s linear,background-color .2s linear,border .2s linear; color: #495060; border-color: #dddee1; color: #8598CB; border-color: #8598CB; font-size: 14px;
		  &:hover{ color: #fff; background-image: linear-gradient(90deg, #6F64FF 0%, #B93BFB 100%);}
		}

		.instruction-ed{ padding: 10px;

		}
		.btn-wrap{ padding: 10px; text-align: right;
			button{ margin-left: 10px;}
		}
	}
</style>
