import { Container, UserProfile, UserName } from './styles'

export default function UserCard({userProfile, userName}: any) {
  return (
    <Container>
        <UserProfile src={userProfile} alt="User profile" />
        <UserName>{userName}</UserName>
    </Container>
  )
}
