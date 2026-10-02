import { useEffect, useState } from 'react';
import { profile } from '../data';

const formatter = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: profile.timeZone,
});

const now = () => formatter.format(new Date());

/** Local time in Riyadh. Ticks on the minute; the one truly live thing on the page. */
export function Clock({ className = '' }: { className?: string }) {
  const [time, setTime] = useState(now);

  useEffect(() => {
    const tick = () => setTime(now());
    // Align to the next minute boundary, then tick every minute.
    const ms = 60_000 - (Date.now() % 60_000);
    let interval: number | undefined;
    const timeout = window.setTimeout(() => {
      tick();
      interval = window.setInterval(tick, 60_000);
    }, ms);
    return () => {
      window.clearTimeout(timeout);
      if (interval) window.clearInterval(interval);
    };
  }, []);

  return (
    <span className={`clock ${className}`}>
      <span className="sr-only">Local time in Riyadh: </span>
      <time dateTime={time}>{time}</time>
      <span aria-hidden="true"> GMT+3</span>
    </span>
  );
}
