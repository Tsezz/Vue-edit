var app = new Vue({
    el: '#app',
    data: {
        editingName: false,
        loginVisible: false,
        resume: {
            name: '姓名',
            gender: '女',
            birthday: '1800年1月',
            jobTitle: '前端工程师',
            phone: '180123456789',
            email: '1@1.com'
        }
    },
    methods: {
        onEdit(key, value) {
            console.log(key)
            this.resume[key] = value
        },
        onClickSave() {
            currentUser = AV.User.current();
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
            console.log(currentUser)
        },
        onCloseLogin(){
            this.loginVisible = false
        },
        showLogin(){
            this.loginVisible = true;
        },
        saveResume(){

        }
    }
})