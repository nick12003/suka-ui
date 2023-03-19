import { Story } from '@storybook/react';

import Carousel, { ICarouselProps, InternalCarousel } from '@/components/Carousel';

import birdImg from './assets/bird.jpeg';
import duckImg from './assets/duck.jpeg';
import eagleImg from './assets/eagle.jpeg';
import frogImg from './assets/frog.jpeg';

import { disableArgs } from './utilityStory';

export default {
  title: '數據展示元件/Carousel',
  component: InternalCarousel,
  argTypes: disableArgs(
    {
      hasDots: {
        control: 'boolean',
        defaultValue: true,
      },
      hasControlArrow: {
        control: 'boolean',
        defaultValue: true,
      },
      autoplay: {
        control: 'boolean',
        defaultValue: false,
      },
    },
    [
      {
        args: ['dataSource'],
        type: 'control',
      },
    ]
  ),
};

const TemplateControls: Story<ICarouselProps> = (args) => {
  return <Carousel {...args} />;
};

export const Default = TemplateControls.bind({});
Default.args = {
  dataSource: [birdImg, duckImg, eagleImg, frogImg],
};
