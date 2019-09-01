#vue学习记录
## 起步
 
- 需要引入vue.js
- 新建变量使用 `var vm = new Vue({  })`
- 必须的值 
	- `el` 值为html内的id
	- `data` 值为用来使用的值
	- `methods` 值为调用的方法/函数  
- 非必要
	- `filters` 过滤器
  - `computed` 计算属性 

### 数据与方法
- `var vm ... data:object` `object={a:1}` 
  + 使用外部数据来做 `data`  
  + `vm.a == object.a`
  + 当其中一个改变另一个也会改变
  + 只有 `object`/`data` 已存在的数据，进行操作才会互相影响的
 

## 模板语法
 

### 插值
- 文本
	直接插入文本 `{{data内变量}}`
- 原始html
	使用html标签 `&#60;p v-html:"data内变量"`
- 属性
	因为标签的属性不能直接使用Mustache语法
	所以在前面添加 `v-bind：` 值就可以直接调用
- 表达式
	可以直接使用javascript表达式 `{{ 任意表达式 }}`

### 指令
- 文本
有 `v-` 前缀的特殊属性
例如 `v-if` 可以来设置标签是否插入/移除
-参数
	可以作为 `v-bind` 属性的参数
- 用户输入
	可以实现输入框内容双向控制
- 过滤器
	通过自定义过滤器 使用时 `{{ 内容 | 过滤器 }}`
- 动态参数
	`&#60;a v-bind:[表达式]:"值" >` 可以动态的选择标签的某个属性(2.6.0)
  + 参数约束：表达式要求结果是字符串，或者 `null` 来移除绑定
  + 表达式约束：引号空格无效，无效 `v-bind:['foo' + bar]="value"`
  + 浏览器会自动将特性转换为小写
- 修饰符
	`.` 用于指出一个命令以特殊的方式绑定

### 缩写
- v-bind
	`v-bind:` = `:`
- v-on
	`v-on:` = `@` 
 
## 计算属性 
### 基础例子

```
var vm = new Vue({
	el: "#id",
	data: {
		message: "hello"
	},
	computed:{
		reverser: function(){
			return this.message.split('').reverser().join('')
		}
	}
})	
```

在 `vm` 内的函数，`this` 指的是 `vm` ，所以 `this.message` 指的就是 `vm.message`

#### 计算器属性缓存vs方法

- 在标签中可以直接使用`{{message()}}`这种方法不会有缓存，每次刷新页面都会运算一次
- 而使用计算属性，会产生缓存，刷新以后值不变不会再次运算
- 不要缓存则直接使用方法

#### 计算属性vs监听方法

- 监听方法
```
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
})
```
- 计算属性
```
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  }
})
```
- 计算属性更加简洁方便

#### 计算属性的setter

- 计算属性默认只有 `getter` 而 `set` 要自己设置
```
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
}
```
- 运行 `vm.fullName = 'xxx'` 会调用 `setter`

## 条件渲染
### v-if

```
&#60;p v-if="seen">true&#60;/p>
```
在标签中使用 `v-if` 可以通过 `seen` 的值来确定是否显示该标签

### 在 `<template>` 元素中使用 `v-if` 条件渲染分组
- `<template>` 中加入 `v-if` 无论是否渲染，都会隐藏 `<template>`
- 当为 `true` 时则会渲染子元素

### v-else

```
&#60;div id="el">
&#60;p v-if="seen">true&#60;/p>
&#60;p v-else>false&#60;/p>
&#60;/div>
```
在 `v-if` 后使用，当 `v-if` 不显示时则显示 `v-else` 的标签

### v-else-if
2.10版本新增，用来多次使用if判断
```
&#60;div id="el">
&#60;p v-if="seen">true&#60;/p>
&#60;p v-else-if="xx">true&#60;/p>
&#60;p v-else-if="xxx">true&#60;/p>
&#60;p v-else>false&#60;/p>
&#60;/div>
```

### 用 `key` 管理可复用元素
- 当 `v-else` 与 `v-if` 元素相同时，在切换显示时，输入框的内容不会改变
```
&#60;template v-if="loginType === 'username'">
  &#60;label>Username</label>
  &#60;input placeholder="Enter your username">
&#60;/template>
&#60;template v-else>
  &#60;label>Email&#60;/label>
  &#60;input placeholder="Enter your email address">
&#60;/template>
```
- 每个 `input` 设置 `key` 以后可以独立值，避免问题
```
&#60;template v-if="loginType === 'username'">
  &#60;label>Username</label>
  &#60;input placeholder="Enter your username" key="username-input">
&#60;/template>
&#60;template v-else>
  &#60;label>Email&#60;/label>
  &#60;input placeholder="Enter your email address" key="email-input">
&#60;/template>
```

