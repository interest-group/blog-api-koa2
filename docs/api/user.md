
## 接口前缀

```shell
http://localhost:5220/api/v1
```

# 用户

## 注册

```
POST    /user/register
```

### 请求参数

| 参数 | 说明 | 是否必填 |
| ---|---|:---: |
| nickname | 昵称 | 是 |
| username | 账号 | 是 |
| password | 密码 | 是 |


### 响应数据

```json
{
    "status": 200,
    "data": {
        "id": 5,
        "username": "demo",
        "nickname": "focus",
        "role": 1
    },
    "message": "operation success.",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidXNlcm5hbWUiOiJkZW1vIiwibmlja25hbWUiOiJmb2N1cyIsInJvbGUiOjEsImlhdCI6MTYxODY3MzIzMCwiZXhwIjoxNjE4ODQ2MDMwfQ.QKtOB8L4usa5OEa_dUK5alNlapGzY-7B7rD6PvjB-JM"
}
```

## 登录

```
POST    /user/login
```

### 请求参数

| 参数 | 说明 | 是否必填 |
| ---|---|:---: |
| username | 账号 | 是 |
| password | 密码 | 是 |


### 响应数据

```json
{
    "status": 200,
    "data": {
        "id": 5,
        "username": "demo",
        "nickname": "focus",
        "role": 1
    },
    "message": "operation success.",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidXNlcm5hbWUiOiJkZW1vIiwibmlja25hbWUiOiJmb2N1cyIsInJvbGUiOjEsImlhdCI6MTYxODY3MzQyMCwiZXhwIjoxNjE4ODQ2MjIwfQ.GXcMxvMbWQPKcP82ThaN4e3hefCAwfgEFEKRdVM2x-I"
}
```

## 登出

```
POST    /user/logout
```

### 请求参数

- 无


### 响应数据

```json
{
    "status": 200,
    "data": null,
    "message": "operation success."
}
```

## 用户信息

```
POST    /user/info
```

### 请求参数

- 无


### 响应数据

```json
{
    "status": 200,
    "data": {
        "id": 5,
        "username": "demo",
        "nickname": "focus",
        "role": 1
    },
    "message": "operation success.",
    "uid": 5
}
```


## 修改密码

```
POST    /user/update/password
```

### 请求参数

| 参数 | 说明 | 是否必填 |
| ---|---|:---: |
| password | 原密码 | 是 |
| newPassword | 新密码 | 是 |


### 响应数据

```json
{
    "status": 200,
    "data": null,
    "message": "operation success."
}
```
