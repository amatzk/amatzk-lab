import { A } from "@solidjs/router";
import { For } from "solid-js";
import { SiteTitle } from "~/components/SiteTitle";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const TitleHero = () => {
  return (
    <div class="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-[1] before:transform before:-translate-x-1/2">
      <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
        <div class="mt-5 max-w-2xl text-center mx-auto">
          <h1 class="block font-bold text-gray-800 text-3xl md:text-4xl lg:text-5xl font-serif">
            <span class="bg-clip-text bg-gradient-to-tl from-red-600 to-amber-600 text-transparent mr-2">
              Amatzk
            </span>
            <span>Lab</span>
          </h1>
        </div>

        <div class="mt-5 max-w-3xl text-center mx-auto">
          <p class="text-xs md:text-sm text-gray-600">作成したもの置き場</p>
        </div>
      </div>
    </div>
  );
};

type CardItem = {
  href: string;
  title: string;
  description: string;
  content: string;
};

const StockMarketCardItems: CardItem[] = [
  {
    href: "/stock-market-simulator-v1",
    title: "株式市場シミュレーター",
    description: "Stock Market Simulator",
    content: [
      "株価の変動をシミュレーションするツール。　",
      "非ゼロサムであることを確認するために作成。",
      "資本の流出および流入は無し、配当金も無し。",
      "取引手数料もなし。各参加者は初期資本と株式を持つ。",
    ].join(""),
  },
];

const DisplayCards = (props: { cardItems: CardItem[] }) => {
  return (
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <For each={props.cardItems}>
        {(item) => (
          <A
            href={item.href}
            class="h-full">
            <Card class="h-full flex flex-col">
              <CardHeader>
                <CardTitle class="font-serif text-xl">{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent class="flex-grow">
                <p>{item.content}</p>
              </CardContent>
            </Card>
          </A>
        )}
      </For>
    </div>
  );
};

const Home = () => {
  return (
    <>
      <SiteTitle />
      <main class="mx-auto max-w-screen-xl">
        <TitleHero />
        <div class="mt-12">
          <h2 class="flex flex-wrap gap-1 items-baseline text-2xl font-serif my-4 border-l-4 border-s-rose-700 px-2 py-1">
            <span class="font-medium">株式市場</span>
          </h2>
          <DisplayCards cardItems={StockMarketCardItems} />
        </div>
      </main>
    </>
  );
};

export default Home;
