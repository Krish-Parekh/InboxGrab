import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';  
import LoginCard from '@/components/login-card';

describe('LoginCard', () => {
    it('should render the login card', () => {
        const { container } = render(<LoginCard />);
        expect(container).toBeInTheDocument();
    });

    it('should render the login card with the correct title', () => {
        render(<LoginCard />);
        expect(screen.getByText('Sign in to Gmail Extractor')).toBeInTheDocument();
    });

    it('should render the login card with the correct description', () => {
        render(<LoginCard />);
        expect(screen.getByText('Connect your Google account to access your Gmail attachments')).toBeInTheDocument();
    });

    it('should render the login card with the correct button', () => {
        render(<LoginCard />);
        expect(screen.getByRole('button', { name: 'Sign in with Google' })).toBeInTheDocument();
    });
})

