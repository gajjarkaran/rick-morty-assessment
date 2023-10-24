import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import Card from "@/components/Card";
import Pagination from "@/components/Pagination";

const inter = Inter({ subsets: ["latin"] });

export default function Home({
  data,
}: {
  data: { info: { [x: string]: any }; results: Array<{ [x: string]: any }> };
}) {
  const router: any = useRouter();
  const currentPage = parseInt(router?.query?.page) - 1 || 0;
  return (
    <main className={`pb-12 ${inter.className}`}>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Rick And Morty Characters
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data?.results?.map((character: any) => (
            <Card data={character} key={character.id} />
          ))}
        </div>
      </div>

      <Pagination
        pageCount={data?.info?.pages}
        onPageChange={(value: { selected: number }) => {
          return router.push({ query: { page: value.selected + 1 } });
        }}
        initialPage={currentPage}
      />
    </main>
  );
}

export async function getServerSideProps({
  query,
}: {
  query: { page: number };
}) {
  const currentPage = query.page || 1;
  const res = await fetch(
    `https://rickandmortyapi.com/api/character?page=${currentPage}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }
  );
  const data = await res.json();
  return { props: { data } };
}
