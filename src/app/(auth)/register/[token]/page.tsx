type PageProps = {
  params: {
    token: string;
  };
};

export default function RegisterPage({ params }: PageProps) {
  const { token } = params;

  return (
    <div>
      Token dari URL: {token}
    </div>
  );
}
