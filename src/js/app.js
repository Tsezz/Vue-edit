var app = new Vue({
    el: '#app',
    data: {
        editingName: false,
        loginVisible: false,
        singUpVisible: false,
        resume: {
            name: '姓名',
            gender: '女',
            birthday: '1800年1月',
            jobTitle: '前端工程师',
            phone: '180123456789',
            email: '1@1.com'
        },
        singUp: {
            email: '',
            password: ''
        },
        login: {
            email: '',
            password: ''
        }
    },
    methods: {
        onEdit(key, value) {
            console.log(key)
            this.resume[key] = value
        },
        onLogin(e) {
            console.log(this.login)
            AV.User.logIn(this.login.email, this.login.password).then(function (user) {
                console.log(user);
            }, function (error) {
                console.log(error)
                if (error.code === 211) {
                    alert('邮箱未注册')
                } else if (error.code === 210) {
                    alert('邮箱或密码错误')
                }
            });
        },
        onLogout(e) {
            AV.User.logOut();
            // 现在的 currentUser 是 null 了
            var currentUser = AV.User.current();
            alert('已注销')
        },
        onSingUp(e) {
            e.preventDefault()
            // 新建 AVUser 对象实例
            const user = new AV.User();
            // 设置用户名
            user.setUsername(this.singUp.email);
            // 设置密码
            user.setPassword(this.singUp.password);
            // 设置邮箱
            user.setEmail(this.singUp.email);
            user.signUp().then(function (user) {
                console.log(user);
            }, function (error) {
            });
        },
        onClickSave() {
            let currentUser = AV.User.current();
            console.log(currentUser)
            if (!currentUser) {
                this.showLogin()
            } else {
                this.saveResume()
                // // 声明类型
                // var TodoFolder = AV.Object.extend('TodoFolder');
                // // 新建对象
                // var todoFolder = new TodoFolder();
                // // 设置名称
                // todoFolder.set('name', '工作');
                // // 设置优先级
                // todoFolder.set('priority', 1);
                // todoFolder.save().then(function (todo) {
                //     console.log('objectId is ' + todo.id);
                // }, function (error) {
                //     console.error(error);
                // });
            }
        },
        onCloseLogin() {
            this.loginVisible = false
        },
        showLogin() {
            this.loginVisible = true;
        },
        saveResume() {
            // 第一个参数是 className，第二个参数是 objectId
            let { id } = AV.User.current()
            var user = AV.Object.createWithoutData('User', id);
            // 修改属性
            user.set('resume', this.resume);
            // 保存到云端
            user.save();
        }
    }
})