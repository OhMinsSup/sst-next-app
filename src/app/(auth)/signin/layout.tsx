import Link from 'next/link';
import React from 'react';
import { Icons } from '~/components/icons';
import { buttonVariants } from '~/components/ui/button';
import { PAGE_ENDPOINTS } from '~/constants/constants';
import { auth } from '~/services/auth';
import { cn } from '~/utils/utils';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href={PAGE_ENDPOINTS.ROOT}
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute left-4 top-4 md:left-8 md:top-8',
        )}
      >
        <>
          <Icons.chevronLeft className="mr-2 size-4" />
          뒤로가기
        </>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.threads className="mx-auto size-8" />
        </div>
        {children}
        <p className={cn('px-8 text-center text-sm text-muted-foreground')}>
          <Link
            href={PAGE_ENDPOINTS.AUTH.SIGNUP}
            className={cn('hover:text-brand underline underline-offset-4')}
          >
            아직 계정이 없으신가요? 회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
