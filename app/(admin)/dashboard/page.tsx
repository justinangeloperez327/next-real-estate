import { Button } from "@/components/ui/button";

export default async function page() {
  return (
    <>
      <div className="text-2xl mb-4 px-4 py-2 rounded-md shadow-lg">
        Dashboard
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50"></div>
        <div className="aspect-video rounded-xl bg-muted/50"></div>
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
    </>
  );
}
