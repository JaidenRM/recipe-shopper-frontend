import { NavMenu } from "./components/menus/NavMenu"

export const App = () => {
  return (
    <div className="App">
      <NavMenu menuItems={[
        { displayName: "Google", relativePath: "google" },
        { displayName: "Reddit", relativePath: "reddit" }
      ]} />
      <h1>Hello World!</h1>
    </div>
  );
}
