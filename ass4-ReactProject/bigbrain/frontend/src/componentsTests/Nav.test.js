import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Descriptions } from 'antd';

import App from '../App';
import Nav from '../components/Nav';

describe('Nav bar test', () => {
  it('should render login button and dashboard button on the screen', () => {
    render(<App/>);
    const button = screen.getByRole('Button');
    expect(button).toBeInTheDocument();
  })
})
