import { useEffect } from 'react';

export default function PortalMeta({ title }) {
  useEffect(() => {
    const previousTitle = document.title;
    let robots = document.querySelector('meta[name="robots"]');
    const created = !robots;

    if (!robots) {
      robots = document.createElement('meta');
      robots.setAttribute('name', 'robots');
      document.head.appendChild(robots);
    }

    const previousRobots = robots.getAttribute('content');
    robots.setAttribute('content', 'noindex, nofollow, noarchive, nosnippet');
    document.title = title;

    return () => {
      document.title = previousTitle;
      if (created) robots.remove();
      else if (previousRobots) robots.setAttribute('content', previousRobots);
      else robots.removeAttribute('content');
    };
  }, [title]);

  return null;
}
