import React from 'react';
import type { Metadata } from 'next';
import SignupForm from '~/components/auth/signup-form';

export const metadata: Metadata = {
  title: 'Create an account',
  description: 'Create an account to get started.',
};

export default function Page() {
  return <SignupForm />;
}
