'use client';

import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import 'prismjs/themes/prism.css';

import { Editor } from '@toast-ui/react-editor';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import { useRef } from 'react';
import prism from 'prismjs';
import 'prismjs/components/prism-typescript';

console.log('[코드 하이라이트 플러그인]', codeSyntaxHighlight);

const Draft = () => {
  const editorRef = useRef<Editor>(null);
  // const markdown = editorRef.current?.getInstance().getMarkdown();
  // const handleGetMarkdown = () => {
  //   const markdown = editorRef.current?.getInstance().getMarkdown();
  //   console.log(markdown);
  // };
  return (
    <div className="p-8 h-[calc(100vh-64px)]">
      <Editor
        ref={editorRef}
        initialValue="마크다운 테스트"
        previewStyle="vertical"
        height="100%"
        minHeight="400px"
        initialEditType="markdown" // wysiwyg 도 가능
        useCommandShortcut={true}
        plugins={[[codeSyntaxHighlight, { highlighter: prism }]]}
      />
      {/* <button
        onClick={handleGetMarkdown}
        className="mt-4 px-4 py-2 bg-black text-white rounded"
      >
        마크다운 가져오기
      </button> */}
    </div>
  );
};

export default Draft;