### v-show
- 和`v-if`相似
- 只是切换 `display` 的类型
- *不支持`<template>`元素，也不支持`v-else`*

### `v-show` 对比 `v-if`
- `v-show` 无论是否显示，都会渲染
- `v-if` 不显示就不渲染
- 频繁切换用 `v-show` 很少改变用 `v-if`

### 注意
- `v-else` / `v-else-if` 必须跟在 `v-if` / `v-else-if` 之后


## 循环语句
 
- 主要都是通过通过 `v-for` 来循环
- 通过改变内容来实现不同的循环
- **`循环名称 in 数据名称`**

### 迭代数组

- `site in sites`
- 通过绑定一个数组来进行循环
```
...
&#60;li v-for:"site in sites">
  {{sites.name}}
&#60;/li>
...
data:{
  sites: [
    name: 'a',
    name: 'b', 
    name: 'c'
    ]
  }
```
渲染结果
```
&#60;li>a&#60;/li>
&#60;li>b&#60;/li>
&#60;li>c&#60;/li>
```

### 迭代对象

- `value in object` 循环输出 `object`中的值
- `(value,key) in object` 循环输出 `object` 中的值和键名 `key:value`
- `(value,key,index) in object` 循环输出 `object` 值和键名和索引 `0.key:name`

### 迭代整数

- `n in 10` 输出的就是1到10


## 样式绑定
### 绑定 Html Class
 
- 绑定样式`&#60;div v-bind:class = "active: isActive">&#60;/div>`
  + 当`isActive`为`true`时则有效，无则无效
- `:class` 可以与 `class` 并存
- 可以绑定多个`...class = "active:isActive,'text':hasError"...`
  + 第二个类必须使用上引号，否则无效
- 可以将多个样式绑定到一个值内
  + 第二个类必须使用上引号，否则无效
  ```
  ...
  class = "classObject"
  ...
  data:{
    classObject:{
      active: true,
      'text-danger':true
    }
  }
  ```
- 使用计算属性来绑定样式
  ```html
  &#60;div id="em">
    &#60;div v-bind:class="classObject">
    &#60;/div>
  &#60;/div>
  ```

  ```javascript
    var test = new Vue({
      el: "em",
      data:{
          t1: ture,
          t2: false,
        },
        computed: function(){
          return {
            class1: t1,
            class2: t2,
            class3: t1 $$ t2
          }
        }
      })
  ```
#### 数组语法

- 可以使用数组来绑定类 `<div v-bind:class="[class1,class2]">&#60;/div>`
  + 数组内无需上引号
  + 类名必须是带上引号
- 数组内还可以使用三元运算 `<div v-bind:class="[errorClass ,isActive ? activeClass : '']"></div>`

#### 用在组件上

- 在自定义组件上使用 `class` 属性时，会自动添加都根元素上
  + 根元素 `Vue.computed...template:<h1 class="foo">...`
  + 组件 `<name class="app">...`
  + 渲染后 `<h1 class="foo app">...`
  + 使用数据绑定 `class` 一样适用

### 内联样式
#### 对象语法
- 使用 `v-bind:style=" "` 来给予样式
- 可以直接设置样式 `v-bind:style="color: activeColor"`
- 可以设置好样式后直接使用`data: { styleObject:{ color : green} }`

#### 数组语法
- 可以用数组套入多个样式 `<div v-bind:style="[style1, style2]"></div>`

#### 自动添加前缀
- 如果需要添加 *浏览器引擎前缀* 时，会自动侦测并添加

#### 多重值
- 在 `style` 中可以用数组添加一个包含多个值的数组，常用于添加前缀
- `'-webkit-box','-ms-flexbox','flex'`
- 只会渲染最后一个被浏览器支持的值

## 事件处理器
 
- 使用 `v-on` 方法 `<button v-on:click=" methods ">&#60;/button>`
- 可以直接使用表达式，也可以调用方法
- 可以用内联JavaScript语句 `<button v-on:click=" methods('hi') ">&#60;/button>`

### 事件修饰符
 
- `.` 使用点来添加事件修饰符
- 修饰符
  + `.stop` 阻止冒泡事件
  + `.prevent` 提交不重载页面
  + `.capture` 添加事件侦听器时使用事件捕获模式???
  + `.self` 只当事件在该元素本身（而不是子元素）触发时触发回调
  + `.once` 只能点击一次 (2.1.3新增)
  + `.passive` 滚动行为会立即触发(2.3.0新增)，不会等待后面的方法
  + `.exact` 
- 可以串联修饰符 `<button v-on:click.stop.once=" methods('hi') "></button>` 
- 可以只使用修饰符 `<button v-on:click.stop.once></button>`

### 按键修饰符

