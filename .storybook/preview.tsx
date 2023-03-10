import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Story } from '@storybook/react';
import { theme } from '../src/theme';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story: Story) => (
    <ThemeProvider theme={theme.default}>
      <Story />
    </ThemeProvider>
  ),
];
