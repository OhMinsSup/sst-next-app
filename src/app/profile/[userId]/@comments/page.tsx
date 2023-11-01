import React from 'react';
import ThreadList from '~/components/shared/thread-list';
import { threadService } from '~/services/threads/threads.server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import getQueryClient from '~/services/query/get-query-client';
import { QUERIES_KEY } from '~/constants/constants';

interface Props {
  params: {
    userId: string;
  };
}

export default async function Pages({ params }: Props) {
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: QUERIES_KEY.threads.comments(params.userId),
    initialPageParam: null,
    queryFn: async () => {
      return await threadService.getItems({
        limit: 10,
        hasParent: true,
        userId: params.userId,
      });
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ThreadList userId={params.userId} type="comments" />
    </HydrationBoundary>
  );
}