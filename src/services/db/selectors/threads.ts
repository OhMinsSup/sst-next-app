'server-only';

import { Prisma } from '@prisma/client';

import type {
  Tag,
  Thread,
  ThreadBookmark,
  ThreadLike,
  ThreadRepost,
} from '@prisma/client';
import type { UserSelectSchema } from '~/services/db/selectors/users';

import { getTagsSimpleSelector } from '~/services/db/selectors/tags';
import {
  getUserSelector,
  getUserSimpleSelector,
} from '~/services/db/selectors/users';
import { type ThreadListQuerySchema } from '~/services/threads/threads.query';

export const getStatsSelector = () =>
  Prisma.validator<Prisma.ThreadStatsSelect>()({
    id: true,
    threadId: true,
    likes: true,
    reposts: true,
    score: true,
  });

export const getRecommendationsWithThreadSelector = (
  userId?: string,
  _?: ThreadListQuerySchema,
) =>
  Prisma.validator<Prisma.ThreadSelect>()({
    id: true,
    text: true,
    level: true,
    createdAt: true,
    whoCanLeaveComments: true,
    hiddenNumberOfLikesAndComments: true,
    deleted: true,
    user: {
      select: getUserSelector(),
    },
    mentions: {
      select: getThreadsMentionsSelector(),
    },
    tags: {
      select: getThreadsTagsSelector(),
    },
    stats: {
      select: getStatsSelector(),
    },
    reposts: userId ? { where: { userId } } : false,
    likes: userId ? { where: { userId } } : false,
    bookmarks: userId ? { where: { userId } } : false,
    _count: {
      select: {
        likes: true,
        reposts: true,
      },
    },
  });

export const getThreadsMentionsSelector = () =>
  Prisma.validator<Prisma.ThreadMentionSelect>()({
    user: {
      select: getUserSimpleSelector(),
    },
  });

export const getThreadsTagsSelector = () =>
  Prisma.validator<Prisma.ThreadTagSelect>()({
    tag: {
      select: getTagsSimpleSelector(),
    },
  });

export const getSimpleThreadsSelector = () =>
  Prisma.validator<Prisma.ThreadSelect>()({
    id: true,
    text: true,
    createdAt: true,
    deleted: true,
    user: {
      select: getUserSimpleSelector(),
    },
    _count: {
      select: {
        likes: true,
        reposts: true,
      },
    },
  });

export const getThreadsSelector = (
  userId?: string,
  _?: ThreadListQuerySchema,
) =>
  Prisma.validator<Prisma.ThreadSelect>()({
    id: true,
    text: true,
    level: true,
    jsonString: true,
    createdAt: true,
    whoCanLeaveComments: true,
    hiddenNumberOfLikesAndComments: true,
    deleted: true,
    user: {
      select: getUserSelector(),
    },
    mentions: {
      select: getThreadsMentionsSelector(),
    },
    tags: {
      select: getThreadsTagsSelector(),
    },
    reposts: userId ? { where: { userId } } : false,
    likes: userId ? { where: { userId } } : false,
    bookmarks: userId ? { where: { userId } } : false,
    _count: {
      select: {
        likes: true,
        reposts: true,
      },
    },
  });

export type ThreadSelectSchema = Pick<
  Thread,
  | 'id'
  | 'text'
  | 'level'
  | 'createdAt'
  | 'deleted'
  | 'hiddenNumberOfLikesAndComments'
  | 'whoCanLeaveComments'
> & {
  user: UserSelectSchema;
  mentions: { user: Pick<UserSelectSchema, 'id' | 'username'> }[];
  tags: { tag: Pick<Tag, 'name' | 'id'> }[];
  _count: {
    likes: number;
    reposts: number;
  };
  reposts: ThreadRepost[];
  likes: ThreadLike[];
  bookmarks: ThreadBookmark[];
};
