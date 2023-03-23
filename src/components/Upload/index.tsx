import React, { useRef } from 'react';

export interface IUploadProps {
  /**
   * 重設鍵值，鍵值被改變時 input value 會被重設
   */
  resetKey: string | number;
  /**
   * 內容，這邊指的是上傳按鈕外觀
   */
  children: React.ReactElement;
  /**
   * 選取上傳檔案時的 callback
   */
  onChange?: (files: FileList | null) => void;
  /**
   * 限制檔案類型
   */
  accept?: string;
  /**
   * 是否選取多個檔案
   */
  multiple?: boolean;
}

/**
 * `Upload` 是一個上傳元件。幫助我們能夠發佈文字、圖片、影片、檔案到後端伺服器上。
 */
const Upload = ({
  resetKey,
  children,
  onChange,
  accept,
  multiple = false,
  ...props
}: IUploadProps) => {
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
