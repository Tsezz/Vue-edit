Vue.component('signUp',{
    data(){
        return{
            signUp: {
                email: '',
                password: ''
            },
        }       
    },
    methods:{
        onsignUp(e) {
            e.preventDefault()
            // 新建 AVUser 对象实例
            const user = new AV.User();
            // 设置用户名
            user.setUsername(this.signUp.email);
            // 设置密码
            user.setPassword(this.signUp.password);
            // 设置邮箱
            user.setEmail(this.signUp.email);
            user.signUp().then((user) => {
                alert('注册成功')
                user = user.toJSON()
                this.$emit('signUp')
            }, (error) => {
                alert(error.rawMessage)
            });
        },
        onClickLogin(e){
            this.$emit('goToLogin')
        },
        onCloseLogin() {
            this.loginVisible = false
        },
    },
    template:`
    <div class="signUp" v-cloak>
    <form class="form" @submit="onsignUp">
        <h2>注册</h2>
        <button @click="onCloseLogin">关闭</button>
        <div class="row">
            <label>邮箱</label>
            <input type="text" v-model="signUp.email">
        </div>
        <div class="row">
            <label>密码</label>
            <input type="password" v-model="signUp.password">
        </div>
        <div class="actions">
            <button type="submit">提交</button>
            <a href="#" @click="onClickLogin">登入</a>
        </div>
    </form>
</div>
    `
})