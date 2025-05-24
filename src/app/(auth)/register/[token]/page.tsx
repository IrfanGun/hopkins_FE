import RegisterPage from './RegisterPage';

export default function Page({ params }: { params: { token: string } }) {
  return <RegisterPage token={params.token} />;
}
