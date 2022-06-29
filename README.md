# vue3-ssr

## Project setup
```
yarn 
```

### Compiles and hot-reloads for development
```
npm run serve --- client 客户端
```
```
npm run ssr --- server 服务端
```
### Compiles and minifies for production
```
npm run build 打包客户端和服务端代码
```
```
npm run build:server 打包服务端代码
```
```
npm run build:client 打包客户端代码
```
### Lints and fixes files
```
npm run lint
```
### 特别注意 webpack-manifest-plugin 该插件 使用4.x版本 5.x是webpack5.x的
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


```组件 asyncData()
// 最普通的用法也就这样了，在这里面去触发 action 请求接口
asyncData(store: any, route: any) {
    return store.dispatch("HomeMv/getMvListRequest", {
      limit: 24,
      loadMoreCount: 0,
    });
}

// 如果业务比较复杂的话，你也许需要这样写
asyncData(store: any, route: any) {
    return Promise.all([
      this.getMvUrl(store, route),
      this.getMvLikedCount(store, route),
      this.getMvDetail(store, route).then(async () => {
        await this.getArtistDetail(store, route);
        await this.getArtistMvList(store, route);
        await store.dispatch("HistoryMv/addHistoryMv", store.state.WatchMv.mv);
      }),
      this.getCommentMvList(store, route),
    ]).then();
}

// 列出上面使用的其中一个函数
async getMvUrl(store?: any, route?: any) {
    store = store || this.$store; // 至少要拿到一个 store 吧，毕竟也不是只有 asyncData 函数会用到 getMvUrl

    const mvid = this.mvUrlState
      ? this.mvUrlState.queryParams.mvid
      : route.value.params.mvid;

    await store.dispatch("WatchMv/getMvUrlRequest", {
      id: mvid,
    });
}```