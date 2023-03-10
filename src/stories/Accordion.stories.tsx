import { Story } from '@storybook/react';
import { useState } from 'react';

import Accordion, { IAccordionProps } from '@/components/Accordion';

export default {
  title: '數據展示元件/Accordion',
  component: Accordion,
};

const Template: Story<IAccordionProps> = (args) => {
  const [isExpand, setIsExpand] = useState(false);

  return (
    <Accordion
      {...args}
      header="header"
      isExpand={isExpand}
      onClick={() => setIsExpand((prev) => !prev)}
    >
      Panel
    </Accordion>
  );
};

export const Default = Template.bind({});
