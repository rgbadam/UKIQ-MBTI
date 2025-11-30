# Namzar Mini Names API 前端调用示例

## 接口列表

### 1. 获取所有名字 - `POST /api/namzar/mini/names/getAll`

支持通过关键词搜索（三种语言）和性别筛选，返回所有匹配数据和总数。

#### 微信小程序示例

```javascript
// 获取所有名字
wx.request({
  url: 'https://your-domain.com/api/namzar/mini/names/getAll',
  method: 'POST',
  header: {
    'content-type': 'application/json'
  },
  data: {},
  success: function(res) {
    if (res.data.code === 200) {
      console.log('名字列表:', res.data.nameList);
      console.log('总数:', res.data.total);
    }
  },
  fail: function(err) {
    console.error('请求失败:', err);
  }
});

// 搜索名字
wx.request({
  url: 'https://your-domain.com/api/namzar/mini/names/getAll',
  method: 'POST',
  header: {
    'content-type': 'application/json'
  },
  data: {
    keyword: '艾力',  // 搜索关键词
    gender: 'male'    // 可选：性别筛选
  },
  success: function(res) {
    if (res.data.code === 200) {
      console.log('搜索结果:', res.data.nameList);
    }
  }
});
```

### 2. 随机推荐名字 - `POST /api/namzar/mini/names/random`

随机获取指定数量的名字。

#### 微信小程序示例

```javascript
// 获取随机名字
wx.request({
  url: 'https://your-domain.com/api/namzar/mini/names/random',
  method: 'POST',
  header: {
    'content-type': 'application/json'
  },
  data: {
    count: 10  // 可选，默认10，最大50
  },
  success: function(res) {
    if (res.data.code === 200) {
      console.log('随机名字:', res.data.nameList);
      console.log('数量:', res.data.count);
    }
  }
});
```

### 3. 根据ID获取名字详情 - `POST /api/namzar/mini/names/getById`

根据名字ID获取详细信息。

#### 微信小程序示例

```javascript
// 获取名字详情
wx.request({
  url: 'https://your-domain.com/api/namzar/mini/names/getById',
  method: 'POST',
  header: {
    'content-type': 'application/json'
  },
  data: {
    id: 123  // 名字ID
  },
  success: function(res) {
    if (res.data.code === 200) {
      console.log('名字详情:', res.data.name);
      // res.data.name 包含: id, nameUyghur, nameChinese, nameLatin, gender, meaning, description, origin, tag
    } else if (res.data.code === 404) {
      console.log('名字不存在');
    }
  }
});
```

## 响应数据格式

### getAll 接口响应
```json
{
  "code": 200,
  "nameList": [
    {
      "id": 1,
      "nameUyghur": "ئەلى",
      "nameChinese": "艾力",
      "nameLatin": "Ali",
      "gender": "male",
      "meaning": "高尚的",
      "description": "这是一个常见的维吾尔名字",
      "origin": "阿拉伯",
      "tag": "经典"
    }
  ],
  "total": 100
}
```

### random 接口响应
```json
{
  "code": 200,
  "nameList": [
    {
      "id": 1,
      "nameUyghur": "ئەلى",
      "nameChinese": "艾力",
      "nameLatin": "Ali",
      "gender": "male",
      "meaning": "高尚的",
      "description": "这是一个常见的维吾尔名字",
      "origin": "阿拉伯",
      "tag": "经典"
    }
  ],
  "count": 10
}
```

### getById 接口响应
```json
{
  "code": 200,
  "name": {
    "id": 1,
    "nameUyghur": "ئەلى",
    "nameChinese": "艾力",
    "nameLatin": "Ali",
    "gender": "male",
    "meaning": "高尚的",
    "description": "这是一个常见的维吾尔名字",
    "origin": "阿拉伯",
    "tag": "经典"
  }
}
```

## 错误响应格式

```json
{
  "code": 400,
  "message": "ID is required"
}
```

```json
{
  "code": 404,
  "message": "Name not found"
}
```

```json
{
  "code": 500,
  "message": "Server Error"
}
```

