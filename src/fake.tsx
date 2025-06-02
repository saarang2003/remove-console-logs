import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
}

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  console.log("Component loaded");
  console.info("Initializing user state");

  useEffect(() => {
    console.group("useEffect Hook");
    console.debug("Fetching user data");

    const fetchData = async () => {
      try {
        console.time("Fetch Time");
        const response = await fetch('/api/user');
        const data = await response.json();
        console.timeEnd("Fetch Time");
        console.log("Fetched data:", data);
        setUser(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
    console.groupEnd();
  }, []);

  const handleClick = () => {
    console.assert(user !== null, "User must be defined before clicking");
    alert(`Hello, ${user?.name}`);
    console.count("Button Clicked");
  };

  const unusedFunction = () => {
    console.clear();
    console.warn("This function is not used");
  };

  return (
    
    <div className="app">
      <h1>Welcome</h1>
      {user ? (
        <p onClick={handleClick}>Hi, {user.name}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;

// Below are some test console cases
console.table([{ id: 1 }, { id: 2 }]);
console.dir({ deep: { object: true } });
console.profile("Render Profile");
console.profileEnd("Render Profile");
console.timeStamp("Render Done");
