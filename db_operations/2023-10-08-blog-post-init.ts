import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const datas = [
    {
      slug: 'tsukurimashita',
      created_at: '2021-05-04T04:30:44.335Z',
      updated_at: '2021-06-30T05:09:27.336Z',
      published_at: '2021-05-04T04:30:44.335Z',
      title: 'サイトを作りました。',
      content:
        'ポートフォリオが欲しいと思いつつもずっとROM専していたのですが、ようやく作ってみました。  \n（学生の頃に作ったことがあったのですが、当時Gitとかの使い方が何もわからなかったのと、謎のフリードメインで作っていたこととか前のパソコンが死んだこともあり自然消滅してしまいました。。🗿）  \n\n技術系の記事はZennに書いたほうが見てもらえそうなので向こうで書いて、こっちのブログにはどうでも良いようなこととか日常的なことを載せていこうかなーと考えています。  \n（あんまり更新しなそう）  \n\nとりあえず今後やってみたいこととして、[Steam Web API](https://partner.steamgames.com/doc/webapi_overview?l=japanese) に興味があるので、これと連携させて趣味のトロコンの記録とかを載せてみたいと思ってます。',
    },
    {
      slug: '202203_design_renewal',
      created_at: '2022-03-26T06:12:25.151Z',
      updated_at: '2022-03-26T15:59:20.832Z',
      published_at: '2022-03-26T06:12:25.151Z',
      title: 'デザインを一新してみました',
      content:
        '転職活動も終わってほぼ見られることの無くなったこのポートフォリオですが、久々に見返したらダサい気がしてきてデザインを一新してみました。\n最近仕事ではtailwindを使っていたので、久々にCSSを手書きしたらやっぱり楽しかったです。ただやっぱりtailwindに慣れたせいで不便さも感じるようになってきてしまった。\n趣味で使う程度ならハイブリットに使ってどっちの良いところも使うぐらいがちょうど良いのかなぁと思い始めてきました。\n\n最近はRailsを1から勉強しています。フロントエンド以外ほぼ全く触ってこなかったド素人なのでかなり苦戦中・・・。\nこのブログはmicroCMSのAPIで作られてるんですが、いずれRailsで自作ヘッドレスCMSとして移行しようかなと考えています。\n↓このスクラップで進行中。Zenn便利すぎる・・・。\nhttps://zenn.dev/attt/scraps/1293067756e442\n\nついでに今更ながら1日1コミットを頑張り始めてみました。\nまだ始めて2週間しか経ってないんですが、今のところは結構楽しいです。\n草を生やすのはゲームの収集物コンプと同じ感じの楽しさがあることに気づいたのでなんとか続けれそうな気がします。\n新しい職場になってから周りについていけてない感じがしているので頑張らなければ・・・。',
    },
    {
      slug: 'o_cjlummeig',
      created_at: '2023-10-07T07:14:38.746Z',
      updated_at: '2023-10-07T07:21:36.984Z',
      published_at: '2023-10-07T07:14:38.746Z',
      title: 'このサイトをNuxt 3に移行しました',
      content:
        'だいぶ今更感はあるのですが、1年ぐらい放置していたNuxt 3移行を今日完了させました。  \nrcのときstaticビルドにできず詰まってしまっていた部分が、いつの間にか時間を置いたことで解決できるようになっててなんとかなりました。\n\n移行メモのscrap:   \n<https://zenn.dev/attt/scraps/2c049348c77ede>\n\n最近業務でもNuxt 3移行をやってます。  \n公式のガイドも充実してきたのでマイグレーション自体はそこまで大変では無くなってきたのですが、とにかくBreaking Changesが多くQAテストが大変。。。  \nReactはその辺が比較的楽という噂を聞くのでちょっとうらやましいです。  \nただVue 3になってから特にscript setupは開発体験が良くて楽しいので人気下がらないでほしいなーと思いました\n\n次はPrisma使ってMicro CMS脱却＆自作の管理画面作れるようにしたいなーとか考えてます。  \nあとこのサイトとは別でReactNext)で構築途中のものがあるのでそれも完成させないと。\n\n色々やりたいことがあるけどモチベも浮き沈みが激しいし時間も足りないし大変だーーという感じでした。終',
    },
  ];

  for (const data of datas) {
    await prisma.blogPost.create({
      data,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
