/**
 * @see https://github.com/CloudCannon/pagefind/blob/main/pagefind_web_js/types/index.d.ts
 */

type Pagefind = {
  init: () => void
  search: (query: string, options?: PagefindSearchOptions) => Promise<PagefindSearchResults>
  debouncedSearch: (
    query: string,
    options?: PagefindSearchOptions
  ) => Promise<PagefindSearchResults | null>
  filters: () => Promise<PagefindFilterCounts>
}

/** The main results object returned from a call to pagefind.search() */
type PagefindSearchResults = {
  /** All pages that match the search query and filters provided */
  results: PagefindSearchResult[]
}

/** A single result from a search query, before actual data has been loaded */
type PagefindSearchResult = {
  /** Pagefind's internal ID for this page, unique across the site */
  id: string
  /** Pagefind's internal score for your query matching this page, that is used when ranking these results */
  score: number
  /** The locations of all matching words in this page */
  words: number[]
  /**
   * Calling data() loads the final data fragment needed to display this result.
   *
   * Only call this when you need to display the data, rather than all at once.
   * (e.g. one page as a time, or in a scroll listener)
   * */
  data: () => Promise<PagefindSearchFragment>
}

/** A single result from a search query, after actual data has been loaded */
export type PagefindSearchResultWithData = Omit<PagefindSearchResult, "data"> & {
  data: PagefindSearchFragment
}

/** The useful data Pagefind provides for a search result */
type PagefindSearchFragment = {
  /** Pagefind's processed URL for this page. Will include the baseUrl if configured */
  url: string
  /** Pagefind's unprocessed URL for this page */
  raw_url?: string
  /** The full processed content text of this page */
  content: string
  /** The processed excerpt for this result, with matching terms wrapping in `<mark>` elements */
  excerpt: string
  /** The filter keys and values this page was tagged with */
  filters: Record<string, string[]>
  /** The metadata keys and values this page was tagged with */
  meta: PagefindSearchFragmentMeta
}

type PagefindSearchFragmentMeta = { title: string } & Record<string, string>

/** Filter counts returned from pagefind.filters(), and alongside results from pagefind.search() */
type PagefindFilterCounts = Record<string, Record<string, number>>

/** Options that can be passed to pagefind.search() */
type PagefindSearchOptions = {
  /** If set, this call will load all assets but return before searching. Prefer using pagefind.preload() instead */
  preload?: boolean
  /** The set of filters to execute with this search. */
  filters?: Object
  /** The set of sorts to use for this search, instead of relevancy */
  sort?: Object
}

declare global {
  interface Window {
    pagefind?: Pagefind
  }
}
