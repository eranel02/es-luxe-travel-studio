export function crmHead(title: string) {
  const fullTitle = `${title} — ES TRAVELS CRM DEMO`;
  const description = `מערכת הדגמה לניהול סוכנות ES TRAVELS — ${title}. נתונים מדומים בלבד.`;
  return { meta: [{ title: fullTitle }, { name: 'description', content: description }, { property: 'og:title', content: fullTitle }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' }, { name: 'robots', content: 'noindex, nofollow' }] };
}
