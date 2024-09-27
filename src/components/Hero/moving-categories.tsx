'use client'

import { cn } from '@/lib/utils'
import React, { Suspense} from 'react'
import { Category } from '@prisma/client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import qs from "query-string"
import { Button } from '@/components/ui/button'

export const InfiniteMovingCardsCategory = ({
  items,
  pauseOnHover = true,
}: {
  items: Category[]
  pauseOnHover?: boolean
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentTitle = searchParams.get("title")

  return (
    <div
      ref={containerRef}
      className={cn(
        'scroller relative z-20  max-w-screen-2xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]',
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          ' flex min-w-full shrink-0 gap-10 py-4 w-max flex-nowrap animate-scroll duration-fast',
          pauseOnHover && 'hover:[animation-play-state:paused]'
        )}
      >
        {items.map((item) => {
          const currentCategoryId = searchParams.get("categoryId");

          const isSelected = currentCategoryId === item.id;

          const onClick = () => {
            const url = qs.stringifyUrl({
              url: pathname,
              query: {
                title: currentTitle,
                categoryId: isSelected ? null : item.id,
              }
            }, { skipNull: true, skipEmptyString: true })
            router.push(url)
          }
          return (
            <Button
              key={item.id}
              onClick={onClick}
              type="button"
              variant="outline"
              className={cn("text-xl bg-none cursor-pointer hover:text-2xl transition-all ease-in font-semibold",
                isSelected && " border-emerald-400 bg-emerald-400/20 text-emerald-400 hover:text-emerald-500 hover:bg-emerald-400/25 "

              )}
            >
              <div className=" truncate">
                {item.name}
              </div>
            </Button>
          )
        })}
      </ul>
    </div>
  )
}

export function InfiniteMovingCardsWrapperForCategory(props: { items: Category[], pauseOnHover?: boolean }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InfiniteMovingCardsCategory {...props} />
    </Suspense>
  );
}