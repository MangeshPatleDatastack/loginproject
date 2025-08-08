import { Suspense } from 'react';
import LoginPage from './LoginPage';

export default function home() {
  return (
    <Suspense fallback={<></>}>
      <LoginPage />
    </Suspense>
  );
}
