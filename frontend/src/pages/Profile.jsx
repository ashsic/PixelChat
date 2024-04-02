import ProfileRow from "../components/ProfileRow";


export default function Profile() {
  const props = {
    username: "testusername",
    firstname: "test",
    lastname: "name",
    bio: "test bio",
    posts: [1,2,3,4,5,6,7,8],
    followers: 23,
    following: 43
  }

  return (
    <main className="max-w-5xl flex-1 p-4">
      <section>
        <div className="flex mt-10 mb-10">
          <div className="flex flex-auto justify-center">
            <img className="flex-none min-w-10 w-40 h-40" src="../public/Default_pfp.svg.png" alt="default profile pic" />
          </div>
          <div className="flex flex-col justify-center flex-auto">
            <div className="flex items-center mb-3">
              <h3 className="text-lg mr-4">{props.username}</h3>
              <button className="border pl-4 pr-4 rounded-md h-8 mr-4">Edit profile</button>
              <i className="material-icons">settings</i>
            </div>
            <div className="mb-2">
              <span className="mr-4">{props.posts.length + " posts"}</span>
              <span className="mr-4">{props.followers + " followers"}</span>
              <span className="mr-4">{props.following + " following"}</span>
            </div>
            <div className="text-sm">
              <h5 className="font-medium">{props.firstname + " " + props.lastname}</h5>
              <p>{props.bio}</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <ProfileRow posts={props.posts} />
        {/* {props.posts.map((post) => {
          return (
            <div className="flex flex-auto justify-center border">
              <img className="flex-none min-w-10 w-40 h-40" src="../public/Default_pfp.svg.png"></img>
            </div>
          );
        })} */}
      </section>
    </main>
  );
};
