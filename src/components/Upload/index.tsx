import React, { useRef } from 'react';

export interface IUploadProps {
  resetKey: string | number;
  children: React.ReactElement;
  onChange?: (files: FileList | null) => void;
  accept?: string;
  multiple?: boolean;
}

/**
 * `Upload` 是一個上傳元件。幫助我們能夠發佈文字、圖片、影片、檔案到後端伺服器上。
 */
const Upload = ({ resetKey, children, onChange, accept, multiple, ...props }: IUploadProps) => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleOnClickUpload = () => {
    if (!inputFileRef.current) return;
    inputFileRef.current.click();
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof onChange === 'function') {
      onChange(event?.target?.files);
    }
  };

  return (
    <>
      <input
        key={resetKey}
        ref={inputFileRef}
        type="file"
        style={{ display: 'none' }}
        onChange={handleOnChange}
        accept={accept}
        multiple={multiple}
        {...props}
      />
      {React.cloneElement(children, {
        onClick: handleOnClickUpload,
      })}
    </>
  );
};

export default Upload;
