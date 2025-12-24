import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MythologyMap from './MythologyMap';
import CharacterPage from './CharacterPage';
import GroupPicturePage from './GroupPicturePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MythologyMap />,
  },
  {
    path: '/character/:characterId',
    element: <CharacterPage />,
  },
  {
    path: '/group',
    element: <GroupPicturePage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;