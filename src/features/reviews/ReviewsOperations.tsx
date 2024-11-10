import styled from "styled-components";
import { Filter } from "~/components/Filter";
import SortBy from "~/components/SortBy";

const StyledOperations = styled.div`
  display: flex;
  gap: 1.2rem;
`;

export default function ReviewsOperations() {
  return (
    <StyledOperations>
      <Filter
        filterField="filter"
        options={[
          { value: "none", label: "All" },
          { value: "1", label: "1 ⭐" },
          { value: "2", label: "2 ⭐" },
          { value: "3", label: "3 ⭐" },
          { value: "4", label: "4 ⭐" },
          { value: "5", label: "5 ⭐" },
        ]}
      />
      <SortBy
        options={[
          { value: "none", label: "Sort" },
          { value: "rating-hight", label: "Sort by rating (hight first)" },
          { value: "rating-low", label: "Sort by rating (low first)" },
          { value: "latest", label: "Sort by time (newest)" },
          { value: "oldest", label: "Sort by time (oldest)" },
        ]}
      />
    </StyledOperations>
  );
}
