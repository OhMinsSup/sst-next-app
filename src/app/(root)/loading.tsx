import React from 'react';

export default function Loading() {
  // position: absolute로 전체 화면을 가리는 로딩 화면을 만들어주세요.
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white opacity-75">
      Loading
    </div>
  );
}
