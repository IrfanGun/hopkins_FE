import { ChangeEvent, FormEvent } from "react";

interface ChangeEmailFormProps {
  email: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
  onCancel: () => void;
}

export default function ChangeEmailForm({
  email,
  onChange,
  onSubmit,
  onCancel,
}: ChangeEmailFormProps) {
  return (
    <div className="p-6">
      <form onSubmit={onSubmit}>
        <div className="space-y-4">
          {/* Header / Warning */}
          <div className="rounded-md border border-pink-500 bg-pink-100 p-4">
            <p className="text-sm font-semibold text-pink-600">
              Changing email is a potential danger operation. Follow our
              instructions to prevent any problems:
            </p>
            <ul className="mt-2 list-inside list-disc text-sm text-gray-700">
              <li>
                Specify the new email below and we will send you a verification
                link.
              </li>
              <li>
                Follow the verification link to complete changing email. You
                cannot use a new email before finishing the verification
                process.
              </li>
              <li>
                Use your new email for the signing-in process when verification
                is successfully finished.
              </li>
            </ul>
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              New email: <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              required
              className="w-full rounded-md border border-gray-300 p-2"
            />
          </div>
        </div>

        {/* Form Footer */}
        <div className="mt-6 flex justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md bg-red-500 px-6 py-2 font-medium text-white transition hover:bg-red-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-gray-100 px-6 py-2 font-medium text-gray-800 transition hover:bg-gray-200"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
