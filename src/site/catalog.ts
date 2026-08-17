import type { StyleId } from "@/skin/types";

export type StudioOffer = {
  no: string;
  title: string;
  text: string;
};

export type StudioFamily = {
  id: StyleId;
  trade: string;
  tradeEn: string;
  names: [string, string, string];
  line: string;
  about: string;
  hours: string;
  place: string;
  cta: string;
  offers: [StudioOffer, StudioOffer, StudioOffer];
};

export const STUDIO_OPTIONS: { id: StyleId; name: string }[] = [
  { id: "night-jade", name: "茶室" },
  { id: "clay-candy", name: "烘焙工作室" },
  { id: "obsidian-gold", name: "珠宝定制" },
  { id: "cyber-neon", name: "创意公司" },
  { id: "ink-wash", name: "文化出版" },
  { id: "sea-salt", name: "餐厅" },
  { id: "sakura-wa", name: "花艺空间" },
  { id: "magma", name: "器物工坊" },
  { id: "aurora-snow", name: "旅宿" },
  { id: "dunhuang", name: "文化展览" },
];

export const STUDIOS: Record<StyleId, StudioFamily> = {
  "night-jade": {
    id: "night-jade",
    trade: "茶室",
    tradeEn: "Tea House",
    names: ["青瓦", "夜园", "庭露"],
    line: "一夜只煮三道。",
    about:
      "院子在巷尽头。灯只开一盏，水开三次，才给客人第一杯。我们不做菜单上的表演，只把季节里那一片叶子，安静地交给你。",
    hours: "周四至周日 · 17:00–22:00",
    place: "预约到访 · 每席六人",
    cta: "预约晚席",
    offers: [
      { no: "01", title: "晚席", text: "三道时令，配一碟时果。不设酒单。" },
      { no: "02", title: "私席", text: "两人或四人，可指定年份与器。" },
      { no: "03", title: "叶", text: "当季少量，只在店内取。" },
    ],
  },
  "clay-candy": {
    id: "clay-candy",
    trade: "烘焙",
    tradeEn: "Patisserie",
    names: ["糖霜", "软灶", "麦芽"],
    line: "今天只出一炉。",
    about:
      "面团过夜，黄油称到克。我们不做橱窗里的热闹，只做你第二天还想再来的那一口。每天数量写在门口的纸上。",
    hours: "周三至周日 · 10:00–17:00",
    place: "售罄即止 · 可隔夜预订",
    cta: "预订今日",
    offers: [
      { no: "01", title: "当日", text: "酸种、黄油卷、一款蛋糕。" },
      { no: "02", title: "整只", text: "提前两日，生日或宴席。" },
      { no: "03", title: "课", text: "四人小班，学一款带回家。" },
    ],
  },
  "obsidian-gold": {
    id: "obsidian-gold",
    trade: "珠宝",
    tradeEn: "Atelier",
    names: ["夜藏", "金鳞", "静室"],
    line: "只此一件。",
    about:
      "石料先看，再谈金属。我们不接急单，也不做现货柜。每件从蜡到镶，都在同一张台上完成，留下名字与日期。",
    hours: "预约制 · 周二至周六",
    place: "看石需提前三日",
    cta: "预约看石",
    offers: [
      { no: "01", title: "订婚", text: "主石自选，戒臂按手改。" },
      { no: "02", title: "重镶", text: "旧石新托，保留原来的痕迹。" },
      { no: "03", title: "小件", text: "耳钉、领针，适合第一次。" },
    ],
  },
  "cyber-neon": {
    id: "cyber-neon",
    trade: "创意公司",
    tradeEn: "Studio",
    names: ["夜航", "频段", "信号"],
    line: "先把问题写清楚。",
    about:
      "我们接品牌、产品与空间的视觉系统。不比谁更快交差，比谁在三个月后还站得住。合作从一页简报开始。",
    hours: "工作日 · 11:00–19:00",
    place: "远程或到访 · 项目制",
    cta: "发送简报",
    offers: [
      { no: "01", title: "识别", text: "名称、字体、色，一套能用三年。" },
      { no: "02", title: "站点", text: "一页或数页，按你的节奏上线。" },
      { no: "03", title: "发布", text: "新品当天的画面与文案。" },
    ],
  },
  "ink-wash": {
    id: "ink-wash",
    trade: "出版",
    tradeEn: "Press",
    names: ["一墨", "远山", "纸末"],
    line: "一年四册，不多印。",
    about:
      "我们做纸上的东西：杂志、小书、展览图录。编辑在前，设计在后。每册有编号，售完不再加印。",
    hours: "线上随时 · 展销另告",
    place: "订阅与单册",
    cta: "订阅下一册",
    offers: [
      { no: "01", title: "季刊", text: "春夏秋冬各一，寄到府上。" },
      { no: "02", title: "图录", text: "为展览做一本拿得走的记录。" },
      { no: "03", title: "定制", text: "机构年刊、品牌小书。" },
    ],
  },
  "sea-salt": {
    id: "sea-salt",
    trade: "餐厅",
    tradeEn: "Kitchen",
    names: ["潮隙", "盐风", "晚渔"],
    line: "菜单随船改。",
    about:
      "靠海，不靠套路。早上看货，中午写板，晚上开炉。座位不多，所以请把时间留给吃饭这件事本身。",
    hours: "周三至周日 · 18:00–22:00",
    place: "两轮 · 请准时入席",
    cta: "订今晚的位",
    offers: [
      { no: "01", title: "晚市", text: "五道或七道，看当日海货。" },
      { no: "02", title: "长桌", text: "八人以上，提前五日。" },
      { no: "03", title: "外带", text: "中午一份，售完即止。" },
    ],
  },
  "sakura-wa": {
    id: "sakura-wa",
    trade: "花艺",
    tradeEn: "Florist",
    names: ["薄红", "花见", "夜枝"],
    line: "花比夜更短。",
    about:
      "我们按季节进枝，不进塑料感的大色块。空间、婚礼、一束送到门口，都从同一张工作台出去。",
    hours: "周二至周日 · 11:00–19:00",
    place: "店取或同城送达",
    cta: "订一束",
    offers: [
      { no: "01", title: "日常", text: "一束，适合放在桌上三天。" },
      { no: "02", title: "仪式", text: "婚礼与发布，先看场地再选枝。" },
      { no: "03", title: "课", text: "两人，学一款自己带回去。" },
    ],
  },
  magma: {
    id: "magma",
    trade: "器物",
    tradeEn: "Forge",
    names: ["烬", "窑火", "黑曜"],
    line: "还没冷却。",
    about:
      "金属与石。杯子、灯、一小件桌上的东西。每批数量写在墙上，售完等下一窑。不接受隔天就要的急件。",
    hours: "周五至日 · 13:00–18:00",
    place: "工坊自取 · 可寄出",
    cta: "看这一窑",
    offers: [
      { no: "01", title: "杯", text: "手作一组，四只或两只。" },
      { no: "02", title: "灯", text: "铜与石，按房间尺寸改。" },
      { no: "03", title: "订制", text: "先看草图，再开炉。" },
    ],
  },
  "aurora-snow": {
    id: "aurora-snow",
    trade: "旅宿",
    tradeEn: "House",
    names: ["霜", "北境", "未雪"],
    line: "夜里很安静。",
    about:
      "只有几间。窗对着空地，早餐是热的，钥匙在盒子里。我们希望你把手机放下，不是把它拍成内容。",
    hours: "全年 · 15:00 入住",
    place: "两晚起 · 不含团建",
    cta: "查看空房",
    offers: [
      { no: "01", title: "山房", text: "一张床，一扇大窗。" },
      { no: "02", title: "整栋", text: "六人，厨房可用。" },
      { no: "03", title: "长住", text: "一周以上，另议。" },
    ],
  },
  dunhuang: {
    id: "dunhuang",
    trade: "展览",
    tradeEn: "Gallery",
    names: ["石窟", "飞天", "壁上"],
    line: "灯先亮，再看。",
    about:
      "我们做小而完整的展览：矿物色、织物、一件被重新点亮的旧物。图录随展，展完即止。",
    hours: "周三至周日 · 11:00–18:00",
    place: "免费参观 · 讲解需约",
    cta: "看本季展览",
    offers: [
      { no: "01", title: "本季", text: "一件主题，八周。" },
      { no: "02", title: "图录", text: "限量印刷，展厅取。" },
      { no: "03", title: "借展", text: "机构来函，单独谈。" },
    ],
  },
};
