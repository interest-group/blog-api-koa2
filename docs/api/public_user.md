# public user

## 接口前缀

```
http://localhost:5220/api/public/v1
```


## 1.  用户注册

```
POST     /user/register
```
### 请求参数

> body 参数

| 参数名 | 参数类型 | 说明 | 是否必填 |
| --- | --- | --- | --- |
| nickname | String | 昵称 | 是 |
| username | String | 账号 | 是 |
| password | String | 密码 | 是 |

### 请求示例



```
  {
    "nickname": "focus",
    "username": "focus",
    "password": "focus123"
  }
```

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
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidXNlcm5hbWUiOiJkZW1vIiwibmlja25hbWUiOiJmb2N1cyIsInJvbGUiOjEsImlhdCI6MTYxODY3MzIzMCwiZXhwIjoxNjE4ODQ2MDMwfQ.QKtOB8L4usa5OEa_dUK5alNlapGzY-7B7rD6PvjB-JM"
  }
```



## 2.  登录

```
POST     /user/login
```
### 请求参数

> body 参数

| 参数名 | 参数类型 | 说明 | 是否必填 |
| --- | --- | --- | --- |
| username | String | 账号 | 是 |
| password | String | 密码 | 是 |

### 请求示例



```
  {
    "username": "focus",
    "password": "focus123"
  }
```

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
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidXNlcm5hbWUiOiJkZW1vIiwibmlja25hbWUiOiJmb2N1cyIsInJvbGUiOjEsImlhdCI6MTYxODY3MzIzMCwiZXhwIjoxNjE4ODQ2MDMwfQ.QKtOB8L4usa5OEa_dUK5alNlapGzY-7B7rD6PvjB-JM"
  }
```



## 3.  获取用户信息

```
POST     /user/info/:id
```
### 请求参数

> params 参数

| 参数名 | 参数类型 | 说明 | 是否必填 |
| --- | --- | --- | --- |
| id | Number | 用户id | 是 |

### 响应示例



```
  {}
```



