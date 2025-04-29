import { Clock, UserCheck } from "lucide-react";

export default function MainContent() {
  return (
    <main className="container mx-auto p-4">
      <div className="flex max-w-xl flex-col space-y-6">
        {/* Card 1 */}
        <div className="flex h-48 w-full flex-col items-center justify-center rounded-xl bg-white p-6 shadow-lg shadow-black/30">
          <div className="mb-3 rounded-full bg-green-100 p-4">
            <UserCheck className="h-12 w-12 text-green-600" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-500">
              Hopkins Loyalty
            </h3>
            <p className="mt-1 text-xl font-semibold text-gray-800">
              Active (x 1)
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex h-48 w-full flex-col items-center justify-center rounded-xl bg-white p-6 shadow-lg shadow-black/30">
          <div className="mb-3 rounded-full bg-yellow-100 p-4">
            <Clock className="h-10 w-10 text-yellow-600" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-500">
              Once off Package Access
            </h3>
            <p className="mt-1 text-xl font-semibold text-gray-800">810 Days</p>
          </div>
        </div>
      </div>
    </main>
  );
}
