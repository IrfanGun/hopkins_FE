import RegisterPageContent from './RegisterPage';

type PageProps = {
  params: {
    token: string;
  };
};

export default function RegisterPage({ params }: PageProps) {
  const { token } = params;

  return (
    <RegisterPageContent token={token} />
  );
}
