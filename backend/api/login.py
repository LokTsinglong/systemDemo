from flask import Blueprint,request, jsonify
from flask import session
from backend.models import User

login_api=Blueprint('login_api',__name__)

@login_api.route('/login',methods=['POST']) 
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    
    # 验证用户是否存在
    if not user:
        return jsonify({"error": "用户名或密码错误"}), 401
    
    # 验证密码
    if user.password != data['password']:
        return jsonify({"error": "用户名或密码错误"}), 401
    
    # 验证角色
    if user.role != data['role']:
        return jsonify({"error": "角色权限不足"}), 403
    
    # 使用 Session 存储用户信息（关键修改！）
    session['username'] = user.username
    session['role'] = user.role

    return jsonify({"message": "登录成功", "role": user.role}), 200