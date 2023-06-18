<template>
  <div class="tag">
    <el-tag
        v-for="(item, index) in pathtag"
        :key="item.label"
        :closable="item.name !== 'home'"
        :effect="$route.path === `/${item.name}`? 'dark': 'plain'"
        @click="changeMenu(item)"
        @close="closeMenu(item, index)"
        size="small">
        {{ item.label }}
  </el-tag>
  </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    computed:{
        // 获取store里的tag数据
        pathtag(){
            return this.$store.state.tab.tabList
        }
    },
    methods:{
        // 点击更换页面
        changeMenu(item){
            this.$router.push(`${item.path}`)
        },
        // 点击删除页面
        closeMenu(item, index){
            // 调用mutation中的函数实现删除操作
            this.$store.commit('closeTag', item)
            // 删除之后的高亮跳转
            if(item.path !== this.$route.path){
                 // 删除的不是当前高亮的tag
                return
            }
            // 由于此时已经删除，所以length已经减一
            if(index === this.pathtag.length){
                // 删除的是当前高亮的tag且是最后一个，则往前一个跳转
                this.$router.push(`${this.pathtag[index - 1].path}`)
            }else{
                // 删除的是当前高亮tag但是是中间的，则往后跳转
                this.$router.push(`${this.pathtag[index].path}`)
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .tag{
        padding: 20px;
        .el-tag{
            margin-right: 15px;
            cursor: pointer;
        }
    }
</style>