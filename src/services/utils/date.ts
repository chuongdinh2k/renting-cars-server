import dayjs from 'dayjs';

export const isDateBefore = (first_date: Date, second_date: Date) => {
  return dayjs(first_date).isBefore(second_date);
};
