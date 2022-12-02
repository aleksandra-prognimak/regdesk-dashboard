import { useEffect, useState } from 'react';

export const Time = () => {
  const [date, setDate] = useState();

  useEffect(() => {
    setInterval(() => {
      const newDate = new Date();

      setDate(newDate.toLocaleString());
    });
  }, [date]);

  return (
    <div className="header__date">
      <div className="header__date-name">Server time</div>
      <div className="header__date-time">{date}</div>
    </div>
  );
};
