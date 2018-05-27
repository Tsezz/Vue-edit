Vue.component('skinPicker', {
    methods: {
        setTheme(name) {
            // this.mainClass = name
            document.body.className = name
        }
    },
    template: `
    <div class="skinPicker">
            <button @click="setTheme('default')">默认</button>
            <button @click="setTheme('orange')">橙色</button>
        </div>
    `
})