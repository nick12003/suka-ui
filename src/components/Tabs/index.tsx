import React from 'react';

import { useColor } from '@/theme/useColor';

import TabGroup from './TabGroup';
import Tab from './Tab';

export type TOptions = Array<{
  value: string;
  label: React.ReactNode;
}>;

export interface ITabGroupProps {
  /**
   * 主題配色，primary、secondary 或是自己傳入色票
   */
  themeColor?: string;
  /**
   * Tabs 選項內容
   */
  options?: TOptions;
  /**
   * 用來指定當前被選中的 Tab 項目
   */
  value?: string;
  /**
   * 當 Tab 選項被選中時會被調用
   */
  onChange: (value?: string | undefined) => void;
}

/**
 * `Tabs` 是一個選項卡切換元件，能夠在同一層級的內容組別當中導航、切換。
 * 此元件由兩個部分構成，一個是讓使用者點擊的導覽頁籤 Tab，一個是對應的內容 TabPanel。
 * 通常使用於同一層級的內容之間互相切換、導航。
 */
const Tabs = ({
  themeColor = 'primary',
  value = '',
  options = [],
  onChange,
  ...props
}: ITabGroupProps) => {
  const { makeColor } = useColor();
  const color = makeColor({ themeColor });

  return (
    <TabGroup handleChange={onChange} value={value} color={color} {...props}>
      {options.map((option) => (
        <Tab key={option.value} label={option.label} value={option.value} />
      ))}
    </TabGroup>
  );
};

export default Tabs;
