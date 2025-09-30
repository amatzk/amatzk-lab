import { A } from "@solidjs/router";

const NotFound = () => {
  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl font-thin uppercase my-16 text-info-foreground">
        404 Not Found
      </h1>
      <div class="mt-8">
        <p>お探しのページが見つかりません。</p>
        <p>一時的にアクセスできない状況にあるか、</p>
        <p>移動もしくは削除された可能性があります。</p>
      </div>
      <p class="my-4">
        <A
          href="/"
          class="text-info-foreground hover:underline">
          Home
        </A>
        {" - "}
        <A
          href="/about"
          class="text-info-foreground hover:underline">
          About Page
        </A>
      </p>
    </main>
  );
};

export default NotFound;
