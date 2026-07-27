import type { EventItem, Person, StoryItem } from '../types';

export const story1Img = '/images/story1.jpg';
export const story2Img = '/images/story2.jpg';
export const story3Img = '/images/story3.jpg';
export const gallery1Img = '/images/gallery1.jpg';
export const gallery2Img = '/images/gallery2.jpg';
export const weddingImg = '/images/wedding.png';

export const groom: Person = { name: 'Trương Tấn Sang' };
export const bride: Person = { name: 'Ngô Thị Thuỷ Tiên' };
export const weddingDate = '20 . 12 . 2026';

export const events: EventItem[] = [
  {
    title: 'Lễ Vu Quy',
    date: 'Thứ Bảy, 20/12/2026',
    time: '09:00 — 11:00',
    location: 'Tư Gia Nhà Gái',
    address: '12 Đường Hoa Sữa, Quận 3, TP. Hồ Chí Minh',
    googleMapsUrl: 'https://maps.google.com/?q=12+Hoa+Sua+Quan+3+Ho+Chi+Minh',
  },
  {
    title: 'Tiệc Báo Hỷ',
    date: 'Thứ Bảy, 20/12/2026',
    time: '18:00 — 21:00',
    location: 'The Reverie Saigon',
    address: '22-36 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh',
    googleMapsUrl: 'https://maps.google.com/?q=The+Reverie+Saigon',
  },
];

export const galleries: string[] = [
  gallery1Img,
  gallery2Img,
  story1Img,
  story2Img,
  story3Img,
  weddingImg,
];

export const stories: StoryItem[] = [
  {
    title: 'Cơ Duyên Gặp Gỡ',
    subtitle:
      'Chúng tôi gặp nhau tại cùng một công ty, giữa những ngày làm việc tưởng chừng như bình thường. Từ những lần trao đổi công việc, những câu chào hỏi xã giao, mọi thứ dần trở nên thân quen hơn mà chính chúng tôi cũng không nhận ra.',
    image: story1Img,
  },
  {
    title: 'Bắt Đầu Từ Một Ngày Đặc Biệt',
    subtitle:
      'Ngày 06/12/2023, chúng tôi chính thức bắt đầu hẹn hò. Đó không phải là một ngày quá cầu kỳ, nhưng lại là cột mốc đánh dấu sự khởi đầu của một hành trình đầy cảm xúc — nơi hai trái tim quyết định hướng về nhau.',
    image: story2Img,
  },
  {
    title: 'Những Hành Trình Cùng Nhau',
    subtitle:
      'Chúng tôi đã cùng nhau đi qua nhiều nơi, từ những chuyến đi ngắn ngày như Vũng Tàu, đến hành trình chinh phục Núi Bà Đen (Tây Ninh), hay những ngày đầy nắng gió tại Phan Thiết - Mũi Né. Mỗi chuyến đi không chỉ là khám phá, mà còn là những kỷ niệm giúp chúng tôi hiểu và thương nhau nhiều hơn.',
    image: story3Img,
  },
  {
    title: 'Cùng Nhau Trưởng Thành',
    subtitle:
      'Không chỉ có niềm vui, chúng tôi cũng đã cùng nhau trải qua những lúc khó khăn, những cảm xúc thăng trầm trong cuộc sống. Chính những điều đó đã giúp cả hai học cách lắng nghe, thấu hiểu và trân trọng nhau hơn mỗi ngày.',
    image: gallery1Img,
  },
  {
    title: 'Lời Hứa Trọn Đời',
    subtitle:
      'Và khi nhận ra rằng đối phương chính là người mình muốn đồng hành suốt cuộc đời, chúng tôi đã quyết định bước sang một chương mới. Một hành trình không chỉ có tình yêu, mà còn là sự gắn bó, sẻ chia và cùng nhau xây dựng một mái ấm hạnh phúc.',
    image: weddingImg,
  },
];
