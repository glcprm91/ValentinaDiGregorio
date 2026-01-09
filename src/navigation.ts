import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Chi Sono',
      href: getPermalink('/#chi-sono'),
    },
    {
      text: 'Prestazioni',
      href: getPermalink('/#prestazioni'),
    },
    {
      text: 'Competenze',
      href: getPermalink('/#competenze'),
    },
    {
      text: 'Recensioni',
      href: getPermalink('/#recensioni'),
    },
    {
      text: 'Contatti',
      href: getPermalink('/#contatti'),
    },
  ],
  actions: [
    {
      text: 'Prenota Visita',
      href: 'https://www.miodottore.it/valentina-di-gregorio/dermatologo-venereologo/monsampolo-del-tronto',
      target: '_blank',
    },
  ],
};

export const footerData = {
  links: [
    {
      title: 'Navigazione',
      links: [
        { text: 'Chi Sono', href: getPermalink('/#chi-sono') },
        { text: 'Prestazioni', href: getPermalink('/#prestazioni') },
        { text: 'Competenze', href: getPermalink('/#competenze') },
        { text: 'Recensioni', href: getPermalink('/#recensioni') },
      ],
    },
    {
      title: 'Contatti',
      links: [
        {
          text: 'Prenota su MioDottore',
          href: 'https://www.miodottore.it/valentina-di-gregorio/dermatologo-venereologo/monsampolo-del-tronto',
        },
      ],
    },
  ],
  secondaryLinks: [{ text: 'Privacy Policy', href: getPermalink('/privacy') }],
  socialLinks: [
    {
      ariaLabel: 'LinkedIn',
      icon: 'tabler:brand-linkedin',
      href: 'https://www.linkedin.com/in/valentina-di-gregorio-046bb043/',
    },
  ],
  footNote: `
    &copy; ${new Date().getFullYear()} Dott.ssa Valentina Di Gregorio. Tutti i diritti riservati.
  `,
};
