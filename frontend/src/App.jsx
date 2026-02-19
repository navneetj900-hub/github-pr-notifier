function App() {
  const login = () => {
    window.location.href = "http://localhost:4000/auth/github";
  };

  const getRepos = async () => {
    const res = await fetch("http://localhost:4000/api/repos", {
      credentials: "include"
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div style={{padding:40}}>
      <h1>GitHub PR Notifier</h1>
      <button onClick={login}>Login with GitHub</button>
      <button onClick={getRepos}>Get Repositories</button>
    </div>
  );
}

export default App;
