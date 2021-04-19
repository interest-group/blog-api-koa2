
## 接口前缀

```shell
http://localhost:5220/api/private/v1
```

# 用户

## 登出

```
GET    /user/logout
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

## 当前用户信息

```
GET    /user/info
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
POST    /user/password
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
