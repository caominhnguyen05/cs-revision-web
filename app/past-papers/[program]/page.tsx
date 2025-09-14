import PastPapersLayoutPage from "./past-papers-layout";

export default async function Page({
  params,
}: {
  params: { program: "a-level" | "igcse" };
}) {
  const { program } = await params;
  return <PastPapersLayoutPage program={program} />;
}
