<template>
    <el-card>
      <template #header>
         <div class="card-header">用户协议编辑</div>
      </template>
      <my-editor></my-editor>

    </el-card>

</template>

<script>
  //import EditorBar from './editoritem'
  //components: { EditorBar },
  export default {
      setup() {
          const change = (val) => {
              console.log(val)
          }
          return {
            isClear: false,
            detail:""
            }
      }
  }
</script>

<style scope>
.card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color:#4e73df;
        font-weight: bold;
    }
</style>
