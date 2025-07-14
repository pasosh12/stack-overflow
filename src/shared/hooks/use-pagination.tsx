import {useMemo} from "react";

export const usePagination = (links?: {
    current?: string,
    last?: string
}) => {
    return useMemo(() => {
        const getPage = (url?: string) => {
            if (!url) return 1
            const match = url.match(/page[=-](\d+)/)
            return match ? parseInt(match[1], 10) : 1
        }
        return {
            currentPage: getPage(links?.current),
            lastPage: getPage(links?.last)
        }
    }, [links])
}