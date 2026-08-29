import { CategorySwitch } from "@/components/home/CategorySwitch";
import { HomeErrorBoundary } from "@/components/home/HomeErrorBoundary";
import { parseCategoryParam } from "@/data/servicesData";
import type { DivisionId } from "@/config/brandsData";

function firstParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0];
  return value;
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[]; division?: string | string[] }>;
}) {
  const sp = await searchParams;
  const initialBrandId: DivisionId =
    parseCategoryParam(firstParam(sp.category) ?? firstParam(sp.division)) ?? "elevators";

  return (
    <HomeErrorBoundary>
      <CategorySwitch initialBrandId={initialBrandId} />
    </HomeErrorBoundary>
  );
}
