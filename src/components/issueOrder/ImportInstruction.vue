<!--
内容：默认首页（下达指令页面）
作者：BOBO
日期： 20170802
-->
<template>
  <div class="import-instruction">
  	<header class="table-common-head clearfix">
  		<span class="tit fl">导入指令</span>
  		
		<file-upload v-model="files" post-action="/post.method" put-action="/put.method">Upload file</file-upload>


  		<!-- <input id="fileId" type="file" name="file" style="display:none;" @change="onFileChange" />
  		<label for="fileId"><span class="file-btn">本地上传</span></label> -->
  		
  	</header>

		<ul>
			<li v-for='file in files'>
				<button @click="uploadItem(file)">上传</button>
			</li>
		</ul>
	


  </div>
</template>

<script>
import FileUpload from 'vue-upload-component'

export default {
	components:{
		FileUpload
	},
  	name: 'import-instruction',
  	data () {
	    return {
	      	fileinput: '',
	      	files:[]
	    }
  	},
  	methods: {
  		onFileChange(e) {
  		// var formData = new FormData(this.el);
	      var files = e.target.files || e.dataTransfer.files;
	      if (!files.length) return;
	      this.createInput(files[0]);
	    },
	    createInput(file) {
			var reader = new FileReader();
			var vm = this;
			reader.onload = (e) => {
				vm.fileinput = reader.result;
			}
			reader.readAsText(file);
			setTimeout(function(){


				// vm.$http.get('/static/demo.json')
				// // vm.$http.post('/static/demo.json', {
				// // 	fileInput: vm.fileinput
				// // })
				// .then(function (response) {
				// 	if (response.data.code == 1) {
		  //   			vm.$nextTick(function () {
				// 			// console.log(response.data.msg);
				// 			alert(response.data.msg);
		  //   			})
		  //   		}
				// })
				// .catch(function (error) {
				// 	console.log(error);
				// });
				
				// @Html.TextBoxFor(m => m.FileName, new { id = "file-upload", type = "file", accept = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
				
				// vm.$http({
				//   method: 'post',
				//   url: process.env.BASE_URL + '/marketOrder/fileupload',
				//   params: {file: vm.fileinput},
				//   headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				// })
				// .then(function (response) {
				//   if(response.data.code === 100){
				//   	alert(1);
				//     // vm.simulatedData = response.data.data;
				//   }
				// })
				// .catch(function (error) {
				//   console.log(error);
				// });



			}, 100);
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
