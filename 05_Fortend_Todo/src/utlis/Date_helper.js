class DateHelper {
  formatDate(isoDate) {
    const date = new Date(isoDate);

    // Extract the components of the date
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  calculateTimeLeft(dueDate) {
    const dueDateTime = new Date(dueDate);
    const currentDateTime = new Date();

    const timeDifference = dueDateTime - currentDateTime;

    if (timeDifference <= 0) {
      return "Time is up!";
    }

    // Convert the difference into hours, minutes, and seconds
    const secondsLeft = Math.floor(timeDifference / 1000);
    const minutesLeft = Math.floor(secondsLeft / 60);
    const hoursLeft = Math.floor(minutesLeft / 60);
    const daysLeft = Math.floor(hoursLeft / 24);

    const remainingDays = daysLeft;
    const remainingHours = hoursLeft % 24;
    const remainingMinutes = minutesLeft % 60;
    const remainingSeconds = secondsLeft % 60;

    // Determine which value to return based on the largest available unit
    if (remainingDays > 0) {
      return `${remainingDays} day${remainingDays > 1 ? "s" : ""}`;
    }
    if (remainingHours > 0) {
      return `${remainingHours} hr${remainingHours > 1 ? "s" : ""}`;
    }
    if (remainingMinutes > 0) {
      return `${remainingMinutes} min${remainingMinutes > 1 ? "s" : ""}`;
    }
    return `${remainingSeconds} sec${remainingSeconds > 1 ? "s" : ""}`;
  }
}

const dateHelper = new DateHelper();
export default dateHelper;
