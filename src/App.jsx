import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MythologyMap from './MythologyMap';
import CharacterPage from './CharacterPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MythologyMap />,
  },
  {
    path: '/character/:characterId',
    element: <CharacterPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;