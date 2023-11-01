'server-only';
import { db } from '~/server/db/prisma';
import { isString } from '~/utils/assertion';
import { THREADS_SELECT } from '~/services/threads/threads.selector';
import type { ThreadQuery } from '~/services/threads/threads.query';

export class ThreadService {
  getItems(query: ThreadQuery) {
    return this._getItemsByCursor(query);
  }

  getDefaultItems<Data = any>() {
    return {
      totalCount: 0,
      list: [] as Data[],
      endCursor: null,
      hasNextPage: false,
    };
  }

  private async _getItemsByCursor({
    cursor,
    limit,
    userId,
    hasParent = false,
    deleted = false,
  }: ThreadQuery) {
    if (isString(cursor)) {
      cursor = cursor;
    }

    if (isString(limit)) {
      limit = Number(limit);
    } else {
      limit = limit ?? 25;
    }

    const [totalCount, list] = await Promise.all([
      db.thread.count({
        where: {
          deleted,
          ...(userId && {
            userId,
          }),
          ...(hasParent && {
            parentId: {
              not: null,
            },
          }),
        },
      }),
      db.thread.findMany({
        orderBy: [
          {
            id: 'desc',
          },
        ],
        where: {
          id: cursor
            ? {
                lt: cursor,
              }
            : undefined,
          ...(userId && {
            userId,
          }),
          ...(hasParent && {
            parentId: {
              not: null,
            },
          }),
          deleted,
        },
        take: limit,
        select: THREADS_SELECT,
      }),
    ]);

    const endCursor = list.at(-1)?.id ?? null;
    const hasNextPage = endCursor
      ? (await db.thread.count({
          where: {
            id: {
              lt: endCursor,
            },
            deleted,
            ...(userId && {
              userId,
            }),
            ...(hasParent && {
              parentId: {
                not: null,
              },
            }),
          },
          orderBy: [
            {
              id: 'desc',
            },
          ],
        })) > 0
      : false;

    return {
      totalCount,
      list,
      endCursor,
      hasNextPage,
    };
  }
}

export const threadService = new ThreadService();