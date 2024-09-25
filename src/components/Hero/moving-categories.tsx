'use client'

import { cn } from '@/lib/utils'
import React, { Suspense, useEffect, useState } from 'react'
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
 
  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
 
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });
 
      setStart(true);
    }
  }


  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentTitle = searchParams.get("title")
  return (
    <div
      ref={containerRef}
      className={cn(
        'scroller relative z-20  max-w-screen-2xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          ' flex min-w-full shrink-0 gap-10 py-4 w-max flex-nowrap',
          start && 'animate-scroll ',
          pauseOnHover && 'hover:[animation-play-state:paused]'
        )}
      >
        {items.map((item) => {
          const onClick = () => {
              const url = qs.stringifyUrl({
                url: pathname,
                query: {
                  title: currentTitle,
                  categoryId:item.id,
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