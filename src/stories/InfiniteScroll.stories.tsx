import { useEffect, useState } from 'react';
import { Story } from '@storybook/react';

import InfiniteScroll, {
  IInfiniteScrollProps,
  InternalInfiniteScroll,
} from '@/components/InfiniteScroll';
import ListItem from '@/components/InfiniteScroll/ListItem';

export default {
  title: '數據展示元件/InfiniteScroll',
  component: InternalInfiniteScroll,
};

const defaultSideEffect = {
  isLoading: false,
  isLoaded: false,
  error: undefined,
};

type ListData = {
  author: string;
  download_url: string;
  height: number;
  id: string;
  url: string;
  width: number;
};

const Template: Story<IInfiniteScrollProps> = () => {
  // https://picsum.photos/
  const [dataSource, setDataSource] = useState<ListData[]>([]);
  const [page, setPage] = useState(1);
  const [sideEffect, setSideEffect] = useState(defaultSideEffect);
  const { isLoading } = sideEffect;
  const limit = 10;

  useEffect(() => {
    setSideEffect({
      ...defaultSideEffect,
      isLoading: true,
    });
    fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`, {})
      .then((response) => {
        setSideEffect({
          ...defaultSideEffect,
          isLoaded: true,
        });
        return response.json();
      })
      .then((jsonData) => {
        setDataSource((prev) => [...prev, ...jsonData]);
      })
      .catch((error) => {
        setSideEffect({
          ...defaultSideEffect,
          error,
        });
      });
  }, [page]);

  return (
    <div style={{ height: 500 }}>
      <InfiniteScroll
        height={250}
        isLoading={isLoading}
        onScrollBottom={() => {
          if (!isLoading) {
            setPage((prev) => prev + 1);
          }
        }}
      >
        {dataSource.map(({ id, author }) => (
          <ListItem key={id} author={author} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};
