import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import { LoginInputPayload } from '../model/type';
import clsx from 'clsx';

const COLORS = [
  'text-red-500',
  'text-pink-500',
  'text-green-500',
  'text-yellow-500',
  'text-blue-500',
  'text-purple-500',
];

const getRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

const getRandomFloat = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const getRandomAnimation = (index: number) => {
  const name = `float-random-${index}`;
  const x = getRandomFloat(-100, 100);
  const y = getRandomFloat(-100, 100);

  const style = `
  @keyframes ${name} {
    0%   { transform: translate(0px, 0px); }
    25%  { transform: translate(${x}px, ${y}px); }
    50%  { transform: translate(${x / 2}px, ${-y}px); }
    75%  { transform: translate(${-x}px, ${y / 2}px); }
    100% { transform: translate(0px, 0px); }
  }
`;
  return { name, style };
};

const LoginInput = ({
  //   labelTitle,
  placeholderText,
  typeName = 'text',
}: //   htmlForName,
LoginInputPayload) => {
  const [value, setValue] = useState('');
  const [chars, setChars] = useState<
    { char: string; color: string; animation: string }[]
  >([]);

  const [styles, setStyles] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
  };

  const handleClick = () => {
    if (isEditing) {
      setIsEditing(false); // 정렬로 전환
    }
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
    setShowPassword(false);
    setValue('');
    setChars([]);
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (value === '') {
      setChars([]);
      setStyles([]);
      return;
    }

    const newChars: { char: string; color: string; animation: string }[] = [];
    const newStyles: string[] = [];

    const visibleText =
      typeName === 'password' && !isEditing && !showPassword
        ? '*'.repeat(value.length)
        : value;

    visibleText.split('').forEach((char, i) => {
      const { name, style } = getRandomAnimation(i);
      newChars.push({
        char,
        color: getRandomColor(),
        animation: name,
      });
      newStyles.push(style);
    });

    setChars(newChars);
    setStyles(newStyles);
  }, [value, isEditing, showPassword]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);
  return (
    <div
      className="relative w-96 h-96 rounded-full px-4 py-2 bg-white cursor-pointer overflow-hidden  "
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing && (
        <input
          ref={inputRef}
          type={typeName}
          placeholder={placeholderText}
          value={value}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-55 focus:bg-amber-200"
        />
      )}

      <style>{styles.join('\n')}</style>

      <div className="relative w-full h-full">
        {chars.map((c, i) => (
          <span
            key={i}
            className={clsx('absolute text-lg font-bold', c.color)}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',

              animation: `${c.animation} 10s ease-in-out infinite`,
            }}
          >
            {c.char}
          </span>
        ))}
      </div>
      {/* 비밀번호 토글 버튼 */}
      {typeName === 'password' && !isEditing && (
        <button
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute bottom-4 right-4 text-sm text-blue-500"
        >
          {showPassword ? '숨기기' : '보이기'}
        </button>
      )}
    </div>
  );
};

export default LoginInput;
