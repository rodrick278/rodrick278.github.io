---
title: axios的使用
date: 2020-09-09
categories:
 - 前端
tags:
- axios
- ES6
---

## 一、httpbin.org

> [httpbin.org](https://httpbin.org/) 是一个可以提供接口的网站，里面包含了各种不同的请求方法，可以作为测试接口时使用*



## 二、axios起步

### 1.什么是axios

Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。

他的特性：

>- 从浏览器中创建 [XMLHttpRequests](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
>- 从 node.js 创建 [http](http://nodejs.org/api/http.html) 请求
>- 支持 [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) API
>- 拦截请求和响应
>- 转换请求数据和响应数据
>- 取消请求
>- 自动转换 JSON 数据
>- 客户端支持防御 [XSRF](http://en.wikipedia.org/wiki/Cross-site_request_forgery)

### 2.安装

npm：

```bash
npm install axios
```

CDN：

```html
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

### 3.使用

#### axios 基本API

* axios(config)
* axios(url[, config])

```js
// 发送 POST 请求1
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});

// 发送 POST 请求2
axios('/user/12345',{
  method: 'post',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});
```

#### 请求方法的别名

为方便起见，为所有支持的请求方法提供了别名

* axios.request(config)

* axios.get(url[, config])

* axios.delete(url[, config])

* axios.head(url[, config])

* axios.options(url[, config])

* axios.post(url[, data[, config]])

* axios.put(url[, data[, config]])

* axios.patch(url[, data[, config]])

  > 注意
  >
  > 1. 在使用别名方法时， url、method、data 这些属性都不必在配置中指定。 
  > 2. 存在`data`和`config`的时候，如果不传data可以给一个`{}`

#### 并发

处理并发请求的助手函数

* axios.all(iterable)

* axios.spread(callback)

```js
// 并发处理
axios.all([
  axios.get('https://httpbin.org/headers'),
  axios.post('http://httpbin.org/post',{
    name:'abc',age:18
  })
])
// all返回的时候，axios提供了spread方法，可以单独拿出每一个res,当然也可以直接用数组
.then(results=>{console.log(results[0].data,results[1].data);})
.then(axios.spread((res1,res2)=>{console.log(res1,res2);}))
```

#### requset请求配置

这些是创建请求时可以用的配置选项。只有 `url` 是必需的。如果没有指定 `method`，请求将默认使用 `get` 方法。

```js
{
   // `url` 是用于请求的服务器 URL
  url: '/user',

  // `method` 是创建请求时使用的方法
  method: 'get', // default

  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: 'https://some-domain.com/api/',

  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [function (data, headers) {
    // 对 data 进行任意转换处理
    return data;
  }],

  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    return data;
  }],

  // `headers` 是即将被发送的自定义请求头
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `params` 是即将与请求一起发送的 URL 参数
  // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
  params: {
    ID: 12345
  },

   // `paramsSerializer` 是一个负责 `params` 序列化的函数
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function(params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },

  // `data` 是作为请求主体被发送的数据
  // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
  // 在没有设置 `transformRequest` 时，必须是以下类型之一：
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器专属：FormData, File, Blob
  // - Node 专属： Stream
  data: {
    firstName: 'Fred'
  },

  // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
  // 如果请求话费了超过 `timeout` 的时间，请求将被中断
  timeout: 1000,

   // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false, // default

  // `adapter` 允许自定义处理请求，以使测试更轻松
  // 返回一个 promise 并应用一个有效的响应 (查阅 [response docs](#response-api)).
  adapter: function (config) {
    /* ... */
  },

 // `auth` 表示应该使用 HTTP 基础验证，并提供凭据
  // 这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  },

   // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // default

  // `responseEncoding` indicates encoding to use for decoding responses
  // Note: Ignored for `responseType` of 'stream' or client-side requests
  responseEncoding: 'utf8', // default

  //============================================================
  //以上是相对常用或者重要的
    
   // `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称
  xsrfCookieName: 'XSRF-TOKEN', // default

  // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
  xsrfHeaderName: 'X-XSRF-TOKEN', // default

   // `onUploadProgress` 允许为上传处理进度事件
  onUploadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },

  // `onDownloadProgress` 允许为下载处理进度事件
  onDownloadProgress: function (progressEvent) {
    // 对原生进度事件的处理
  },

   // `maxContentLength` 定义允许的响应内容的最大尺寸
  maxContentLength: 2000,

  // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  },

  // `maxRedirects` 定义在 node.js 中 follow 的最大重定向数目
  // 如果设置为0，将不会 follow 任何重定向
  maxRedirects: 5, // default

  // `socketPath` defines a UNIX Socket to be used in node.js.
  // e.g. '/var/run/docker.sock' to send requests to the docker daemon.
  // Only either `socketPath` or `proxy` can be specified.
  // If both are specified, `socketPath` is used.
  socketPath: null, // default

  // `httpAgent` 和 `httpsAgent` 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。允许像这样配置选项：
  // `keepAlive` 默认没有启用
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // 'proxy' 定义代理服务器的主机名称和端口
  // `auth` 表示 HTTP 基础验证应当用于连接代理，并提供凭据
  // 这将会设置一个 `Proxy-Authorization` 头，覆写掉已有的通过使用 `header` 设置的自定义 `Proxy-Authorization` 头。
  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },

  // `cancelToken` 指定用于取消请求的 cancel token
  // （查看后面的 Cancellation 这节了解更多）
  cancelToken: new CancelToken(function (cancel) {
  })
}
```

#### response响应结构

```js
{
  // `data` 由服务器提供的响应
  data: {},

  // `status` 来自服务器响应的 HTTP 状态码
  status: 200,

  // `statusText` 来自服务器响应的 HTTP 状态信息
  statusText: 'OK',

  // `headers` 服务器响应的头
  headers: {},

   // `config` 是为请求提供的配置信息
  config: {},
 // 'request'
  // `request` is the request that generated this response
  // It is the last ClientRequest instance in node.js (in redirects)
  // and an XMLHttpRequest instance the browser
  request: {}
}
```

#### 全局的axios默认值值设定

设定了全局默认值之后，如果单独`axios`的对象里没有响应属性就会使用全局默认值

```js
axios.defaults.baseURL='https://httpbin.org'
axios.defaults.timeout=5000
```

#### 创建axios实例

可以在不同的模块单独配置 `axios` 实例，比如首页和详情单独使用

```js
// 创建axios实例
const instance1 = axios.create({
  baseURL: 'https://api.example.com'
});

