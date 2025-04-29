export default function FooterAuth() {
  return (
    <div className="login__question mt-8 text-center text-sm text-gray-600">
      If you have any questions, contact us at{" "}
      <a
        className="login__email text-orange-500"
        href="mailto:support@hopkins.com"
      >
        support@hopkins.com
      </a>{" "}
      or call at{" "}
      <a className="login__phone text-orange-500" href="tel:+61 1300 683 688">
        +61 1300 683 688
      </a>
    </div>
  );
}
