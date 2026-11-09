'use client';

import { ArrowUpRight } from 'lucide-react';
import { asset } from '@/lib/assets';
import styles from './Footer.module.css';

type FooterProps = {
  onStart: () => void;
};

type FooterLink = { label: string; href: string };
type FooterGroup = { title: string; links: FooterLink[] };

const groups: FooterGroup[] = [
  {
    title: 'Features',
    links: [
      { label: 'All Features', href: '/features' },
      { label: 'Coursework Help', href: '/features/coursework-help' },
      { label: 'Assignment Drafting', href: '/features/assignment-drafting' },
      { label: 'Student Productivity Agent', href: '/features/student-productivity-agent' },
      { label: 'Professor Reviews', href: '/features/professor-reviews' },
    ],
  },
  {
    title: 'Integrations',
    links: [
      { label: 'All Integrations', href: '/integrations' },
      { label: 'Canvas', href: '/integrations/canvas' },
    ],
  },
  {
    title: 'Use Cases',
    links: [
      { label: 'All Use Cases', href: '/use-cases' },
      { label: 'Never Miss a Canvas Deadline', href: '/use-cases/never-miss-a-canvas-deadline' },
      { label: 'Course Planning', href: '/use-cases/course-planning' },
    ],
  },
  {
    title: 'Resources',
    links: [{ label: 'Study Guides', href: '/blog' }],
  },
  {
    title: 'Universities',
    links: [
      { label: 'ASU', href: '/universities/asu' },
      { label: 'UCF', href: '/universities/ucf' },
      { label: 'BYU', href: '/universities/byu' },
      { label: 'Texas A&M', href: '/universities/tamu' },
    ],
  },
  {
    title: 'Cubbie',
    links: [
      { label: 'Home', href: '#top' },
      { label: 'Discord', href: 'https://discord.gg/7eJADTbQMT' },
      { label: 'Privacy Policy', href: '/en-US/privacy' },
      { label: 'Terms of Service', href: '/en-US/terms' },
    ],
  },
];

const linkHref = (href: string) => href.startsWith('/') ? `https://cubbie.ai${href}` : href;

export function Footer({ onStart }: FooterProps) {
  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.invitation}>
          <h2>Spend less time finding schoolwork and more time doing it</h2>
          <div className={styles.invitationAction}>
            <p>Connect the tools you already use and plan the week ahead.</p>
            <button type="button" className={`button yellow ${styles.start}`} onClick={onStart}>
              Get started <ArrowUpRight aria-hidden="true" />
            </button>
          </div>
        </div>
        <nav className={styles.navigation} aria-label="Footer">
          {groups.map((group) => (
            <div key={group.title} className={styles.group}>
              <h3>{group.title}</h3>
              <ul>
                {group.links.map((link) => (
                  <li key={link.label}><a href={linkHref(link.href)}>{link.label}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <a href="#top" className={styles.brand} aria-label="Cubbie home">
          <img src={asset('/images/cubbie-logo.png')} alt="Cubbie" width={2109} height={745} />
        </a>
        <div className={styles.legal}>
          <p className={styles.copyright}>©2026 Cubbie</p>
          <p className={styles.trademarks}>
            Canvas is a trademark of Instructure, Inc. Gmail and Google Calendar are trademarks of Google LLC. iMessage is a trademark of Apple Inc. Cubbie is not affiliated with or endorsed by these companies.
          </p>
        </div>
      </div>
    </footer>
  );
}
