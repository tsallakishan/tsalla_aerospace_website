import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="min-h-screen bg-white font-clash">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left side - Image */}
        <div className="relative">
          <Image
            src="/images/design-mode/istock-drone-image-e1462996105863.jpg"
            alt="Drone flying over vineyard landscape"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right side - Content */}
        <div className="flex items-center justify-center p-8 lg:p-16">
          <div className="max-w-lg space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-medium leading-tight text-black" style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}>
                The Heart Of Our Flight
              </h1>

              <p className="text-lg md:text-xl font-light leading-relaxed text-neutral-600">
                Designing Intelligent Aerial Systems That Aid Humanity During Crises And Reinforce Defense With
                Unmatched Precision And Power.
              </p>
            </div>

           <Button
  variant="outline"
  size="lg"
  className="px-8 py-3 text-base font-medium border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors duration-200 bg-transparent rounded-none"
>
  Learn More
</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
