# public file

## 接口前缀

```
http://localhost:5220/api/public/v1
```


## 1.  文件上传(服务器)

```
POST     /file/upload/server
```
### 请求参数

> body 参数

| 参数名 | 参数类型 | 说明 | 是否必填 |
| --- | --- | --- | --- |
| file | File | 上传文件 | 是 |

### 响应示例



```
  {
    "status": 200,
    "data": "/resources/uploads/upload_3dadfe86a8a9e519f77545d5befa683a.jpg",
    "message": "operation success."
  }
```



## 2.  文件上传(OSS)

```
POST     /file/upload/oss
```
### 请求参数

> body 参数

| 参数名 | 参数类型 | 说明 | 是否必填 |
| --- | --- | --- | --- |
| file | File | 上传文件 | 是 |

### 响应示例



```
  {
    "status": 200,
    "data": "http://oss.focus.com/upload_3dadfe86a8a9e519f77545d5befa683a.jpg",
    "message": "operation success."
  }
```



## 3.  文件上传(客户端)

```
POST     https://upload-z2.qiniup.com
```
### 请求参数

> body 参数

| 参数名 | 参数类型 | 说明 | 是否必填 |
| --- | --- | --- | --- |
| file | File | 上传文件 | 是 |
| token | String | oss令牌 | 是 |
| key | String | 文件名 | 否 |

### 响应示例



```
  {
    "hash": "ImJsb2ctbm9kZSIsImRlYWRsaW",
    "key": "ImJsb2ctbm9kZSIsImRlYWRsaW"
  }
```



## 4.  获取 OSS token (用于客户端上传)

```
POST     /file/upload/token
```
### 请求参数

- 无

### 响应示例



```
  {
    "status": 200,
    "data": {
      "token": "ImJsb2ctbm9kZSIsImRlYWRsaW5lIjoxNjE4ODE5MzAxfQ==",
      "expires": 1618819291
    },
    "message": "operation success."
  }
```



