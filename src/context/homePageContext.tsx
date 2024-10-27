import React, {createContext, type ReactNode, useState} from 'react';

interface HomePageConTextType {
  columns: number;
  setColumns: Function;
}

export const HomePageConText = createContext<HomePageConTextType>({
  columns: 3,
  setColumns: () => {},
});

// 创建Provider组件
export const HomePageProvider = ({children}: {children: ReactNode}) => {
  const [columns, setColumns] = useState(3); // 初始列数

  // 渲染Provider并传递state和setState函数
  return (
    <HomePageConText.Provider
      value={{columns, setColumns}}>
      {children}
    </HomePageConText.Provider>
  );
};

