import { Inter } from "next/font/google";
import Card from "@/components/Card";
import Pagination from "@/components/Pagination";
import React, { useEffect, useState } from "react";
import AppBarContainer from "@/components/AppBarContainer";

const inter = Inter({ subsets: ["latin"] });

export default function Home({
  data,
}: {
  data: {
    episodes: {
      info: { [x: string]: any };
      results: Array<{ [x: string]: any }>;
    };
  };
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState<any>(null);
  const [characters, setCharacters] = useState<{ [x: string]: any }>({
    results: [],
    info: {},
  });

  const fetchCharactersByPage = async (pageNumber: number = 1) => {
    const res = await fetch(
      `https://rickandmortyapi.com/api/character?page=${pageNumber}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const response = await res.json();
    setCharacters(response);
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    (async () => {
      if (selectedEpisode && selectedEpisode?.characters) {
        const results = await Promise.all(
          selectedEpisode?.characters?.map((characterAPIUrl: any) => {
            return new Promise(async (resolve, reject) => {
              try {
                const res = await fetch(characterAPIUrl, {
                  method: "GET",
                  headers: {
                    "content-type": "application/json",
                  },
                });
                const result = await res.json();
                resolve(result);
              } catch (e) {
                console.log("Character Fetch Error");
                reject(e);
              }
            });
          })
        );
        setCurrentPage(1);
        setCharacters({ results: results, info: {} });
      } else {
        fetchCharactersByPage(1);
      }
    })();
  }, [selectedEpisode]);

  return (
    <main className={` ${inter.className}`}>
      <AppBarContainer
        data={data?.episodes?.results}
        onSelect={(item: { [x: string]: any }) => setSelectedEpisode(item)}
        selectedId={selectedEpisode && selectedEpisode.id}
      >
        <div className="mx-auto max-w-2xl lg:max-w-7xl pb-12">
          <h1 className="text-3xl mb-6 font-semibold">
            Rick and Morty Characters
          </h1>
          {selectedEpisode && (
            <h1 className="text-2xl font-semibold">
              {selectedEpisode?.characters?.length} characters in this episode
            </h1>
          )}
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {characters?.results?.map((character: any) => (
              <Card data={character} key={character.id} />
            ))}
          </div>
        </div>

        {!selectedEpisode && (
          <Pagination
            pageCount={characters?.info?.pages}
            onPageChange={async (value: { selected: number }) => {
              await fetchCharactersByPage(value.selected + 1);
            }}
            initialPage={currentPage - 1}
          />
        )}
      </AppBarContainer>
    </main>
  );
}

export async function getServerSideProps({
  query,
}: {
  query: { page: number };
}) {
  try {
    const episodeResponse = await fetch(
      `https://rickandmortyapi.com/api/episode`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const episodes = await episodeResponse.json();

    return { props: { data: { episodes } } };
  } catch (e) {
    console.log("Epside: Fetch error");
  }
  return { props: { data: { episodes: [] } } };
}
