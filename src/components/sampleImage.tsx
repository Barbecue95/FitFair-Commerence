import { Image } from "lucide-react";

export function SampleImageDiv() {
  return (
    <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <Image className="h-12 w-12 text-gray-400 mx-auto mb-2" />
        <p className="text-sm text-gray-500">Sample Image</p>
      </div>
    </div>
  );
}
