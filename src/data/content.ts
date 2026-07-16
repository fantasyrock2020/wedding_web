import type { EventItem, Person, StoryItem } from '../types';

import story1Img from '../assets/images/story1.jpg';
import story2Img from '../assets/images/story2.jpg';
import story3Img from '../assets/images/story3.jpg';
import gallery1Img from '../assets/images/gallery1.jpg';
import gallery2Img from '../assets/images/gallery2.jpg';
import weddingImg from '../assets/images/wedding.png';

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
    title: 'Lần Đầu Gặp Gỡ',
    subtitle:
      'Một buổi chiều mùa thu năm 2019, hai chúng tôi tình cờ gặp nhau tại một quán cà phê nhỏ. Cuộc trò chuyện ngắn ngủi hôm ấy lại là khởi đầu cho một hành trình dài.',
    image: story1Img,
  },
  {
    title: 'Ngày Chúng Tôi Yêu',
    subtitle:
      'Sau nhiều lần hẹn hò, chúng tôi nhận ra mình muốn đi cùng nhau lâu dài. Mỗi khoảnh khắc bên nhau đều trở thành một kỷ niệm đáng trân trọng.',
    image: story2Img,
  },
  {
    title: 'Lời Cầu Hôn',
    subtitle:
      'Dưới ánh hoàng hôn trên bãi biển, anh đã quỳ xuống và trao cho em chiếc nhẫn cùng lời hứa về một tương lai chung. Đó là ngày không thể nào quên.',
    image: story3Img,
  },
];
