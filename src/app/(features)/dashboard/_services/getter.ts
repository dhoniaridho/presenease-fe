import { getCheckin } from "../../checkins/_services/getter";
import { DateTime } from "luxon";

export const getDashboardData = async () => {
  const checkins = await getCheckin();

  let totalHours = 0;

  checkins.data.data.forEach((checkin) => {
    let start: Date = checkin.createdAt;
    let end: Date;
    if (checkin.status === "LOGIN") {
      start = checkin.createdAt;
    }
    if (checkin.status === "LOGOUT") {
      end =
        checkin.activities.find((activity) => activity.type === "LOGOUT")
          ?.createdAt || checkin.createdAt;
      totalHours = DateTime.fromJSDate(end)
        .diff(DateTime.fromJSDate(start))
        .as("second");
    }

    checkin.activities
      .filter((activity) => activity.type === "AFK" || activity.type === "BACK")
      .forEach((activity, index) => {
        const totalBreak = DateTime.fromJSDate(activity.updatedAt).diff(
          DateTime.fromJSDate(activity.createdAt)
        );

        totalHours = totalHours - totalBreak.as("second");
      });
  });

  return {
    totalHours,
  };
};
