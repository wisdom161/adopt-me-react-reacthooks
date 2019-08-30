import { createContext } from 'react';

const ThemeContext = createContext(["green", () => {}]); // this is what a hook looks like a state and an updater -- the empty function is a placeholder

export default ThemeContext;