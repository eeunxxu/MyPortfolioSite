'use client';

import React from 'react';
import LoginInput from '../ui/LoginInput';

const LoginForm = () => {
  return (
    <div>
      <div>로그인 폼</div>
      <form action="" className="flex justify-center items-center gap-x-10">
        <LoginInput
          labelTitle="이메일"
          placeholderText="이메일 입력"
          htmlForName="email"
        />
        <LoginInput
          labelTitle="비밀번호"
          placeholderText="비밀번호 입력"
          htmlForName="password"
          typeName="password"
        />
      </form>
    </div>
  );
};

export default LoginForm;
