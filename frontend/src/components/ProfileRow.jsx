
export default function ProfileRow(props) {

  for (let i = 0; i < props.posts.length; i++) {

  }

  return (
    <>
      {props.posts.map((post) => {
        return (
          <div>
            <img src="../public/Default_pfp.svg.png" alt="" />
          </div>
        );
      })}
    </>
  );
};
