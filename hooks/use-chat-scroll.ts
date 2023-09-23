import { useEffect, useState } from 'react'

type ChatScrollProps = {
  chatRef: React.RefObject<HTMLDivElement>
  bottomRef: React.RefObject<HTMLDivElement>
  shouldRoadMore: boolean
  loadMore: () => void
  count: number
}

export const useChatScroll = ({
  chatRef,
  bottomRef,
  shouldRoadMore,
  loadMore,
  count,
}: ChatScrollProps) => {
  const [hasInitialized, setHasInitializes] = useState(false)

  useEffect(() => {
    const topDiv = chatRef?.current

    const handleScroll = () => {
      const scrollTop = topDiv?.scrollTop

      if (scrollTop === 0 && shouldRoadMore) {
        loadMore()
      }
    }

    topDiv?.addEventListener('scroll', handleScroll)

    return () => {
      topDiv?.removeEventListener('scroll', handleScroll)
    }
  }, [shouldRoadMore, loadMore, chatRef])

  useEffect(() => {
    const bottomDiv = bottomRef?.current
    const topDiv = chatRef.current

    const shouldAutoScroll = () => {
      if (!hasInitialized && bottomDiv) {
        setHasInitializes(true)
        return true
      }

      if (!topDiv) {
        return false
      }

      const distanceFromBottom =
        topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight

      return distanceFromBottom <= 100
    }

    if (shouldAutoScroll()) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({
          behavior: 'smooth',
        })
      }, 100)
    }
  }, [bottomRef, chatRef, count, hasInitialized])
}
