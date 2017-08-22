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
	  	    <tr v-for="item in simulatedData">
	  	      <td>{{ item.prodCode }}</td>
	  	      <td>{{ item.prodCode === 'AuTD' ? '黄金延期' : (item.prodCode === 'mAuTD' ? '迷你黄金延期' : '白银延期') }}</td>
	  	      <td>{{ item.tradeSignalCond !== 0 ? ((item.tradeSignalCond == 1) ? '&gt;=' : '&lt;=') : '' }}</td>
	  	      <td>{{ item.offsetFlag == 0 ? '开仓' : '平仓' }}</td>
	  	      <td>{{ item.entrPrice }}</td>
	  	      <td>{{ item.entrAmount }}</td>
	  	      <td>{{ item.orderDeadline }}</td>

	  	      <td><a href="javascript:;">修改</a></td>

	  	    </tr>
	  	  </tbody>
	  	</table>


	</section>

  	<msg :msg="msgCont" v-if="showMsgState" @close-tc="closeMsg"></msg>
  </div>
</template>

<script>
import Msg from '@/components/common/Msg'

export default {
	components:{
		Msg
	},
  	name: 'import-instruction',
  	data () {
	    return {
	      	fileinput: '',
	      	files:[],
	      	simulatedData: {},
	      	msgCont: '',
	      	showMsgState: false,

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
	    }
  	},
  	watch: {
  		fileinput (){
  			console.log(this.fileinput);
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
	}
</style>
