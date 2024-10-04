import SignUp from "./Components/Authentication/SignUp";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App ()
{
  const theme = useSelector ( ( state ) => state.theme.theme );

  useEffect (
    () => {
      console.log ( "Current theme:", theme ); // Log current theme
      document.body.className = theme; // Apply theme to body class
    }, [ theme ]
);

  return (
    <div className = { `app ${ theme }` } >
      <SignUp/>
    </div>
  );
}

export default App;