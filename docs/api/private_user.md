# private user

## 接口前缀

```
http://localhost:5220/api/private/v1
```


## 1.  获取当前用户信息

```
GET     /user/info
```
### 请求参数

- 无

### 响应示例



```
  {
    "status": 200,
    "data": {
      "id": 5,
      "username": "focus",
      "nickname": "focus",
      "role": 1
    },
    "message": "operation success.",
    "uid": 5
  }
```



## 2.  退出登录

```
GET     /user/logout
```
### 请求参数

- 无

### 响应示例



```
  {
    "status": 200,
    "data": null,
    "message": "operation success."
  }
```



## 3.  修改密码

```
GET     /user/password
```
### 请求参数

> body 参数

| 参数名 | 参数类型 | 说明 | 是否必填 |
| --- | --- | --- | --- |
| password | String | 原密码 | 是 |
| newPassword | String | 新密码 | 是 |

### 响应示例



```
  {
    "status": 200,
    "data": null,
    "message": "operation success."
  }
```



