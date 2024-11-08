import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast'
import styled from "styled-components";
import Spinner from "~/components/Spinner";
import { useUser } from "~/features/auth/useUser";
// import { useUser } from "~/features/authentication/useUser";

const StyledProtectedRoute = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: var(--color-grey-50);
`;

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useUser();
  // console.log(user, isAuthenticated)
  useEffect(
    function () {
      // console.log(isAuthenticated, isLoading);
      if (!isAuthenticated && !isLoading) {

        navigate("/login");
        toast.error(
          "Please login to perform this action"
        );
      }
    },
    [isAuthenticated, isLoading, navigate]
  );

  if (isLoading)
    return (
      <StyledProtectedRoute>
        <Spinner />
      </StyledProtectedRoute>
    );

  if (isAuthenticated) return children;
}
