import useSWR from "swr"

interface User {
  name: string
  email: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useUser() {
  const { data, error, isLoading, mutate } = useSWR<{ user: User | null }>(
    "/api/auth/me",
    fetcher
  )

  return {
    user: data?.user ?? null,
    isLoading,
    error,
    mutate,
  }
}
