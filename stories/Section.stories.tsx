import { ComponentMeta } from '@storybook/react';
import Section from '../components/ResumeEditor/Section/Experience';

export default {
  title: 'Section',
  component: Section,
} as ComponentMeta<typeof Section>;

export const Primary = () => <Section />;

// const Template: ComponentStory<typeof Section> = (args) => <Section {...args} />;

// export const LoggedIn = Template.bind({});
// LoggedIn.args = {
//   user: {
//     name: 'Jane Doe',
//   },
// };

// export const LoggedOut = Template.bind({});
// LoggedOut.args = {};