instance1('url1',{
  timeout: 1000,
}).then(res=>{
  console.log(res);
})

instance1('url2',{
  timeout: 2000,
}).then(res=>{
  console.log(res);
})
```

#### 拦截器

在请求或响应被 `then` 或 `catch` 处理前拦截它们

```js
// 添加请求拦截器
// 注意 request拦截器是发送请求之前的拦截
// 处理完之后需要把结果返回传出去，不然没有返回值请求不能正常发送或者返回出去
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 可以做一些信息的补充，比如请求头不符合服务器要求，进行补充
    // 可以发网络请求时，界面中加一个请求中动画
    // 比如登陆，查看是否有token，没有可以返回回去要求用户登录
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // 这里可以直接返回data
    return response.data;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
```





## 三、网络请求模块的封装

> 为什么要做封装？
>
> 我们要有这样的意识，在项目中，对于一些反复依赖的第三方模块或者框架，我们一般都要对其进行封装
>
> * 可以在我们项目需求基础上对其优化
> * 防止某天需要更换模块的时候，会产生过大的工作量和不可避免的灾难

#### 封装思路

我们将自己的封装放在 `src/network/request.js`

* 方法一，最基础的创建实例->使用回调函数触发

  ```js
  import axios from "axios";
  
  // 这里没export defalut是因为可能会有多个方法
  /**
   * 
   * @param {Object} config 
   * @param {Function} success 成功的回调函数
   * @param {Function} failure 失败的回调函数
   */
  export function request(config,success,failure) {
    // 创建实例
    const instance = axios.create({
      baseURL: 'https://httpbin.org',
      timeout: 5000
    })
  
    instance(config)
      .then(res => {
        success(res)
      })
      .catch(err => {
        failure(err)
      })
  }
  ```

  外部调用

  ```js
  created() {
      // 方法1
      request(
        {
          url: "/get",
        },
        (res) => {
          console.log(res);
          this.jsonData = res;
        },
        (err) => {
          console.log(err);
        }
      );
   }
  ```

* 方法二，返回Promise对象

  * 处理方式一，这个方式复杂化了，相当于把 `instance` 返回的 `Promise` 解包后再变成 `Promise` 对象传回去

  ```js
  import axios from "axios";
  
  export function request(config) {
    return new Promise((resolve, reject) => {
      // 创建实例
      const instance = axios.create({
        baseURL: 'https://httpbin.org',
        timeout: 5000
      })
  
      // 发送请求
      instance(config)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  ```

  * 处理方式二，直接返回 `instance(config)` 

    > 观察源码可以知道
    >
    > 由于`axios.create`返回的本身是`AxiosInstance`对象
    >
    > <img src="https://gitee.com/rodrick278/img/raw/master/img/image-20200910225109443.png" alt="image-20200910225109443" style="zoom: 50%;" />
    >
    > 而`AxiosInstance(config)`方法返回的就是 `AxiosPromise`对象
    >
    > <img src="https://gitee.com/rodrick278/img/raw/master/img/image-20200910225132481.png" alt="image-20200910225132481" style="zoom:50%;" />
    >
    > 所以直接返回`Promise`对象就好

    

  ```js
  import axios from "axios";
  
  export function request(config) {
    // 由于axios.create返回的本身是AxiosInstance对象，而AxiosInstance(config)方法返回的就是 AxiosPromise对象，所以直接返回Promise对象就好
    const instance = axios.create({
      baseURL: 'https://httpbin.org',
      timeout: 3000
    })
  ```

  外部调用

  ```js
  created() {
      // 方法2&3
      request({
        url: "/get",
      })
        .then((res) => {
          console.log("out res",res);
          this.jsonData = res;
        })
        .catch((err) => {
          console.log("out err", err);
        });
   }
  ```

  



