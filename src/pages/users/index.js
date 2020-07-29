import React, { useEffect, useState, useMemo } from "react";
import UserCalendar from "components/UserCalendar";
import UserRow from "components/UserRow";
import getUsers from "services/users.service";
import Modal from "components/Modal";
import classNames from "classnames";
import moment from "moment";
import { convertTo24Hour } from "_utils";

const getMomentDetails = (start_time, end_time) => {
  const startTimeArr = start_time
    .split(" ")
    .map((i) => i.trim())
    .filter((i) => i !== "");
  const startTimeDate = startTimeArr.slice(0, 3).join(" ");
  const startTime = convertTo24Hour(startTimeArr[3]);

  const endTimeArr = end_time
    .split(" ")
    .map((i) => i.trim())
    .filter((i) => i !== "");
  const endDate = endTimeArr.slice(0, 3).join(" ");
  const endTime = convertTo24Hour(endTimeArr[3]);

  return {
    start_time: moment(startTimeDate + " " + startTime, "MMM DD YYYY hh:mm"),
    end_time: moment(endDate + " " + endTime, "MMM DD YYYY hh:mm"),
    date: startTimeDate,
    startTimeStr: startTimeArr[3],
    endTimeStr: endTimeArr[3],
  };
};

const Users = () => {
  const [usersList, setUsersList] = useState(null);
  const [modalId, setModalId] = useState(null);
  const [isShowCalendar, setIsShowCalendar] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);
  useEffect(() => {
    if (!modalId) setIsShowCalendar(false);
  }, [modalId]);

  const fetchUsers = async () => {
    const users = await getUsers();

    if (users?.members) setUsersList(users.members);
  };

  const handleUserClick = (userId) => {
    setModalId(userId);
  };

  const handleModalClose = () => setModalId(null);

  const toggleCalendar = (e) => {
    e.preventDefault();
    setIsShowCalendar((prev) => !prev);
  };

  const selectedUser = usersList?.find((i) => i.id === modalId);
  const selectedTimes = useMemo(() => {
    if (!selectedUser) return;
    return selectedUser?.activity_periods.map((i) => {
      const { start_time, end_time } = getMomentDetails(
        i.start_time,
        i.end_time
      );
      return {
        ...i,
        start_time,
        end_time,
      };
    });
  }, [selectedUser]);

  return (
    usersList && (
      <>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((user) => (
                <UserRow key={user.id} onClick={handleUserClick} data={user} />
              ))}
            </tbody>
          </table>
        </div>
        {/* {modalId && true && ( */}
        <Modal isShow={modalId && true} onClose={handleModalClose}>
          <Modal.Header>User Active Times</Modal.Header>
          <Modal.Body>
            {selectedUser?.activity_periods?.map((i) => {
              const { startTimeStr, endTimeStr, date } = getMomentDetails(
                i.start_time,
                i.end_time
              );
              return (
                <div
                  className="active-times-wrapper"
                  key={selectedUser?.id + date}
                >
                  <div className="date">{date}</div>
                  <div className="row mb-2">
                    <div className="col-3">{startTimeStr}</div>
                    <div className="col-2">-</div>
                    <div className="col-3">{endTimeStr}</div>
                  </div>
                </div>
              );
            })}
            <button className="plain-btn mb-2" onClick={toggleCalendar}>
              {isShowCalendar ? "Close calendar" : "View in calendar"}
            </button>
            <div className="calendar-wrapper mb-2">
              <div
                className={classNames("calendar", {
                  show: isShowCalendar && modalId,
                })}
              >
                <UserCalendar times={selectedTimes} />
              </div>
            </div>
          </Modal.Body>
        </Modal>
        {/* )} */}
      </>
    )
  );
};

export default Users;
