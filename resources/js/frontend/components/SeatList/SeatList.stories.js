import SeatList from './SeatList';
import { SeatData } from '../Seat/Seat.stories';

const paddedList = () => {
  return {
    template: `<div style="display: flex; justify-content:center; max-width: 270px; margin: 16px; padding: 16px; border: 1px solid #000;"><story/></div>`,
  };
};
export default {
  title: 'SeatList',
  excludeStories: /.*Data$/,
  decorators: [paddedList],
};

const SeatDefaultData = Object.keys(SeatData).map( key => SeatData[key].default);
export const defaultSeatData = [
  { ...SeatDefaultData, number: 1, content: "Seat1" },
  { ...SeatDefaultData, number: 2, content: "Seat2" },
  { ...SeatDefaultData, number: 3, content: "Seat3" },
  { ...SeatDefaultData, number: 4, content: "Seat4" },
  { ...SeatDefaultData, number: 5, content: "Seat5" },
  { ...SeatDefaultData, number: 6, content: "Seat6", selfActive: true},
  { ...SeatDefaultData, number: 7, content: "Seat7" },
  { ...SeatDefaultData, number: 8, content: "Seat8" },
  { ...SeatDefaultData, number: 9, content: "Seat9" },
  { ...SeatDefaultData, number: 10, content: "Seat10" },
  { ...SeatDefaultData, number: 11, content: "Seat11" },
  { ...SeatDefaultData, number: 12, content: "Seat12" },
];

export const activeSeatData = [
    { ...SeatDefaultData, number: 1, content: "Seat1" },
    { ...SeatDefaultData, number: 2, content: "Seat2" },
    { ...SeatDefaultData, number: 3, content: "Seat3", active: true },
    { ...SeatDefaultData, number: 4, content: "Seat4" },
    { ...SeatDefaultData, number: 5, content: "Seat5" },
    { ...SeatDefaultData, number: 6, content: "Seat6", active: true, selfActive: true},
    { ...SeatDefaultData, number: 7, content: "Seat7" },
    { ...SeatDefaultData, number: 8, content: "Seat8" },
    { ...SeatDefaultData, number: 9, content: "Seat9", active: true },
    { ...SeatDefaultData, number: 10, content: "Seat10" },
    { ...SeatDefaultData, number: 11, content: "Seat11", active: true },
    { ...SeatDefaultData, number: 12, content: "Seat12" },
  ];

export const Default = () => ({
  components: { SeatList },
  template: `<SeatList :seats="seats">`,
  props: {
    seats: {
      default: defaultSeatData
    }
  }
});

export const Active = () => ({
  components: { SeatList },
  template: `<SeatList :seats="seats">`,
  props: {
    seats: {
      default: activeSeatData
    }
  }
});