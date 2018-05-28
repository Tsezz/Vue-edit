var app = new Vue({
    el: '#app',
    data: {
        editingName: false,
        loginVisible: false,
        signUpVisible: false,
        shareVisible: false,
        skinPickerVisible: false,
        shareLink:'',
        currentUser: {
            objectId: '',
            email: ''
        },
        previewUser:{
            objectId:undefined, 
        },
        previewResume:{
            
        },
        resume: {
            name: '姓名',
            gender: '女',
            birthday: '1800年1月',
            jobTitle: '前端工程师',
            phone: '180123456789',
            email: '1@1.com',
            skills: [
                { name: '技能名称', description: '描述' },
                { name: '技能名称', description: '描述' },
                { name: '技能名称', description: '描述' },
                { name: '技能名称', description: '描述' }
            ],
            projects: [
                {
                    name: '项目名称',
                    link: '链接',
                    keywords: '关键词',
                    description: '请详细描写'
                },
                {
                    name: '项目名称',
                    link: '链接',
                    keywords: '关键词',
                    description: '请详细描写'
                }
            ]
        },
        // signUp: {
        //     email: '',
        //     password: ''
        // },
        // login: {
        //     email: '',
        //     password: ''
        // },
        shareLink:'不知道',
        mode: 'edit', // 'preview'
        // mainClass: 'default'
    },
    computed:{
        displayResume(){
            return this.mode ==='preview' ? this.previewResume : this.resume
        }
    },
    watch:{
        'currentUser.objectId': function(newValue, oldValue){
            if(newValue){
                this.getResume(this.currentUser)
            }
        }
    },
    methods: {
        onShare(){
            if(this.hasLogin()){
                this.shareVisible = true
            }else{
                alert('请先登录')
            }
        },
        onEdit(key, value) {
            let regex = /\[(\d+)\]/g
            key = key.replace(regex, (match, number) => `.${number}`)
            // key = skills.0.name
            keys = key.split('.')
            let result = this.resume
            for (let i = 0; i < keys.length; i++) {
                if (i === keys.length - 1) {
                    result[keys[i]] = value
                } else {
                    result = result[keys[i]]
                }
                //result = this.resume
                //keys = ['skills','0','name']
                //i=0 result === result['skills'] === this.resume.skills
                //i=1 result === result['0'] === this.resume.skills.0
                //i=2 result === result['name'] === this.resume.skills.0.name
                //result === this.resume['skills']['0']['name']
            }
            // this.resume['skills']['0']['name'] = value

            //this.resume[key] = value   之前的
        },
        hasLogin() {
            return !!this.currentUser.objectId
        },
        onLogin(user) {
        //     AV.User.logIn(this.login.email, this.login.password).then((user) => {
        //         user = user.toJSON()
        //         console.log(this)
                this.currentUser.objectId = user.objectId
                this.currentUser.email = user.email
                this.loginVisible = false
        //     }, (error) => {
        //         console.log(error)
        //         if (error.code === 211) {
        //             alert('邮箱未注册')
        //         } else if (error.code === 210) {
        //             alert('邮箱或密码错误')
        //         }
        //     });
        },
        onLogout(e) {
            AV.User.logOut();
            // 现在的 currentUser 是 null 了
            var currentUser = AV.User.current();
            alert('已注销')
            window.location.reload()
        },
        // onsignUp(e) {
        //     e.preventDefault()
        //     // 新建 AVUser 对象实例
        //     const user = new AV.User();
        //     // 设置用户名
        //     user.setUsername(this.signUp.email);
        //     // 设置密码
        //     user.setPassword(this.signUp.password);
        //     // 设置邮箱
        //     user.setEmail(this.signUp.email);
        //     user.signUp().then((user) => {
        //         alert('注册成功')
        //         user = user.toJSON()
        //         this.currentUser.objectId = user.objectId
        //         this.currentUser.email = user.email
        //         this.signUpVisible = false
        //     }, (error) => {
        //         alert(error.rawMessage)
        //     });
        // },
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
            let { objectId } = AV.User.current().toJSON()
            var user = AV.Object.createWithoutData('User', objectId);
            // 修改属性
            user.set('resume', this.resume);
            // 保存到云端
            user.save().then(() => {
                alert('保存成功')
            }, () => {
                alert('保存失败')
            });
        },
        getResume(user) {
            var query = new AV.Query('User');
            return query.get(user.objectId).then((user) => {
                // 成功获得实例
                // todo 就是 id 为 57328ca079bc44005c2472d0 的 Todo 对象实例
                let resume = user.toJSON().resume
                  this.resume = resume
                // Object.assign(this.resume, resume)
                return resume
            }, (error) => {
                // 异常处理
            });
        },
        // addSkill() {
        //     this.resume.skills.push({ name: '技能', description: '技能描述' })
        // },
        // removeSkill(index) {
        //     this.resume.skills.splice(index, 1)
        // },
        // addProject() {
        //     this.resume.projects.push({
        //         name: '项目名称',
        //         link: '链接',
        //         keywords: '关键词',
        //         description: '请详细描写'
        //     })
        // },
        // removeProject(index) {
        //     this.resume.projects.splice(index, 1)
        // },
        print(){
            window.print()
        },
        // setTheme(name){
        //     // this.mainClass = name
        //     document.body.className = name
        // }
    }
})

//获取登入用户
let currentUser = AV.User.current()
if (currentUser) {
    app.currentUser = currentUser.toJSON()
    app.shareLink = location.origin + location.pathname + '?user_id=' + app.currentUser.objectId
    app.getResume(app.currentUser).then(resume =>{
        app.resume = resume
        console.log(this)
    })
}

//获取预览用户ID
let search = location.search
let regex = /user_id=([^&]+)/
let matches = search.match(regex)
let userId
if(matches){
    userId = matches[1]
    app.mode = 'preview'
    app.getResume({objectId: userId}).then(resume =>{
        app.previewResume = resume
    })
}
