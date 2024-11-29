import styled from "styled-components";
import { useUser } from "./useUser";

const StyledUserBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  span {
    font-weight: 500;
  }
`;

const Avatar = styled.img`
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 100%;
`;

export default function UserBox() {
  const { user } = useUser();
  const { avatar, name: fullName } = user || {};
  // const { avatar, fullName } = user?.user_metadata || {};
  console.log('----------', avatar)
  const avatarStr = avatar?.includes('default') ? `/${avatar}` : avatar
  return (
    <StyledUserBox>
      <Avatar src={avatarStr} alt={`Avatar of ${fullName}`} />
      <span>{fullName}</span>
    </StyledUserBox>
  );
}
