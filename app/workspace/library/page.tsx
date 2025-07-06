import { getUser } from "services/user.service";

export default async function LibraryPage() {
  const { data: user } = await getUser();
  return (
    <>
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <h1 className="text-2xl font-bold">Library</h1>
          <p className="text-muted-foreground">
            This is the library page. You can add your library content here.
          </p>
        </div>
      </div>
    </>
  );
}
