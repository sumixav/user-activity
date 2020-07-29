import React from "react";
import { Calendar, Badge } from "antd";
import { convertTo12Hour } from "_utils";

const UserCalendar = ({ times }) => {
  function getMonthData(value) {
    const dates = times.filter(
      (i) =>
        i.start_time.year() === value.year() &&
        i.start_time.month() === value.month()
    );

    return dates?.length
      ? dates.map((i) => ({
          startTime: convertTo12Hour(i.start_time),
          endTime: convertTo12Hour(i.end_time),
        }))
      : null;
  }

  function monthCellRender(value) {
    const num = getMonthData(value)?.map((i) => (
      <div key={i.startTime + value.date()}>
        {i.startTime} - {i.endTime}
      </div>
    ));
    return num ? (
      <div className="notes-month">
        {num}
      </div>
    ) : null;
  }
  function getListData(value) {
    let listData;
    const timeObj =
      times.find((i) => i.start_time.date() === value.date()) &&
      times.find((i) => i.start_time.year() === value.year()) &&
      times.find((i) => i.start_time.month() === value.month());
    if (timeObj?.start_time && timeObj?.end_time) {
      listData = [
        { type: "success", content: convertTo12Hour(timeObj.start_time) },
        { type: "error", content: convertTo12Hour(timeObj.end_time) },
      ];
    }

    return listData || [];
  }

  function dateCellRender(value) {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  }
  
  if (!times) return null;
  return (
    <Calendar
      dateCellRender={dateCellRender}
      monthCellRender={monthCellRender}
      fullscreen
    />
  );
};
export default UserCalendar;
