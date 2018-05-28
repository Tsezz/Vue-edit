Vue.component('resume',{
    props:['mode','displayResume'],
    data(){
        return{
            
        }
    },
    methods:{
        addSkill() {
            this.resume.skills.push({ name: '技能', description: '技能描述' })
        },
        removeSkill(index) {
            this.resume.skills.splice(index, 1)
        },
        addProject() {
            this.resume.projects.push({
                name: '项目名称',
                link: '链接',
                keywords: '关键词',
                description: '请详细描写'
            })
        },
        removeProject(index) {
            this.resume.projects.splice(index, 1)
        },
    },
    template:`
    <div class="resume">
                <section class="profile">
                    <span>
                        <editable-span :disabled="mode === 'preview'" v-bind:value="displayResume.name" v-on:edit="onEdit('name', $event)"></editable-span>
                    </span>
                    <h1></h1>
                    <p>应聘职位：
                        <editable-span :disabled="mode === 'preview'" v-bind:value="displayResume.jobTitle" v-on:edit="onEdit('jobTitle', $event)"></editable-span>
                    </p>
                    <p class="profile">
                        <editable-span :disabled="mode === 'preview'" v-bind:value="displayResume.birthday" v-on:edit="onEdit('birthday', $event)"></editable-span>
                        <editable-span :disabled="mode === 'preview'" v-bind:value="displayResume.gender" v-on:edit="onEdit('gender', $event)"></editable-span>
                        <editable-span :disabled="mode === 'preview'" v-bind:value="displayResume.email" v-on:edit="onEdit('email', $event)"></editable-span>
                        <editable-span :disabled="mode === 'preview'" v-bind:value="displayResume.phone" v-on:edit="onEdit('phone', $event)"></editable-span>
                    </p>
                </section>
                <section class="skills">
                    <h2>技能</h2>
                    <ul>
                        <li v-for="skill,index in displayResume.skills">
                            <editable-span :disabled="mode === 'preview'" class="name" v-bind:value="skill.name" v-on:edit="onEdit('skills['+index+'].name',$event)"></editable-span>
                            <div class="description">
                                    <editable-span :disabled="mode === 'preview'" v-bind:value="skill.description" v-on:edit="onEdit('skills['+index+'].description',$event)"></editable-span>
                            </div>
                            <span class="remove" v-if="index>=4 && mode === 'edit'" @click="removeSkill(index)">x</span>
                        </li>
                        <li class="add" v-if="mode === 'edit'">
                            <span @click="addSkill">添加</span>
                        </li>
                    </ul>
                </section>
                <section class="projects">
                    <h2>项目经历</h2>
                    <ol>
                        <li v-for="project,index in displayResume.projects">
                            <header>
                                <div class="start">
                                    <h3 class="name">
                                        <editable-span :disabled="mode === 'preview'" :value="project.name" @edit="onEdit('projects['+index+'].name',$event)"></editable-span>
                                    </h3>
                                    <span class="link">
                                        <editable-span :disabled="mode === 'preview'" :value="project.link" @edit="onEdit('projects['+index+'].link',$event)"></editable-span>
                                    </span>
                                </div>
                                <div class="end">
                                    <span class="keywords">
                                            <editable-span :disabled="mode === 'preview'" :value="project.keywords" @edit="onEdit('projects['+index+'].keywords',$event)"></editable-span>
                                    </span>
                                </div>
                            </header>
                            <p class="description">
                                    <editable-span :disabled="mode === 'preview'" :value="project.description" @edit="onEdit('projects['+index+'].description',$event)"></editable-span>
                            </p>
                            <span class="remove" @click="removeProject(index)" v-if="index>=2 && mode === 'edit'">x</span>
                        </li>
                        <li class="add" v-if="mode === 'edit'">
                            <span @click="addProject">添加</span>
                        </li>    
                    </ol>
                </section>
            </div>
    `
})