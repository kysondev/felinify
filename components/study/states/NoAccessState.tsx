import { Button } from "components/ui/Button";
import { useRouter } from "next/navigation";

const NoAccessState = () => {
  const router = useRouter();
  return (
    <div className="container max-w-3xl mx-auto py-8 px-4 mt-16">
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h2 className="text-2xl font-semibold mb-2">Access Denied</h2>
        <p className="text-muted-foreground mb-6">
          You do not have permission to view this page.
        </p>
        <Button onClick={() => router.push("/workspace/library")}>
          Return to Library
        </Button>
      </div>
    </div>
  );
};
export default NoAccessState;
