import React from 'react';
import { api } from '~/services/trpc/server';
import ThreadsInput from '~/components/write/threads-input';
import FloatingLink from '~/components/main/floating-link';
import MainTabs from '~/components/main/main-tabs';

interface Props {
  children: React.ReactNode;
}

export default async function Layout({ children }: Props) {
  const session = await api.auth.getRequireSession();
  return (
    <>
      <MainTabs>
        <ThreadsInput session={session} />
        {children}
      </MainTabs>
      <FloatingLink />
    </>
  );
}
