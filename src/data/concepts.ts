import gallery from "./gallery.json";

export type Photo = { src: string; width: number; height: number };

export type Tag = "Tông màu" | "Cổ điển" | "Cùng chồng" | "Cá tính";

export type Concept = {
  slug: string;
  name: string;
  caption: string;
  description: string;
  tags: Tag[];
  photos: Photo[];
};

// Mô tả là bản nháp viết từ ảnh mẫu, studio chỉnh lại cho đúng thực tế.
const drafts: Record<string, Omit<Concept, "slug" | "photos">> = {
  "a-from-girl-a-to-mom": {
    name: "From Girl to Mom",
    caption: "từ cô gái trở thành mẹ",
    description:
      "Tông kem trắng mộc mạc, váy ren và hoa tươi. Một bộ ảnh nhẹ nhàng ghi lại khoảnh khắc mẹ chuyển mình từ cô gái trở thành người mẹ.",
    tags: ["Cổ điển"],
  },
  "true-love-grows": {
    name: "True Love Grows",
    caption: "tình yêu lớn lên mỗi ngày",
    description:
      "Trắng tinh giản, vest và mũ rộng vành mang hơi thở hiện đại. Phù hợp với mẹ thích sự thanh lịch, gọn gàng mà vẫn nổi bật.",
    tags: ["Cá tính"],
  },
  "quy-toc": {
    name: "Quý Tộc",
    caption: "nét vintage châu Âu",
    description:
      "Tông be cổ điển, mũ lông vũ, nến và đồ gốm. Mẹ hoá thân thành quý cô châu Âu sang trọng, dịu dàng.",
    tags: ["Cổ điển"],
  },
  "tone-hong": {
    name: "Tone Hồng",
    caption: "ngọt ngào giữa vườn hoa",
    description:
      "Sắc hồng phấn cùng hoa tươi rực rỡ. Concept ngọt ngào, nữ tính, giúp làn da mẹ lên ảnh tươi tắn.",
    tags: ["Tông màu"],
  },
  "tone-tim": {
    name: "Tone Tím",
    caption: "mộng mơ sắc tử đằng",
    description:
      "Nền tím pastel, hoa tử đằng buông rủ và trang phục lụa mềm. Một bộ ảnh mộng mơ, thanh tao.",
    tags: ["Tông màu"],
  },
  "tone-xanh": {
    name: "Tone Xanh",
    caption: "thanh mát, nhẹ nhõm",
    description:
      "Xanh xám dịu mắt, ghế mây và hoa xanh. Concept thanh mát, tôn dáng và làm nổi bật nét sang của mẹ.",
    tags: ["Tông màu"],
  },
  "capture-your-beauty": {
    name: "Capture Your Beauty",
    caption: "retro, tự tin, cá tính",
    description:
      "Phong cách retro với rèm vàng, tóc mái và điểm nhấn đỏ. Dành cho mẹ muốn thể hiện sự tự tin và cá tính.",
    tags: ["Cá tính"],
  },
  "cao-boi": {
    name: "Cao Bồi",
    caption: "cô nàng miền viễn Tây",
    description:
      "Váy caro, bốt cao, đồng rơm hoàng hôn và chú ngựa nâu. Một concept phóng khoáng, khác biệt.",
    tags: ["Cá tính"],
  },
  "chup-voi-ngua": {
    name: "Chụp Với Ngựa",
    caption: "chuyện cổ tích bạch mã",
    description:
      "Ngựa trắng giữa vườn hồng như bước ra từ truyện cổ tích. Mẹ có thể chụp một mình hoặc cùng chồng.",
    tags: ["Cổ điển", "Cùng chồng"],
  },
  "me-bau-chup-voi-chong": {
    name: "Mẹ Bầu & Chồng",
    caption: "ba người, một gia đình",
    description:
      "Bố mẹ cùng nhau trong tông trắng ấm áp, chờ đón thành viên mới. Bộ ảnh gia đình đầu tiên của cả nhà.",
    tags: ["Cùng chồng"],
  },
};

const albums = new Map(gallery.map((a) => [a.slug, a.images as Photo[]]));

export const concepts: Concept[] = Object.entries(drafts).map(([slug, d]) => ({
  slug,
  ...d,
  photos: albums.get(slug) ?? [],
}));

export const tags: Tag[] = ["Tông màu", "Cổ điển", "Cá tính", "Cùng chồng"];

export const behindTheScenes = albums.get("hau-truong-concept-moi") ?? [];

export const studio = {
  name: "Cherry Studio",
  slogan: "Tôn vinh vẻ đẹp, ghi dấu khoảnh khắc",
  hotlines: ["0967 682 622", "0932 342 622"],
  branches: [
    { label: "Cơ sở 1", address: "62 ngõ 19 Trần Quang Diệu, Đống Đa, Hà Nội" },
    { label: "Cơ sở 2", address: "236 Tân Thành, Hùng Vương, TX Phú Thọ" },
  ],
  usp: [
    {
      title: "Đa dạng concept",
      text: "Nhiều concept chụp bầu, có sẵn trang phục và phụ kiện cho mẹ.",
    },
    { title: "Tận tâm", text: "Phục vụ chu đáo, luôn ưu tiên sự thoải mái của mẹ bầu." },
    {
      title: "Kinh nghiệm",
      text: "Biết tạo dáng, chọn góc để mẹ tự tin lên ảnh.",
    },
  ],
};

export const tel = (n: string) => `tel:${n.replace(/\s/g, "")}`;
