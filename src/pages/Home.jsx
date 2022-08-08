import UserResults from "../components/users/UserResults"
import UserSearch from "../components/users/UserSearch"

function Home () {
  return (
    <>
        {/*Search component */}
        <UserSearch></UserSearch>
        <UserResults></UserResults>
    </>
  )
}

export default Home