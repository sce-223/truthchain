import type { NewsConsensus, NewsItem } from "@/lib/types";

type SeedNewsItem = Omit<NewsItem, "content" | "publisher" | "sourceLabel"> & {
  publisher?: string;
  sourceLabel?: string;
  contextLead: string;
  contextRisk: string;
  contextWhyItMatters: string;
};

const seedNews = (item: SeedNewsItem): NewsItem => ({
  ...item,
  publisher: item.publisher || item.sourceLabel || "TruthChain Wire",
  sourceLabel: item.sourceLabel || item.publisher || "TruthChain Wire",
  content: [item.contextLead, item.contextRisk, item.contextWhyItMatters],
});

export const NEWS_ITEMS: NewsItem[] = [
  seedNews({
    id: "1",
    title: 'Trend "2016 hỏi - 2026 trả lời" đang khuấy đảo TikTok Việt Nam',
    summary:
      "Người dùng mạng xã hội đang chia sẻ lại những câu hỏi, ước mơ từ 10 năm trước và đối chiếu với thực tại năm 2026.",
    createdAt: "2026-03-25T01:00:00.000Z",
    category: "Social Trends",
    region: "Vietnam",
    claim:
      'Trend "2016 hỏi - 2026 trả lời" đang viral mạnh trên TikTok Việt Nam.',
    sourceUrl: "https://example.com/vn/trend-2016-hoi-2026-tra-loi",
    sourceLabel: "Social Pulse VN",
    contextLead:
      "Nội dung của trend xoay quanh việc mở lại ảnh chụp, status, nhật ký cũ hoặc lời hứa tuổi teen rồi đối chiếu với cuộc sống hiện tại.",
    contextRisk:
      "Các trend viral thường bùng phát ngắn hạn, nên mức độ lan truyền thật sự cần được kiểm tra qua nhiều nền tảng thay vì chỉ vài video nổi bật.",
    contextWhyItMatters:
      "Đây là nhóm tin mềm nhưng có sức lan tỏa cao, phù hợp để cộng đồng đánh giá xem mức độ phổ biến có đúng như mô tả hay không.",
  }),
  seedNews({
    id: "2",
    title: 'Quán cà phê blind date ở TP.HCM đóng cửa sau khi viral và bị bóc phốt',
    summary:
      "Mô hình hẹn hò giấu mặt bằng rèm che gây tranh cãi lớn trên TikTok và bị phản ứng dữ dội trên mạng xã hội.",
    createdAt: "2026-03-24T14:00:00.000Z",
    category: "Business",
    region: "Vietnam",
    claim:
      "Một quán cà phê blind date tại TP.HCM đã phải đóng cửa khẩn cấp sau khi viral và bị cộng đồng mạng phản ứng mạnh.",
    sourceUrl: "https://example.com/vn/blind-date-cafe-viral",
    sourceLabel: "Urban Beat",
    contextLead:
      "Mô hình kinh doanh này phân chia khu vực nam nữ bằng rèm che và quảng bá như một trải nghiệm hẹn hò độc lạ dành cho giới trẻ.",
    contextRisk:
      "Thông tin đóng cửa sau scandal là loại tin thường dễ bị phóng đại, vì vậy cần phân biệt giữa tạm ngưng hoạt động, xử lý nội bộ hay đóng cửa thật.",
    contextWhyItMatters:
      "Tin về kinh doanh online và backlash cộng đồng thường tăng tốc rất nhanh, nên một nền tảng vote công khai có thể giúp lọc bớt nhiễu loạn.",
  }),
  seedNews({
    id: "3",
    title: 'Tin đồn "trà sữa trân châu mắm nêm" đang thành món trending ở Đà Nẵng',
    summary:
      "Một số bài đăng khẳng định món đồ uống pha vị mắm nêm đang gây sốt tại các quán vỉa hè địa phương.",
    createdAt: "2026-03-23T09:15:00.000Z",
    category: "Food",
    region: "Da Nang",
    claim:
      'Món "trà sữa trân châu mắm nêm" đang lọt top trending tại các quán vỉa hè ở Đà Nẵng.',
    sourceUrl: "https://example.com/danang/tra-sua-mam-nem",
    sourceLabel: "Danang Viral Food",
    contextLead:
      "Nội dung đang lan truyền chủ yếu nhờ yếu tố sốc và kỳ lạ, đánh vào tâm lý thích thử món độc lạ của người xem mạng xã hội.",
    contextRisk:
      "Các tin dạng này rất dễ bị dựng lên để câu tương tác hoặc marketing cho quán, đặc biệt khi không có danh sách địa điểm hay thực khách xác nhận rộng rãi.",
    contextWhyItMatters:
      "Đây là ví dụ điển hình của một claim hấp dẫn nhưng cần xác minh thực địa thay vì tin theo video lan truyền.",
  }),
  seedNews({
    id: "4",
    title: "Táo Xuân 2026 bị chê vì nhồi trend mạng và quảng cáo gượng ép",
    summary:
      "Khán giả trên mạng nhận xét chương trình lạm dụng viral references và làm giảm chất lượng trải nghiệm xem.",
    createdAt: "2026-03-22T12:40:00.000Z",
    category: "Entertainment",
    region: "Vietnam",
    claim:
      'Táo Xuân 2026 đang nhận "cơn mưa" chỉ trích vì nhồi nhét quá nhiều hot trend và quảng cáo gượng ép.',
    sourceUrl: "https://example.com/vn/tao-xuan-2026-phan-ung",
    sourceLabel: "Screen Culture",
    contextLead:
      "Các chương trình mùa Tết thường trở thành chủ đề bàn luận lớn, đặc biệt khi có sự chênh lệch giữa kỳ vọng khán giả và cách thể hiện thực tế.",
    contextRisk:
      "Phản ứng tiêu cực trên mạng có thể thật nhưng mức độ đại diện cho số đông không phải lúc nào cũng rõ ràng nếu thiếu số liệu rating hoặc khảo sát.",
    contextWhyItMatters:
      "Tin kiểu này phù hợp để cộng đồng cùng đánh giá xem cụm từ 'cơn mưa chỉ trích' có đang bị dùng quá đà hay không.",
  }),
  seedNews({
    id: "5",
    title: 'Đà Nẵng thử nghiệm hệ thống "drone bắt loa" ở bãi biển Mỹ Khê',
    summary:
      "Một số bài viết mô tả drone có thể tự bay theo và cảnh cáo nhóm hát karaoke quá giờ trên bãi biển.",
    createdAt: "2026-03-21T16:20:00.000Z",
    category: "Civic Tech",
    region: "Da Nang",
    claim:
      'Đà Nẵng đã đưa vào thử nghiệm hệ thống "drone bắt loa" phát tia laser cảnh cáo ở bãi biển Mỹ Khê.',
    sourceUrl: "https://example.com/danang/drone-bat-loa",
    sourceLabel: "Coastal Watch",
    contextLead:
      "Câu chuyện kết hợp công nghệ an ninh và quản lý trật tự công cộng nên rất dễ thu hút lượt xem và tranh cãi trên mạng.",
    contextRisk:
      'Chi tiết "phát tia laser cảnh cáo" làm claim này trở nên bất thường, cần kiểm tra kỹ xem đó là mô tả chính xác hay chỉ là cách nói giật tít.',
    contextWhyItMatters:
      "Đây là tin phù hợp để người dùng phân biệt giữa một dự án quản lý đô thị có thật và một câu chuyện được kể quá tay để câu view.",
  }),
  seedNews({
    id: "6",
    title: "Đà Nẵng ghi nhận lượng khách quốc tế tăng mạnh đầu năm 2026",
    summary:
      "Nhiều bài đăng cho rằng các chuyến bay từ Hàn Quốc và Đài Loan đang góp phần làm bùng nổ lượng khách ngoại đến thành phố.",
    createdAt: "2026-03-25T03:30:00.000Z",
    category: "Tourism",
    region: "Da Nang",
    claim:
      "Đà Nẵng đang chứng kiến lượng khách quốc tế bùng nổ trong những tháng đầu năm 2026, đặc biệt từ Hàn Quốc và Đài Loan.",
    sourceUrl: "https://example.com/danang/tourism-q1-2026",
    sourceLabel: "Travel Index Asia",
    contextLead:
      "Ngành du lịch Đà Nẵng thường có độ nhạy cao với mở rộng đường bay, mùa lễ hội và nhu cầu nghỉ dưỡng ngắn ngày của khách khu vực Đông Bắc Á.",
    contextRisk:
      "Từ khóa 'bùng nổ' là mô tả mạnh, nên cần có số liệu khách, tần suất bay hoặc thống kê sân bay để xác minh mức tăng thực tế.",
    contextWhyItMatters:
      "Tin du lịch tích cực thường được chia sẻ rộng vì tác động đến đầu tư, lưu trú và hình ảnh thành phố, nên tính chính xác rất quan trọng.",
  }),
  seedNews({
    id: "7",
    title: 'Video "decor nhà đón xuân chỉ với 400 cành" đang thu hút hàng triệu lượt xem',
    summary:
      "Nội dung hướng dẫn trang trí nhà bằng số lượng lớn cành hoa giả đang được chia sẻ rất mạnh trên mạng xã hội.",
    createdAt: "2026-03-24T02:10:00.000Z",
    category: "Lifestyle",
    region: "Vietnam",
    claim:
      'Video "Decor nhà đón Tết/Xuân chỉ với 400 cành" đang viral mạnh và khiến các shop hoa lụa giả cháy hàng.',
    sourceUrl: "https://example.com/vn/decor-400-canh-viral",
    sourceLabel: "Home Mood",
    contextLead:
      "Các nội dung decor có tính thị giác cao nên rất dễ lan truyền, đặc biệt khi gắn với công thức cụ thể và hình ảnh trước-sau rõ ràng.",
    contextRisk:
      'Phần claim "cháy hàng" thường khó kiểm chứng nếu không có dữ liệu bán hàng hay xác nhận từ nhiều shop khác nhau.',
    contextWhyItMatters:
      "Đây là dạng tin mềm nhưng dễ tạo hiệu ứng FOMO, phù hợp để người dùng tập phân biệt giữa độ phổ biến thật và cách kể chuyện cường điệu.",
  }),
  seedNews({
    id: "8",
    title: 'Trào lưu "nuôi đá cuội" quay lại trong giới trẻ TP.HCM',
    summary:
      "Nhiều người dùng được cho là đang làm căn cước mini và quần áo nhỏ cho những viên đá như thú cưng.",
    createdAt: "2026-03-20T11:00:00.000Z",
    category: "Social Trends",
    region: "Ho Chi Minh City",
    claim:
      'Trào lưu "nuôi đá cuội" đang quay trở lại ở giới trẻ TP.HCM với nhiều nội dung sáng tạo như căn cước mini và quần áo cho đá.',
    sourceUrl: "https://example.com/vn/nuoi-da-cuoi-comeback",
    sourceLabel: "Youth Loop",
    contextLead:
      "Những trend phi lý nhưng dễ thương thường có chu kỳ quay lại, đặc biệt khi được người sáng tạo nội dung tái đóng gói theo phong cách mới.",
    contextRisk:
      "Tin dạng này có thể dựa trên vài case lẻ rồi bị thổi thành phong trào, nên cần xem liệu nó có thực sự lan rộng hay chỉ là hiện tượng cục bộ.",
    contextWhyItMatters:
      "Đây là ví dụ tốt để cộng đồng đánh giá mức độ đại diện của một hiện tượng mạng xã hội.",
  }),
  seedNews({
    id: "9",
    title: "Nam ca sĩ hạng A bị tố dùng AI để hát nhép 100% trong liveshow",
    summary:
      "Một kỹ sư âm thanh được cho là đã đăng bài bóc phốt chi tiết về việc giọng hát được tạo hoàn toàn bằng AI.",
    createdAt: "2026-03-25T05:20:00.000Z",
    category: "Showbiz",
    region: "Vietnam",
    claim:
      "Một nam ca sĩ hạng A của Vpop vừa bị bóc phốt dùng AI để hát nhép 100% trong liveshow cháy vé.",
    sourceUrl: "https://example.com/vpop/ai-lip-sync-allegation",
    sourceLabel: "Stage Leak",
    contextLead:
      "Cáo buộc liên quan đến AI và biểu diễn trực tiếp luôn tạo tranh cãi lớn vì nó chạm vào tính chân thực và đạo đức nghề nghiệp.",
    contextRisk:
      'Cụm từ "100%" là một khẳng định cực mạnh và dễ bị dùng quá tay trong các bài bóc phốt thiếu chứng cứ độc lập.',
    contextWhyItMatters:
      "Đây là loại tin có nguy cơ gây tổn hại danh tiếng cao, nên cơ chế đồng thuận cộng đồng cần đặc biệt thận trọng.",
  }),
  seedNews({
    id: "10",
    title: 'Đà Nẵng khảo sát cáp treo mini dưới gầm Cầu Rồng cho khách xem phun lửa',
    summary:
      "Một số bài đăng mô tả thành phố đang nghiên cứu trải nghiệm du lịch mới chạy ngay dưới gầm cầu.",
    createdAt: "2026-03-23T04:50:00.000Z",
    category: "Infrastructure",
    region: "Da Nang",
    claim:
      'Đà Nẵng đang khảo sát dự án cáp treo mini chạy dưới gầm Cầu Rồng để xem màn phun lửa, phun nước cuối tuần.',
    sourceUrl: "https://example.com/danang/dragon-bridge-mini-cable",
    sourceLabel: "City Scope",
    contextLead:
      "Bất kỳ tin nào liên quan tới Cầu Rồng đều dễ bùng nổ tương tác vì đây là biểu tượng du lịch nổi bật của Đà Nẵng.",
    contextRisk:
      "Ý tưởng cáp treo mini dưới gầm cầu nghe rất lạ và chịu nhiều ràng buộc kỹ thuật, nên cần xác minh nguồn quy hoạch chính thức.",
    contextWhyItMatters:
      "Đây là một claim hạ tầng có vẻ hấp dẫn nhưng rủi ro fake cao, rất hợp cho cơ chế vote công khai.",
  }),
  seedNews({
    id: "11",
    title: 'Video 7 chú chó đi bộ 17km trong tuyết để tìm đường về nhà đang viral toàn cầu',
    summary:
      "Clip về nhóm chó đi lạc ở Trung Quốc, dẫn đầu bởi một chú corgi, đang được chia sẻ mạnh trên nhiều nền tảng.",
    createdAt: "2026-03-21T07:25:00.000Z",
    category: "Animals",
    region: "China",
    claim:
      "Một video ghi lại cảnh 7 chú chó ở Trung Quốc đã tự đi bộ hơn 17km giữa trời tuyết để tìm đường về nhà.",
    sourceUrl: "https://example.com/world/dogs-17km-snow",
    sourceLabel: "Global Viral Feed",
    contextLead:
      "Nội dung về động vật thường thu hút tương tác vượt trội, đặc biệt khi có hành trình bất ngờ và yếu tố cảm xúc mạnh.",
    contextRisk:
      "Các clip viral toàn cầu rất dễ bị cắt ghép hoặc kể lại sai bối cảnh, nên cần xác minh nguồn video gốc và hành trình thật.",
    contextWhyItMatters:
      "Đây là loại tin dễ được chia sẻ vì cảm xúc, nên cộng đồng cần cơ chế đánh giá trước khi mặc định là thật.",
  }),
  seedNews({
    id: "12",
    title: "Elon Musk bị đồn cân nhắc mua lại Zalo để tích hợp vào X",
    summary:
      "Một tweet lan truyền nói rằng tỷ phú công nghệ đang xem xét thâu tóm nền tảng nhắn tin phổ biến tại Việt Nam.",
    createdAt: "2026-03-25T06:10:00.000Z",
    category: "Tech",
    region: "Global",
    claim:
      "Elon Musk đã đăng tweet nói ông đang cân nhắc mua lại Zalo để tích hợp vào siêu ứng dụng X.",
    sourceUrl: "https://example.com/world/elon-zalo-rumor",
    sourceLabel: "Tech Current",
    contextLead:
      "Các tin đồn mua bán liên quan đến Elon Musk thường khuếch đại rất nhanh vì ông là nhân vật có sức kéo truyền thông cực lớn.",
    contextRisk:
      "Claim dựa trên tweet là loại thông tin cần đối chiếu trực tiếp với tài khoản gốc và bối cảnh phát ngôn, tránh trường hợp ảnh chụp giả hoặc parody account.",
    contextWhyItMatters:
      "Tin M&A giả có thể tác động đến dư luận, doanh nghiệp và thị trường, nên cần kiểm tra chặt chẽ.",
  }),
  seedNews({
    id: "13",
    title: "Ảnh AI giả mạo từ Grok và Gemini đang gây nhiễu loạn thông tin về Trung Đông",
    summary:
      "Nhiều nhà quan sát cho rằng hình ảnh do AI tạo đang tràn lan và làm sai lệch nhận thức về các điểm nóng xung đột.",
    createdAt: "2026-03-24T18:35:00.000Z",
    category: "AI",
    region: "Global",
    claim:
      "Ảnh AI giả mạo do các công cụ như Grok và Gemini tạo ra đang tràn ngập mạng xã hội và gây nhiễu nghiêm trọng về thông tin chiến sự Trung Đông.",
    sourceUrl: "https://example.com/world/ai-images-middle-east",
    sourceLabel: "Signal Monitor",
    contextLead:
      "Khả năng tạo ảnh tốc độ cao của các mô hình AI khiến việc phát tán nội dung không xác minh trở nên rẻ và nhanh hơn rất nhiều.",
    contextRisk:
      "Dù xu hướng này có cơ sở, mức độ nghiêm trọng và phạm vi ảnh hưởng cần được gắn với ví dụ, thống kê hoặc báo cáo xác thực thay vì nêu chung chung.",
    contextWhyItMatters:
      "Đây là nhóm tin sát với sứ mệnh của TruthChain vì nó liên quan trực tiếp đến khủng hoảng niềm tin vào nội dung số.",
  }),
  seedNews({
    id: "14",
    title: 'Rò rỉ Apple Watch Series 12 có tính năng "iSlap" để đánh thức trong họp',
    summary:
      "Một số bài đăng công nghệ tuyên bố Apple sắp ra mắt chế độ rung cực mạnh khi phát hiện người dùng ngủ gật.",
    createdAt: "2026-03-22T22:45:00.000Z",
    category: "Consumer Tech",
    region: "Global",
    claim:
      'Apple Watch Series 12 sẽ có tính năng "iSlap" tự động rung cường độ cao để đánh thức người dùng khi ngủ gật trong họp.',
    sourceUrl: "https://example.com/tech/apple-islap-rumor",
    sourceLabel: "Leak Lab",
    contextLead:
      "Tin rò rỉ sản phẩm Apple luôn có lực kéo mạnh, nhất là khi đi kèm tên tính năng gây cười và dễ lan truyền thành meme.",
    contextRisk:
      'Tên gọi "iSlap" khiến claim có màu sắc châm biếm rõ rệt, nên rất có khả năng là nội dung chế hoặc tin giả được đóng vai leak.',
    contextWhyItMatters:
      "Đây là một ví dụ gần như lý tưởng để cộng đồng thực hành bỏ phiếu phản biện trước các leak nghe có vẻ quá vô lý.",
  }),
  seedNews({
    id: "15",
    title: 'Dịch vụ "thuê người nghe chửi" ở Nhật được cho là đang quá tải',
    summary:
      "Nhiều bài viết nói áp lực đầu năm tài chính khiến giới văn phòng tìm đến dịch vụ giải tỏa cảm xúc qua điện thoại.",
    createdAt: "2026-03-21T10:40:00.000Z",
    category: "Society",
    region: "Japan",
    claim:
      'Tại Nhật Bản, dịch vụ "thuê người nghe chửi" qua điện thoại đang trong tình trạng quá tải do áp lực công việc đầu năm tài chính 2026.',
    sourceUrl: "https://example.com/japan/rent-someone-to-listen",
    sourceLabel: "Tokyo Pulse",
    contextLead:
      "Nhật Bản thường là nguồn của nhiều mô hình dịch vụ tâm lý xã hội đặc thù, nên các câu chuyện kiểu này nghe có vẻ lạ nhưng không hoàn toàn bất khả thi.",
    contextRisk:
      'Cụm "quá tải" cần có dữ liệu thực như danh sách chờ, doanh thu hoặc số lượng yêu cầu tăng vọt; nếu không rất dễ là cách kể phóng đại.',
    contextWhyItMatters:
      "Đây là tin ở vùng xám giữa kỳ lạ và có thể có thật, rất phù hợp cho cơ chế consensus của cộng đồng.",
  }),
  seedNews({
    id: "16",
    title: "Startup dịch tiếng khóc trẻ sơ sinh gọi vốn 50 triệu USD với độ chính xác 99%",
    summary:
      "Một công ty tại Thung lũng Silicon được cho là quảng bá ứng dụng giải mã tiếng khóc trẻ em sang 5 ngôn ngữ.",
    createdAt: "2026-03-20T19:15:00.000Z",
    category: "Startups",
    region: "United States",
    claim:
      "Một startup ở Silicon Valley vừa gọi vốn 50 triệu USD cho ứng dụng dịch tiếng khóc của trẻ sơ sinh với độ chính xác 99%.",
    sourceUrl: "https://example.com/us/baby-cry-translation-startup",
    sourceLabel: "Venture Radar",
    contextLead:
      "Các startup AI trong lĩnh vực parenting dễ hút sự chú ý vì vừa cảm xúc vừa có tiềm năng thương mại rõ ràng.",
    contextRisk:
      "Mức chính xác 99% là cực cao cho một bài toán mơ hồ như tiếng khóc trẻ sơ sinh, nên claim này đòi hỏi bằng chứng khoa học rất mạnh.",
    contextWhyItMatters:
      "Đây là một claim công nghệ - gọi vốn điển hình mà cộng đồng cần học cách nghi ngờ đúng chỗ.",
  }),
  seedNews({
    id: "17",
    title: 'Xu hướng mặc "áo phao lều" đang càn quét giới trẻ Hàn Quốc',
    summary:
      "Một số nội dung thời trang mô tả loại áo phao phồng gấp nhiều lần cơ thể để chống va đập trên tàu điện ngầm.",
    createdAt: "2026-03-25T04:00:00.000Z",
    category: "Fashion",
    region: "South Korea",
    claim:
      'Xu hướng mặc "áo phao lều" để chống va đập khi đi tàu điện ngầm đang càn quét giới trẻ Hàn Quốc.',
    sourceUrl: "https://example.com/korea/tent-puffer-trend",
    sourceLabel: "Seoul Wave",
    contextLead:
      "Các xu hướng thời trang dị biệt ở Hàn Quốc thường dễ trở thành meme quốc tế, ngay cả khi chỉ xuất phát từ vài hình ảnh đơn lẻ.",
    contextRisk:
      'Cụm từ "càn quét" rất có thể đang thổi phồng một hiện tượng niche thành xu hướng đại trà.',
    contextWhyItMatters:
      "Tin này là ví dụ tốt cho việc cần tách bạch giữa nội dung vui mắt và bằng chứng về xu hướng xã hội thật.",
  }),
  seedNews({
    id: "18",
    title: "UNESCO được đồn đang xem xét Baby Shark là di sản văn hóa phi vật thể",
    summary:
      "Tin đồn lan truyền cho rằng ca khúc thiếu nhi nổi tiếng toàn cầu đã được đưa vào hồ sơ đề cử chính thức.",
    createdAt: "2026-03-23T20:25:00.000Z",
    category: "Culture",
    region: "Global",
    claim:
      "UNESCO đang xem xét hồ sơ đề cử ca khúc Baby Shark trở thành Di sản văn hóa phi vật thể của nhân loại.",
    sourceUrl: "https://example.com/world/baby-shark-unesco-rumor",
    sourceLabel: "Culture Desk",
    contextLead:
      "Mọi thông tin gắn với UNESCO đều dễ tạo cảm giác chính danh, khiến người đọc giảm cảnh giác khi tiếp nhận các claim lạ.",
    contextRisk:
      "Claim này có dấu hiệu satire rất mạnh vì đối tượng và quy trình đề cử nghe không khớp với cách UNESCO thường vận hành.",
    contextWhyItMatters:
      "Đây là một bài test tốt cho khả năng nhận diện tin có vẻ chính thống nhưng thực chất rất đáng nghi.",
  }),
  seedNews({
    id: "19",
    title: 'Tiktoker khẳng định tìm thấy "bãi đỗ đĩa bay" trên Everest bằng Google Earth',
    summary:
      "Nội dung du lịch mạo hiểm đang lan truyền với tuyên bố đã soi ra một khu vực bí ẩn trên vách đá khuất.",
    createdAt: "2026-03-22T05:55:00.000Z",
    category: "Conspiracy",
    region: "Global",
    claim:
      'Một Tiktoker du lịch mạo hiểm nói rằng đã dùng Google Earth để phát hiện "bãi đỗ đĩa bay" trên đỉnh Everest.',
    sourceUrl: "https://example.com/world/everest-ufo-google-earth",
    sourceLabel: "Mystery Stream",
    contextLead:
      "Các nội dung conspiracy kết hợp hình ảnh vệ tinh và địa điểm nổi tiếng luôn có hiệu ứng lan truyền mạnh vì tạo cảm giác như 'tự mình khám phá bí mật'.",
    contextRisk:
      "Đây là loại claim rất dễ dựa trên lỗi ảnh, bóng đổ hoặc trí tưởng tượng, nên rủi ro fake gần như mặc định là cao.",
    contextWhyItMatters:
      "Tin này là case rõ ràng để cộng đồng thể hiện cơ chế lọc nhiễu của nền tảng.",
  }),
  seedNews({
    id: "20",
    title: 'Cảnh báo về hội chứng "Hẹp não TikTok" đang gây tranh luận',
    summary:
      "Một số bài viết trích dẫn cảnh báo từ giới khoa học Anh về việc lướt video ngắn quá nhiều làm giảm khả năng tập trung.",
    createdAt: "2026-03-24T21:05:00.000Z",
    category: "Health",
    region: "United Kingdom",
    claim:
      'Các nhà khoa học Anh đã cảnh báo về hội chứng "Hẹp não TikTok" ở thanh thiếu niên do lướt video ngắn quá 180 phút mỗi ngày.',
    sourceUrl: "https://example.com/health/tiktok-brain-warning",
    sourceLabel: "Health Signal",
    contextLead:
      "Tác động của video ngắn đến sự chú ý là chủ đề nghiên cứu có thật, nên những cảnh báo liên quan rất dễ được chia sẻ như khoa học đã kết luận chắc chắn.",
    contextRisk:
      'Cụm từ "Hẹp não TikTok" nghe giống cách đặt tên truyền thông hơn là một thuật ngữ y khoa chuẩn, nên cần kiểm tra nguồn nghiên cứu gốc.',
    contextWhyItMatters:
      "Đây là ví dụ quan trọng về cách tin khoa học dễ bị đóng gói thành thông điệp giật gân hơn so với bằng chứng thực tế.",
  }),
];

export const getNewsById = (newsId: string) =>
  NEWS_ITEMS.find((item) => item.id === newsId);

export const createEmptyConsensusMap = (): Record<string, NewsConsensus> =>
  Object.fromEntries(
    NEWS_ITEMS.map((item) => [
      item.id,
      {
        newsId: item.id,
        realCount: 0,
        fakeCount: 0,
        total: 0,
        realPercent: 0,
        fakePercent: 0,
      },
    ]),
  );
