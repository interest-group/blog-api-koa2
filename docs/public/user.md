
## 接口前缀

```shell
http://localhost:5220/api/public/v1
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

## 获取用户信息

```
GET    /user/info/:id
```

### 请求参数

| 参数 | 说明 | 是否必填 |
| ---|---|:---: |
| id | 用户id | 是 |


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
