import { createRoot } from 'react-dom/client';

import {
  createHashRouter,
  createBrowserRouter,
  RouterProvider,
  useRouteLoaderData,
  Link,
} from 'react-router-dom';

function M() {
  let loaderData = useRouteLoaderData() || {};

  console.log('abc');

  return (
    <>
      <Link to="/abc">abc</Link>
      <br />
      <Link to="/def">def</Link>
    </>
  );
}

function N() {
  let loaderData = useRouteLoaderData() || {};

  console.log('def');

  return (
    <>
      <Link to="/abc">abc</Link>
      <br />
      <Link to="/def">def</Link>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: '/abc',
    element: <M />,
    loader: async function () {
      return {};
    },
  },
  {
    path: '/def',
    element: <N />,
    loader: async function () {
      return {};
    },
  },
]);

/**
 * 开始正式渲染页面，挂载到root节点
 */
createRoot(document.getElementById('root')).render(<RouterProvider router={router} />);
