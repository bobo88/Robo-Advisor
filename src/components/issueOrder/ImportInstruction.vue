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
	      	showMsgState: false
	    }
  	},
  	methods: {
  		onFileChange(event) {
  			var vm = this;
	        this.file = event.target.files[0];
	        // console.log(this.file);
	        // console.log('-----------------------');
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
	            alert(1);
	            // vm.simulatedData = res.data.data;
	          }else{
	          	vm.msgCont = res.data.message;
	          	vm.showMsgState = true;
	          }
	        }).catch(function (error) {
	          console.log(error);
	        });
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
	}
</style>
