import { useRoutes } from 'react-router-dom';

import AuthRoutes from './AuthRoutes';

export default function Routes() {
  return useRoutes([AuthRoutes]);
}
