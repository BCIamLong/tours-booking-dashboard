import styled from "styled-components";
import { Filter } from "~/components/Filter";
import SortBy from "~/components/SortBy";

const StyledOperations = styled.div`
  display: flex;
  gap: 1.2rem;
`;

export default function PostsOperations() {
  return (
    <StyledOperations>
      <Filter
        filterField="filter"
        options={[
          { value: "none", label: "All" },
          { value: "trending", label: "Trending" },
          { value: "popular", label: "Popular" },
          { value: "most-likes", label: "Most Likes" },

        ]}
      />
      <SortBy
        options={[
          { value: "none", label: "Sort" },
          { value: "shares-hight", label: "Sort by shares (hight first)" },
          { value: "shares-low", label: "Sort by shares (low first)" },
          { value: "likes-high", label: "Sort by likes (high first)" },
          { value: "likes-low", label: "Sort by likes (low first)" },
          { value: "comments-high", label: "Sort by comments (high first)" },
          { value: "comments-low", label: "Sort by comments (low first)" },
          { value: "bookmarks-high", label: "Sort by bookmarks (high first)" },
          { value: "bookmarks-low", label: "Sort by bookmarks (low first)" },
          { value: "latest", label: "Sort by time (newest)" },
          { value: "oldest", label: "Sort by time (oldest)" },
        ]}
      />
    </StyledOperations>
  );
}
