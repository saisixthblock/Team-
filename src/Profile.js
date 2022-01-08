import React, { useState } from "react";
import Propc from "./Propc";
const Profile = () => {
  const [count, setCount] = useState(5);
  const [name, setName] = useState("sixth");
  return (
    <div>
      <h1>count:{count}</h1>
      <p>sucessfully counted{name}</p>

      <button onClick={() => setCount(count + 5)}>click me</button>
      <Propc counts={count} />
    </div>
  );
};

export default Profile;