- 在监听键盘事件时可以使用按键修饰符
- 使用的编码是keyCode`<input v-on:keyup.13="submit">`
- 也提供一些其他的按键
  + `.enter`
  + `.tab`
  + `.delete` (删除和退格)
  + `.esc`
  + `.space`
  + `.up`
  + `.down`
  + `.left`
  + `.right`
  + `.ctrl`
  + `.alt`
  + `.shift`
  + `.meta`
- `.exact` (2.5.0新增)进准控制按键触发
  + `click.ctrl` 其他按键一起按下也会触发
  + `click.ctrl.exact` 只有正确单独按键才会触发
  + `click.exact` 只有什么都不按点击才会触发

### 鼠标按键修饰符
- 2.2.0新增
  + `.middle`
  + `.left`
  + `.right`

## 表单
- 使用 `v-model` 可以实现在表单数据双向绑定

### 输入框
- 在输入框添加 `v-model` `<input v-model="message">`  
- 在`data`中添加 ` message: '' `
- 实现输入框内容与数据双向绑定

### 复选框
#### 单复选框
- `<input type="checkbox" id="checkbox" v-model="checked">`
- 选中是 `checkbox` 的值为`true` 没选中时为 `false`

#### 多个复选框

```html
  &#60;input type="checkbox" id="runoob" value="Runoob" v-model="checkedNames">
  &#60;label for="runoob">Runoob&#60;/label>
  &#60;input type="checkbox" id="google" value="Google" v-model="checkedNames">
  &#60;label for="google">Google&#60;/label>
  &#60;input type="checkbox" id="taobao" value="Taobao" v-model="checkedNames">
  &#60;label for="taobao">taobao&#60;/label>
```

- 要使用同一个 `v-model` 
- 当多个复选框时数据 `checkedNames` 需要设置为 `checkedNames:[]` 空数组
- 不为空数组时，选则其中一个复选框 `checkedNames` 则变为 `true` 复选框全部都会变选上，取消一个复选框也是同理，会取消所有复选框的选择

### 单选按钮
- 要使用同一个 `v-model` `v-model="picked"`
- `picked` 的值为选择按钮的 `value`

### select 列表
- 与单选按钮一样

### 修饰符
- `.lazy` 
  + 输入框内容与数据不会立马同步
  + 只有在 `change` 事件以后才会同步
- `.number` 
  + 将输入类型转化为 `Number`
- `.trim` 
  + 自动过滤首尾的空格

## 组件
- `data` 可以在 `componet` 中设置
  + `data:{ cont=0 }` 每个标签会使用同一个 `cont`
  + `data:function(){ return cont = 0}` 每个标签的 `cont` 会独立计算
- 使用 `template:` 来设置组件标签的内容 `template: '<h3>{{ title }}</h3>'`  
### 全局组件
- 注册方式 `Vue.componet(tagName,options)`
- 使用方式 `<tagName> </tagName>`
- **必须创建根实例(new Vue中绑定ID)才能调用组件**

### 局部组件
- 注册方式 `new Vue... componets:{'run':<div></div}...`
- 使用方式，在绑定标签内使用标签，只在父模板可用

### Prop
- 父元素传递数据的一个自定义属性
- 父组件需要通过 `props` 传输给子组件
- 子组件需要通过 `props` 声明
- 声明方式 `Vue.componet("chlid",{props:['message']})`
- 使用 `<chlid message="hello"></chlid>`

### 动态Prop
- 使用方法 `v-bind:message="messageName"`
- 使用 `v-bind` 后要使用 `data` 内的数据
- 会 `messageName` 的值同步
- 可以使用循环来作出列表
  + `<listName v-for="forName in forData" v-bind:propName="forName"></listName>`
- 同样需要声明

### 单个根元素
- 只能使用一个主标签，不能存在两个最高级的同级标签 例如`<h1>...</h1><div>...</div>`
- 但是可以将所有内容放到一个大标签内
- 在 `object` 下有多个数值，例如 `v-for:name` 的结果
- 使用 `v:bind:name=""name` 然后再声明就可以直接调用 `name` 内的值
- 例如 `{{name.key}}`

### 监听子组件事件
- 在组件标签上添加事件监听 `v-on:name="methods"` 
  + `name` 为触发的名称
  + `methods` 为触发后操作
- 触发方法 `v-on:click="$emit('name')"` 使用 `$emit` 方法

### 使用事件抛出一个值
- 通过点击等方式触发事件并抛出一个值 `v-on:click="$emit('name',1)"` 
  + `name` 为触发的事件
  + `1` 为抛出的值
- 父级组件可以通过 `$event` 来访问这个值
- 也可以在事件中触发方法，将这个值作为方法的参数

### 在组件上使用 `v-model`

### Prop验证
- ？？？
