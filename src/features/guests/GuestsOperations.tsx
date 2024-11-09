import styled from "styled-components";
import { Filter } from "~/components/Filter";
import SortBy from "~/components/SortBy";

const StyledOperations = styled.div`
  display: flex;
  gap: 1.2rem;
`;

export default function GuestsOperations() {
  return (
    <StyledOperations>
      <Filter
        filterField="filter"
        options={[
          { value: "none", label: "All" },
          { value: "verifyEmail-true", label: "Verified Email" },
          { value: "verifyEmail-false", label: "Unverified Email" },
          { value: "enable2FA-true", label: "Enabled 2FA" },
          { value: "enable2FA-false", label: "Disabled 2FA" },
        ]}
      />
      <SortBy
        options={[
          { value: "none", label: "Sort" },
          { value: "name-high", label: "Sort by name (A-Z)" },
          { value: "name-low", label: "Sort by name (Z-A)" },
          { value: "latest", label: "Sort by time (newest)" },
          { value: "oldest", label: "Sort by time (oldest)" },
        ]}
      />
    </StyledOperations>
  );
}
