class DatePicker {
  constructor(divId, callback) {
    this.divId = divId;
    this.callback = callback;
  }

  render(date) {
    const monthDays = document.querySelector(`#${this.divId} .days`);
    const weekdays = document.querySelector(`#${this.divId} .weekdays`);

    // Ngày cuối cùng của tháng hiện tại
    const lastDay = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();

    // Ngày cuối cùng của tháng trước
    const prevLastDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      0
    ).getDate();

    // Ngày đầu tiên của tháng thuộc thứ mấy
    const firstDayIndex = date.getDay();

    // Ngày cuối cùng của tháng thuộc thứ mấy
    const lastDayIndex = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDay();

    // số ngày hiển thị tháng sau ( Cũng là những ngày hiển thị)
    const nextDays = 7 - lastDayIndex - 1;

    const month = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    //Get weekdays
    let hellos = '';
    (function renderWeeks() {
      const hello = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      for (let a = 0; a < hello.length; a++) {
        hellos += `<div>${hello[a]}</div>`;
      }
    })();
    weekdays.innerHTML = hellos;

    document.querySelector(`#${this.divId} .date h1`).innerHTML =
      month[date.getMonth()];

    document.querySelector(`#${this.divId} .date p`).innerHTML =
      date.toDateString();

    let days = '';

    (function getDatePrevMonth() {
      for (let x = firstDayIndex; x > 0; x--) {
        days += `<div class ="prev-date">${prevLastDay - x + 1}</div>`;
      }
    })();

    (function getDateCurrentMonth() {
      for (let i = 1; i <= lastDay; i++) {
        if (i === date.getDate() && date.getMonth() === date.getMonth()) {
          days += `<div class="today">${i}</div>`;
        } else {
          days += `<div>${i}</div>`;
        }
      }
    })();

    (function getDateNextMonth() {
      for (let j = 1; j <= nextDays; j++) {
        days += `<div class="next-date">${j}</div>`;
      }
    })();

    monthDays.innerHTML = days;

    document
      .querySelector(`#${this.divId} .prev`)
      .addEventListener('click', () => {
        const prevDate = new Date(date.setMonth(date.getMonth() - 1));
        this.render(prevDate);
      });

    document
      .querySelector(`#${this.divId} .next`)
      .addEventListener('click', () => {
        const nextDate = new Date(date.setMonth(date.getMonth() + 1));
        console.log('Date next: ', nextDate);
        this.render(nextDate);
      });
  }
}
