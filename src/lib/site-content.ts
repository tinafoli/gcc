import { google } from 'googleapis';

const SITE_SETTINGS_TAB = 'SiteSettings';
const ANNOUNCEMENTS_TAB = 'Announcements';
const TEAM_TAB = 'TeamMembers';
const BOARD_TAB = 'BoardMembers';
const IMPACT_STATS_TAB = 'ImpactStats';
const REPORTS_TAB = 'Reports';
const SEO_SETTINGS_TAB = 'SeoSettings';

type SheetsClient = ReturnType<typeof google.sheets>;

export type SiteSettings = {
  linkedinEmbedUrl: string;
  linkedinProfileUrl: string;
  linkedinPostUrl: string;
};

export type ImpactStat = {
  id: string;
  label: string;
  value: number;
  suffix: string;
  description: string;
  active: boolean;
  sortOrder: number;
  updatedAt?: string;
};

export type ManagedReport = {
  id: string;
  year: string;
  title: string;
  description: string;
  datePublished: string;
  pdfUrl: string;
  highlights: string[];
  thumbnail: string;
  active: boolean;
  sortOrder: number;
  updatedAt?: string;
};

export type SeoSettings = {
  pageKey: string;
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  updatedAt?: string;
};

export type HomepageAnnouncement = {
  id: string;
  enabled: boolean;
  badge: string;
  title: string;
  eventTitle: string;
  date: string;
  time: string;
  location: string;
  image: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  updatedAt?: string;
};

export type Member = {
  id: string;
  name: string;
  title: string;
  image: string;
  linkedin: string;
  website: string;
  active: boolean;
  sortOrder: number;
  updatedAt?: string;
};

const DEFAULT_SITE_SETTINGS: SiteSettings = {
  linkedinEmbedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:activity:7416748561272528896',
  linkedinProfileUrl: 'https://www.linkedin.com/posts/ghana-code-club_ghanacodeclub-ailiteracy-ecobank-activity-7416748561272528896-Qnvd?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE71zwwBAQc_iS6a_42u1pQ3CSOAWPIwniU',
  linkedinPostUrl: 'https://www.linkedin.com/posts/ghana-code-club_ghanacodeclub-ailiteracy-ecobank-activity-7416748561272528896-Qnvd?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE71zwwBAQc_iS6a_42u1pQ3CSOAWPIwniU',
};

const DEFAULT_IMPACT_STATS: ImpactStat[] = [
  { id: 'kids-trained', label: 'KIDS TRAINED', value: 131000, suffix: '+', description: 'Empowering young minds with coding skills', active: true, sortOrder: 1 },
  { id: 'teachers-trained', label: 'TEACHERS TRAINED', value: 7000, suffix: '+', description: 'Equipping educators with digital skills', active: true, sortOrder: 2 },
  { id: 'mentors', label: 'MENTORS VOLUNTEERED', value: 324, suffix: '+', description: 'Dedicated professionals guiding our students', active: true, sortOrder: 3 },
  { id: 'centers', label: 'DIGITAL LEARNING CENTERS', value: 22, suffix: '+', description: 'Expanding our reach across Ghana', active: true, sortOrder: 4 },
  { id: 'girls-stem', label: 'GIRLS TRAINED THROUGH 100 GIRLS IN STEM', value: 30000, suffix: '+', description: 'Empowering girls in technology', active: true, sortOrder: 5 },
  { id: 'women-adults', label: 'WOMEN / ADULTS TRAINED', value: 100, suffix: '+', description: 'Building tech skills for adults', active: true, sortOrder: 6 },
  { id: 'regions', label: 'REGIONS COVERED', value: 8, suffix: '+', description: 'Making coding education accessible nationwide', active: true, sortOrder: 7 },
  { id: 'years', label: 'YEARS OF IMPACT', value: 10, suffix: '+', description: 'Building a brighter future through code', active: true, sortOrder: 8 },
];

const DEFAULT_REPORTS: ManagedReport[] = [
  {
    id: 'report-2025',
    year: '2025',
    title: '2025 Annual Impact Report',
    description: "Ghana Code Club's 2025 annual impact report highlighting our continued growth, expanded digital learning centers, and deepened impact across Ghana.",
    datePublished: '2025-12-31',
    pdfUrl: '/reports/gcc-annual-impact-report-2025.pdf',
    highlights: [
      '131,000+ kids trained in coding and digital skills',
      '7,000+ teachers trained across Ghana',
      '22+ digital learning centers established',
      '30,000+ girls trained through 100 Girls in STEM',
    ],
    thumbnail: '/images/reports/2025-report-cover.jpg',
    active: true,
    sortOrder: 1,
  },
  {
    id: 'report-2024',
    year: '2024',
    title: '2024 Annual Impact Report',
    description: "Ghana Code Club's 2024 annual impact report highlighting program growth, stronger school partnerships, and expanded youth digital skills training across Ghana.",
    datePublished: '2024-12-31',
    pdfUrl: '/reports/gcc-annual-impact-report-2024.pdf',
    highlights: [
      'Expanded coding and AI learning opportunities',
      'Stronger partnerships with schools and communities',
      'Increased support for teacher capacity building',
      'Deeper impact through outreach and innovation',
    ],
    thumbnail: '/images/reports/2024-report-cover.jpg',
    active: true,
    sortOrder: 2,
  },
  {
    id: 'report-2023',
    year: '2023',
    title: '2023 Annual Impact Report',
    description: "Ghana Code Club's 2023 annual impact report detailing our achievements in training students, teachers, and expanding our reach across Ghana.",
    datePublished: '2023-12-31',
    pdfUrl: '/reports/gcc-annual-impact-report-2023.pdf',
    highlights: [
      'Expanded reach to new regions',
      'Trained thousands of students and teachers',
      'Launched new community programs',
      'Strengthened partnerships',
    ],
    thumbnail: '/images/reports/2023-report-cover.jpg',
    active: true,
    sortOrder: 3,
  },
  {
    id: 'report-2022',
    year: '2022',
    title: '2022 Annual Impact Report',
    description: "Ghana Code Club's 2022 annual impact report showcasing our progress in providing coding education across Ghana.",
    datePublished: '2022-12-31',
    pdfUrl: '/reports/gcc-annual-impact-report-2022.pdf',
    highlights: [
      'Reached milestone in students trained',
      'Expanded teacher training programs',
      'Increased community engagement',
      'Enhanced program offerings',
    ],
    thumbnail: '/images/reports/2022-report-cover.jpg',
    active: true,
    sortOrder: 4,
  },
];

const DEFAULT_SEO_SETTINGS: SeoSettings[] = [
  {
    pageKey: 'home',
    title: 'Ghana Code Club | Empowering the next generation of Ghanaian leaders through coding education, AI and digital skills training',
    description: "Ghana Code Club has trained over 131,000 kids, 7,000 teachers, and 324 mentors across 22 digital learning centers. Join our mission to empower children aged 5-17 with coding skills through interactive after-school programs.",
    keywords: 'Ghana Code Club, kids coding, learn programming Ghana, STEM education Ghana, coding for children, tech education Africa, programming classes Ghana',
    canonical: 'https://ghanacode.club',
    ogTitle: 'Ghana Code Club - Empowering Young Minds Through Code',
    ogDescription: "Join Ghana Code Club's mission to teach coding to children aged 5-17. With over 131,000 kids trained, 7,000 teachers equipped, and 22 digital learning centers established, we're transforming digital literacy across Ghana.",
    ogImage: 'https://ghanacode.club/images/home-hero.jpg',
    twitterTitle: 'Ghana Code Club - Teaching Kids to Code in Ghana',
    twitterDescription: 'Over 131,000 kids trained in coding across 22 digital learning centers in Ghana. Join our mission to empower the next generation of tech innovators.',
    twitterImage: 'https://ghanacode.club/images/home-hero.jpg',
  },
  {
    pageKey: 'donate',
    title: 'Donate',
    description: "Support Ghana Code Club's mission to provide tech education to Ghanaian youth. Your donation helps us train students, equip schools, and empower the next generation of tech leaders. View our annual impact reports to see the difference your support makes.",
    keywords: 'donate, Ghana Code Club, impact report, annual report, tech education Ghana, coding education, charity Ghana, nonprofit Ghana',
    canonical: 'https://ghanacode.club/donate',
    ogTitle: 'Support Our Mission | Ghana Code Club',
    ogDescription: "Support Ghana Code Club's mission to provide tech education to Ghanaian youth. Your donation helps us train students, equip schools, and empower the next generation of tech leaders. View our annual impact reports.",
    ogImage: 'https://ghanacode.club/images/donate-hero.jpg',
    twitterTitle: 'Support Our Mission | Ghana Code Club',
    twitterDescription: "Support Ghana Code Club's mission to provide tech education to Ghanaian youth.",
    twitterImage: 'https://ghanacode.club/images/donate-hero.jpg',
  },
  {
    pageKey: 'reports',
    title: 'Impact Reports | Ghana Code Club - Annual Reports 2022-2025',
    description: "Download Ghana Code Club's annual impact reports (2022, 2023, 2024, 2025). See how we've trained 131,000+ kids, 7,000+ teachers, and established 22+ digital learning centers across Ghana through coding education and STEM programs.",
    keywords: 'Ghana Code Club impact report, annual report 2025, annual report 2024, annual report 2023, annual report 2022, Ghana tech education report, coding education impact, STEM education Ghana, nonprofit annual report, digital literacy Ghana, 100 girls in STEM, kids coding Ghana, teacher training Ghana',
    canonical: 'https://ghanacode.club/reports',
    ogTitle: 'Impact Reports | Ghana Code Club',
    ogDescription: "Download Ghana Code Club's annual impact reports. 131,000+ kids trained, 7,000+ teachers equipped, 22+ digital learning centers across Ghana.",
    ogImage: 'https://ghanacode.club/images/gcc-logo.png',
    twitterTitle: 'Impact Reports | Ghana Code Club',
    twitterDescription: "Download Ghana Code Club's annual impact reports. 131,000+ kids trained, 7,000+ teachers equipped, 22+ digital learning centers across Ghana.",
    twitterImage: 'https://ghanacode.club/images/gcc-logo.png',
  },
];

const DEFAULT_ANNOUNCEMENT: HomepageAnnouncement = {
  id: 'default',
  enabled: false,
  badge: 'Upcoming Event',
  title: 'Join Our Exciting Summer Activities',
  eventTitle: '',
  date: '22 JULY 2025',
  time: 'Tuesdays, Wednesdays & Saturdays',
  location: 'Ashongman Estates, Accra, Ghana',
  image: '/images/events/summer-camp.jpg',
  description: 'ACTIVITIES:\n• Coding & Game Design\n• Robotics & AI\n• Circuits & Electronics\n• Digital Arts\n• 3D Model/Print\n• Micro:bits',
  buttonText: 'Register Your Kids',
  buttonUrl: 'https://bit.ly/gccsummerschool',
};

function toBool(value: string | undefined): boolean {
  const v = (value || '').trim().toLowerCase();
  return v === 'true' || v === '1' || v === 'yes' || v === 'active' || v === 'enabled';
}

function extractLinkedInPostUrn(value: string): { kind: 'activity' | 'share' | 'ugcPost'; id: string } | null {
  const raw = (value || '').trim();
  if (!raw) return null;

  const decoded = (() => {
    try {
      return decodeURIComponent(raw);
    } catch {
      return raw;
    }
  })();

  const source = `${raw} ${decoded}`;

  const urnMatch = source.match(/urn:li:(activity|share|ugcPost):(\d+)/i);
  if (urnMatch?.[1] && urnMatch?.[2]) {
    return { kind: urnMatch[1].toLowerCase() as 'activity' | 'share' | 'ugcPost', id: urnMatch[2] };
  }

  const activityMatch = source.match(/activity-(\d+)/i);
  if (activityMatch?.[1]) {
    return { kind: 'activity', id: activityMatch[1] };
  }

  const shareMatch = source.match(/share-(\d+)/i);
  if (shareMatch?.[1]) {
    return { kind: 'share', id: shareMatch[1] };
  }

  const ugcPostMatch = source.match(/ugcpost-(\d+)/i);
  if (ugcPostMatch?.[1]) {
    return { kind: 'ugcPost', id: ugcPostMatch[1] };
  }

  return null;
}

function deriveLinkedInEmbedUrl(postUrl: string): string {
  const urn = extractLinkedInPostUrn(postUrl);
  if (!urn) return DEFAULT_SITE_SETTINGS.linkedinEmbedUrl;
  return `https://www.linkedin.com/embed/feed/update/urn:li:${urn.kind}:${urn.id}`;
}

function buildAuth() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_PRIVATE_KEY;
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!clientEmail || !rawKey || !sheetId) return null;
  const key = rawKey.includes('\\n') ? rawKey.replace(/\\n/g, '\n') : rawKey;
  return {
    sheetId,
    auth: new google.auth.JWT({
      email: clientEmail,
      key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    }),
  };
}

async function ensureTab(sheets: SheetsClient, sheetId: string, tab: string, headers: string[], endColumn: string) {
  const meta = await sheets.spreadsheets.get({
    spreadsheetId: sheetId,
    fields: 'sheets(properties(title))',
  });
  const exists = (meta.data.sheets || []).some((s) => (s.properties?.title || '').trim() === tab);

  if (!exists) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: sheetId,
      requestBody: { requests: [{ addSheet: { properties: { title: tab } } }] },
    });
  }

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${tab}!A1:${endColumn}1`,
  });

  if (!response.data.values || response.data.values.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: `${tab}!A1:${endColumn}1`,
      valueInputOption: 'RAW',
      requestBody: { values: [headers] },
    });
  }
}

async function getRows(tab: string, range: string): Promise<string[][]> {
  const conf = buildAuth();
  if (!conf) return [];
  const sheets = google.sheets({ version: 'v4', auth: conf.auth });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: conf.sheetId,
    range: `${tab}!${range}`,
  });
  return response.data.values || [];
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const conf = buildAuth();
  if (!conf) return DEFAULT_SITE_SETTINGS;
  try {
    const sheets = google.sheets({ version: 'v4', auth: conf.auth });
    await ensureTab(sheets, conf.sheetId, SITE_SETTINGS_TAB, ['key', 'value', 'updatedAt'], 'C');
    const rows = await getRows(SITE_SETTINGS_TAB, 'A2:C');
    const valueMap = new Map<string, string>();
    const timeMap = new Map<string, number>();
    for (const row of rows) {
      const key = (row[0] || '').trim();
      if (!key) continue;
      const value = row[1] || '';
      const ts = Date.parse(row[2] || '');
      const existingTs = timeMap.get(key) ?? Number.NEGATIVE_INFINITY;
      const effectiveTs = Number.isFinite(ts) ? ts : existingTs + 1;
      if (!valueMap.has(key) || effectiveTs >= existingTs) {
        valueMap.set(key, value);
        timeMap.set(key, effectiveTs);
      }
    }
    const linkedinPostUrl = valueMap.get('linkedinPostUrl') || valueMap.get('linkedinProfileUrl') || DEFAULT_SITE_SETTINGS.linkedinPostUrl;
    const linkedinEmbedUrl = valueMap.get('linkedinEmbedUrl') || deriveLinkedInEmbedUrl(linkedinPostUrl);
    const linkedinProfileUrl = valueMap.get('linkedinProfileUrl') || linkedinPostUrl;
    return {
      linkedinEmbedUrl,
      linkedinProfileUrl,
      linkedinPostUrl,
    };
  } catch {
    return DEFAULT_SITE_SETTINGS;
  }
}

export async function updateSiteSettings(settings: SiteSettings): Promise<void> {
  const conf = buildAuth();
  if (!conf) throw new Error('Google Sheets is not configured.');
  const sheets = google.sheets({ version: 'v4', auth: conf.auth });
  await ensureTab(sheets, conf.sheetId, SITE_SETTINGS_TAB, ['key', 'value', 'updatedAt'], 'C');

  const rows = await getRows(SITE_SETTINGS_TAB, 'A2:C');
  const now = new Date().toISOString();
  const linkedinPostUrl = settings.linkedinPostUrl || settings.linkedinProfileUrl;
  const linkedinEmbedUrl = settings.linkedinEmbedUrl || deriveLinkedInEmbedUrl(linkedinPostUrl);
  const linkedinProfileUrl = settings.linkedinProfileUrl || linkedinPostUrl;
  const updates: Array<[string, string]> = [
    ['linkedinPostUrl', linkedinPostUrl],
    ['linkedinEmbedUrl', linkedinEmbedUrl],
    ['linkedinProfileUrl', linkedinProfileUrl],
  ];

  function findLastIndexByKey(key: string): number {
    for (let i = rows.length - 1; i >= 0; i -= 1) {
      if (rows[i]?.[0] === key) return i;
    }
    return -1;
  }

  for (const [key, value] of updates) {
    const idx = findLastIndexByKey(key);
    if (idx >= 0) {
      const rowNumber = idx + 2;
      await sheets.spreadsheets.values.update({
        spreadsheetId: conf.sheetId,
        range: `${SITE_SETTINGS_TAB}!A${rowNumber}:C${rowNumber}`,
        valueInputOption: 'RAW',
        requestBody: { values: [[key, value, now]] },
      });
    } else {
      await sheets.spreadsheets.values.append({
        spreadsheetId: conf.sheetId,
        range: `${SITE_SETTINGS_TAB}!A:C`,
        valueInputOption: 'RAW',
        requestBody: { values: [[key, value, now]] },
      });
    }
  }
}

export async function getHomepageAnnouncement(): Promise<HomepageAnnouncement> {
  const conf = buildAuth();
  if (!conf) return DEFAULT_ANNOUNCEMENT;
  try {
    const sheets = google.sheets({ version: 'v4', auth: conf.auth });
    await ensureTab(
      sheets,
      conf.sheetId,
      ANNOUNCEMENTS_TAB,
      ['id', 'enabled', 'badge', 'title', 'eventTitle', 'date', 'time', 'location', 'image', 'description', 'buttonText', 'buttonUrl', 'updatedAt'],
      'M',
    );
    const rows = await getRows(ANNOUNCEMENTS_TAB, 'A2:M');
    let row: string[] = [];
    let latestTs = Number.NEGATIVE_INFINITY;
    for (const current of rows) {
      if (!(current[0] || '').trim()) continue;
      const ts = Date.parse(current[12] || '');
      const effectiveTs = Number.isFinite(ts) ? ts : latestTs + 1;
      if (row.length === 0 || effectiveTs >= latestTs) {
        row = current;
        latestTs = effectiveTs;
      }
    }
    if (row.length === 0) return DEFAULT_ANNOUNCEMENT;
    return {
      id: row[0] || DEFAULT_ANNOUNCEMENT.id,
      enabled: toBool(row[1]),
      badge: row[2] || DEFAULT_ANNOUNCEMENT.badge,
      title: row[3] || DEFAULT_ANNOUNCEMENT.title,
      eventTitle: row[4] || DEFAULT_ANNOUNCEMENT.eventTitle,
      date: row[5] || DEFAULT_ANNOUNCEMENT.date,
      time: row[6] || DEFAULT_ANNOUNCEMENT.time,
      location: row[7] || DEFAULT_ANNOUNCEMENT.location,
      image: row[8] || DEFAULT_ANNOUNCEMENT.image,
      description: row[9] || DEFAULT_ANNOUNCEMENT.description,
      buttonText: row[10] || DEFAULT_ANNOUNCEMENT.buttonText,
      buttonUrl: row[11] || DEFAULT_ANNOUNCEMENT.buttonUrl,
      updatedAt: row[12] || '',
    };
  } catch {
    return DEFAULT_ANNOUNCEMENT;
  }
}

export async function upsertHomepageAnnouncement(announcement: HomepageAnnouncement): Promise<void> {
  const conf = buildAuth();
  if (!conf) throw new Error('Google Sheets is not configured.');
  const sheets = google.sheets({ version: 'v4', auth: conf.auth });
  await ensureTab(
    sheets,
    conf.sheetId,
    ANNOUNCEMENTS_TAB,
    ['id', 'enabled', 'badge', 'title', 'eventTitle', 'date', 'time', 'location', 'image', 'description', 'buttonText', 'buttonUrl', 'updatedAt'],
    'M',
  );
  const rows = await getRows(ANNOUNCEMENTS_TAB, 'A2:M');
  const rowData = [
    announcement.id || 'home-announcement',
    String(announcement.enabled),
    announcement.badge,
    announcement.title,
    announcement.eventTitle,
    announcement.date,
    announcement.time,
    announcement.location,
    announcement.image,
    announcement.description,
    announcement.buttonText,
    announcement.buttonUrl,
    new Date().toISOString(),
  ];

  if (rows.length > 0) {
    const latestRowIndex = rows.reduce((latest, current, idx) => {
      const latestTs = Date.parse(rows[latest]?.[12] || '');
      const currentTs = Date.parse(current[12] || '');
      const effectiveLatest = Number.isFinite(latestTs) ? latestTs : Number.NEGATIVE_INFINITY;
      const effectiveCurrent = Number.isFinite(currentTs) ? currentTs : effectiveLatest + 1;
      return effectiveCurrent >= effectiveLatest ? idx : latest;
    }, 0);
    const rowNumber = latestRowIndex + 2;
    await sheets.spreadsheets.values.update({
      spreadsheetId: conf.sheetId,
      range: `${ANNOUNCEMENTS_TAB}!A${rowNumber}:M${rowNumber}`,
      valueInputOption: 'RAW',
      requestBody: { values: [rowData] },
    });
  } else {
    await sheets.spreadsheets.values.append({
      spreadsheetId: conf.sheetId,
      range: `${ANNOUNCEMENTS_TAB}!A:M`,
      valueInputOption: 'RAW',
      requestBody: { values: [rowData] },
    });
  }
}

async function getMembers(tab: string): Promise<Member[]> {
  const conf = buildAuth();
  if (!conf) return [];
  try {
    const sheets = google.sheets({ version: 'v4', auth: conf.auth });
    await ensureTab(
      sheets,
      conf.sheetId,
      tab,
      ['id', 'name', 'title', 'image', 'linkedin', 'website', 'active', 'sortOrder', 'updatedAt'],
      'I',
    );
    const rows = await getRows(tab, 'A2:I');
    const deduped = new Map<string, Member>();
    const timeMap = new Map<string, number>();
    for (const r of rows) {
      const id = (r[0] || '').trim();
      const name = (r[1] || '').trim();
      if (!id || !name) continue;
      const member: Member = {
        id: r[0],
        name: r[1] || '',
        title: r[2] || '',
        image: r[3] || '',
        linkedin: r[4] || '',
        website: r[5] || '',
        active: r[6] ? toBool(r[6]) : true,
        sortOrder: Number(r[7] || 9999),
        updatedAt: r[8] || '',
      };
      const ts = Date.parse(member.updatedAt || '');
      const existingTs = timeMap.get(id) ?? Number.NEGATIVE_INFINITY;
      const effectiveTs = Number.isFinite(ts) ? ts : existingTs + 1;
      if (!deduped.has(id) || effectiveTs >= existingTs) {
        deduped.set(id, member);
        timeMap.set(id, effectiveTs);
      }
    }
    return Array.from(deduped.values()).sort((a, b) => a.sortOrder - b.sortOrder);
  } catch {
    return [];
  }
}

export async function getTeamMembersFromSheet(): Promise<Member[]> {
  return getMembers(TEAM_TAB);
}

export async function getBoardMembersFromSheet(): Promise<Member[]> {
  return getMembers(BOARD_TAB);
}

export async function getTeamMemberById(id: string): Promise<Member | null> {
  const members = await getTeamMembersFromSheet();
  return members.find((m) => m.id === id) || null;
}

export async function getBoardMemberById(id: string): Promise<Member | null> {
  const members = await getBoardMembersFromSheet();
  return members.find((m) => m.id === id) || null;
}

async function upsertMember(tab: string, member: Member): Promise<void> {
  const conf = buildAuth();
  if (!conf) throw new Error('Google Sheets is not configured.');
  const sheets = google.sheets({ version: 'v4', auth: conf.auth });
  await ensureTab(
    sheets,
    conf.sheetId,
    tab,
    ['id', 'name', 'title', 'image', 'linkedin', 'website', 'active', 'sortOrder', 'updatedAt'],
    'I',
  );
  const rows = await getRows(tab, 'A2:I');
  let idx = -1;
  for (let i = rows.length - 1; i >= 0; i -= 1) {
    if (rows[i]?.[0] === member.id) {
      idx = i;
      break;
    }
  }
  const rowData = [
    member.id,
    member.name,
    member.title,
    member.image,
    member.linkedin,
    member.website,
    String(member.active),
    String(member.sortOrder),
    new Date().toISOString(),
  ];

  if (idx >= 0) {
    const rowNumber = idx + 2;
    await sheets.spreadsheets.values.update({
      spreadsheetId: conf.sheetId,
      range: `${tab}!A${rowNumber}:I${rowNumber}`,
      valueInputOption: 'RAW',
      requestBody: { values: [rowData] },
    });
  } else {
    await sheets.spreadsheets.values.append({
      spreadsheetId: conf.sheetId,
      range: `${tab}!A:I`,
      valueInputOption: 'RAW',
      requestBody: { values: [rowData] },
    });
  }
}

export async function upsertTeamMember(member: Member): Promise<void> {
  await upsertMember(TEAM_TAB, member);
}

export async function upsertBoardMember(member: Member): Promise<void> {
  await upsertMember(BOARD_TAB, member);
}

async function deleteMember(tab: string, id: string): Promise<void> {
  const conf = buildAuth();
  if (!conf) throw new Error('Google Sheets is not configured.');
  const sheets = google.sheets({ version: 'v4', auth: conf.auth });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: conf.sheetId,
    range: `${tab}!A2:A`,
  });
  const rows = response.data.values || [];
  const idx = rows.findIndex((r) => r[0] === id);
  if (idx < 0) throw new Error('Member not found.');

  const rowZeroBased = idx + 1;
  const meta = await sheets.spreadsheets.get({
    spreadsheetId: conf.sheetId,
    fields: 'sheets(properties(sheetId,title))',
  });
  const tabData = (meta.data.sheets || []).find((s) => s.properties?.title === tab);
  if (!tabData?.properties?.sheetId && tabData?.properties?.sheetId !== 0) {
    throw new Error(`${tab} tab not found.`);
  }
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: conf.sheetId,
    requestBody: {
      requests: [{
        deleteDimension: {
          range: {
            sheetId: tabData.properties.sheetId,
            dimension: 'ROWS',
            startIndex: rowZeroBased,
            endIndex: rowZeroBased + 1,
          },
        },
      }],
    },
  });
}

export async function deleteTeamMember(id: string): Promise<void> {
  await deleteMember(TEAM_TAB, id);
}

export async function deleteBoardMember(id: string): Promise<void> {
  await deleteMember(BOARD_TAB, id);
}

export async function getImpactStatsFromSheet(): Promise<ImpactStat[]> {
  const conf = buildAuth();
  if (!conf) return DEFAULT_IMPACT_STATS;
  try {
    const sheets = google.sheets({ version: 'v4', auth: conf.auth });
    await ensureTab(
      sheets,
      conf.sheetId,
      IMPACT_STATS_TAB,
      ['id', 'label', 'value', 'suffix', 'description', 'active', 'sortOrder', 'updatedAt'],
      'H',
    );
    const rows = await getRows(IMPACT_STATS_TAB, 'A2:H');
    const deduped = new Map<string, ImpactStat>();
    const timeMap = new Map<string, number>();

    for (const row of rows) {
      const id = (row[0] || '').trim();
      const label = (row[1] || '').trim();
      if (!id || !label) continue;

      const item: ImpactStat = {
        id,
        label: row[1] || '',
        value: Number(row[2] || 0),
        suffix: row[3] || '+',
        description: row[4] || '',
        active: row[5] ? toBool(row[5]) : true,
        sortOrder: Number(row[6] || 9999),
        updatedAt: row[7] || '',
      };

      const ts = Date.parse(item.updatedAt || '');
      const existingTs = timeMap.get(id) ?? Number.NEGATIVE_INFINITY;
      const effectiveTs = Number.isFinite(ts) ? ts : existingTs + 1;
      if (!deduped.has(id) || effectiveTs >= existingTs) {
        deduped.set(id, item);
        timeMap.set(id, effectiveTs);
      }
    }

    const parsed = Array.from(deduped.values()).sort((a, b) => a.sortOrder - b.sortOrder);
    return parsed.length > 0 ? parsed : DEFAULT_IMPACT_STATS;
  } catch {
    return DEFAULT_IMPACT_STATS;
  }
}

export async function getImpactStatById(id: string): Promise<ImpactStat | null> {
  const normalizedId = (id || '').trim();
  if (!normalizedId) return null;
  const stats = await getImpactStatsFromSheet();
  return stats.find((s) => (s.id || '').trim() === normalizedId) || null;
}

export async function upsertImpactStat(stat: ImpactStat): Promise<void> {
  const conf = buildAuth();
  if (!conf) throw new Error('Google Sheets is not configured.');
  const sheets = google.sheets({ version: 'v4', auth: conf.auth });
  await ensureTab(
    sheets,
    conf.sheetId,
    IMPACT_STATS_TAB,
    ['id', 'label', 'value', 'suffix', 'description', 'active', 'sortOrder', 'updatedAt'],
    'H',
  );
  const rows = await getRows(IMPACT_STATS_TAB, 'A2:H');
  let idx = -1;
  for (let i = rows.length - 1; i >= 0; i -= 1) {
    if ((rows[i]?.[0] || '').trim() === (stat.id || '').trim()) {
      idx = i;
      break;
    }
  }
  const rowData = [
    stat.id,
    stat.label,
    String(stat.value),
    stat.suffix || '+',
    stat.description || '',
    String(stat.active),
    String(stat.sortOrder),
    new Date().toISOString(),
  ];
  if (idx >= 0) {
    const rowNumber = idx + 2;
    await sheets.spreadsheets.values.update({
      spreadsheetId: conf.sheetId,
      range: `${IMPACT_STATS_TAB}!A${rowNumber}:H${rowNumber}`,
      valueInputOption: 'RAW',
      requestBody: { values: [rowData] },
    });
  } else {
    await sheets.spreadsheets.values.append({
      spreadsheetId: conf.sheetId,
      range: `${IMPACT_STATS_TAB}!A:H`,
      valueInputOption: 'RAW',
      requestBody: { values: [rowData] },
    });
  }
}

export async function upsertImpactStatsBulk(stats: ImpactStat[]): Promise<void> {
  const conf = buildAuth();
  if (!conf) throw new Error('Google Sheets is not configured.');
  const sheets = google.sheets({ version: 'v4', auth: conf.auth });
  await ensureTab(
    sheets,
    conf.sheetId,
    IMPACT_STATS_TAB,
    ['id', 'label', 'value', 'suffix', 'description', 'active', 'sortOrder', 'updatedAt'],
    'H',
  );

  const rows = await getRows(IMPACT_STATS_TAB, 'A2:H');
  const lastIndexById = new Map<string, number>();
  for (let i = 0; i < rows.length; i += 1) {
    const id = (rows[i]?.[0] || '').trim();
    if (id) lastIndexById.set(id, i);
  }

  // Keep the last payload entry per ID.
  const payloadById = new Map<string, ImpactStat>();
  for (const stat of stats) {
    const id = (stat.id || '').trim();
    const label = (stat.label || '').trim();
    if (!id || !label) continue;
    payloadById.set(id, {
      ...stat,
      id,
      label,
      suffix: (stat.suffix || '+').trim() || '+',
      value: Number.isFinite(stat.value) ? stat.value : 0,
      sortOrder: Number.isFinite(stat.sortOrder) ? stat.sortOrder : 9999,
    });
  }

  const now = new Date().toISOString();
  const updates: Array<{ range: string; values: string[][] }> = [];
  const appends: string[][] = [];

  for (const stat of payloadById.values()) {
    const rowData = [
      stat.id,
      stat.label,
      String(stat.value),
      stat.suffix || '+',
      stat.description || '',
      String(stat.active),
      String(stat.sortOrder),
      now,
    ];

    const existingIndex = lastIndexById.get(stat.id);
    if (typeof existingIndex === 'number') {
      const rowNumber = existingIndex + 2;
      updates.push({
        range: `${IMPACT_STATS_TAB}!A${rowNumber}:H${rowNumber}`,
        values: [rowData],
      });
    } else {
      appends.push(rowData);
    }
  }

  if (updates.length > 0) {
    await sheets.spreadsheets.values.batchUpdate({
      spreadsheetId: conf.sheetId,
      requestBody: {
        valueInputOption: 'RAW',
        data: updates,
      },
    });
  }

  if (appends.length > 0) {
    await sheets.spreadsheets.values.append({
      spreadsheetId: conf.sheetId,
      range: `${IMPACT_STATS_TAB}!A:H`,
      valueInputOption: 'RAW',
      requestBody: { values: appends },
    });
  }
}

export async function deleteImpactStat(id: string): Promise<void> {
  const conf = buildAuth();
  if (!conf) throw new Error('Google Sheets is not configured.');
  const sheets = google.sheets({ version: 'v4', auth: conf.auth });
  await ensureTab(
    sheets,
    conf.sheetId,
    IMPACT_STATS_TAB,
    ['id', 'label', 'value', 'suffix', 'description', 'active', 'sortOrder', 'updatedAt'],
    'H',
  );
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: conf.sheetId,
    range: `${IMPACT_STATS_TAB}!A2:A`,
  });
  const rows = response.data.values || [];
  const idx = rows.findIndex((r) => r[0] === id);
  if (idx < 0) throw new Error('Impact stat not found.');
  const rowZeroBased = idx + 1;
  const meta = await sheets.spreadsheets.get({
    spreadsheetId: conf.sheetId,
    fields: 'sheets(properties(sheetId,title))',
  });
  const tabData = (meta.data.sheets || []).find((s) => s.properties?.title === IMPACT_STATS_TAB);
  if (!tabData?.properties?.sheetId && tabData?.properties?.sheetId !== 0) {
    throw new Error(`${IMPACT_STATS_TAB} tab not found.`);
  }
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: conf.sheetId,
    requestBody: {
      requests: [{
        deleteDimension: {
          range: {
            sheetId: tabData.properties.sheetId,
            dimension: 'ROWS',
            startIndex: rowZeroBased,
            endIndex: rowZeroBased + 1,
          },
        },
      }],
    },
  });
}

function parseHighlights(value: string): string[] {
  if (!value.trim()) return [];
  return value.split('||').map((item) => item.trim()).filter(Boolean);
}

function serializeHighlights(items: string[]): string {
  return items.map((item) => item.trim()).filter(Boolean).join('||');
}

export async function getReportsFromSheet(): Promise<ManagedReport[]> {
  const conf = buildAuth();
  if (!conf) return DEFAULT_REPORTS;
  try {
    const sheets = google.sheets({ version: 'v4', auth: conf.auth });
    await ensureTab(
      sheets,
      conf.sheetId,
      REPORTS_TAB,
      ['id', 'year', 'title', 'description', 'datePublished', 'pdfUrl', 'highlights', 'thumbnail', 'active', 'sortOrder', 'updatedAt'],
      'K',
    );
    const rows = await getRows(REPORTS_TAB, 'A2:K');
    const deduped = new Map<string, ManagedReport>();
    const timeMap = new Map<string, number>();
    for (const r of rows) {
      const id = (r[0] || '').trim();
      const title = (r[2] || '').trim();
      if (!id || !title) continue;
      const report: ManagedReport = {
        id: r[0] || '',
        year: r[1] || '',
        title: r[2] || '',
        description: r[3] || '',
        datePublished: r[4] || '',
        pdfUrl: r[5] || '',
        highlights: parseHighlights(r[6] || ''),
        thumbnail: r[7] || '',
        active: r[8] ? toBool(r[8]) : true,
        sortOrder: Number(r[9] || 9999),
        updatedAt: r[10] || '',
      };
      const ts = Date.parse(report.updatedAt || '');
      const existingTs = timeMap.get(id) ?? Number.NEGATIVE_INFINITY;
      const effectiveTs = Number.isFinite(ts) ? ts : existingTs + 1;
      if (!deduped.has(id) || effectiveTs >= existingTs) {
        deduped.set(id, report);
        timeMap.set(id, effectiveTs);
      }
    }
    const reports = Array.from(deduped.values()).sort((a, b) => a.sortOrder - b.sortOrder);
    return reports.length > 0 ? reports : DEFAULT_REPORTS;
  } catch {
    return DEFAULT_REPORTS;
  }
}

export async function getReportById(id: string): Promise<ManagedReport | null> {
  const reports = await getReportsFromSheet();
  return reports.find((r) => r.id === id) || null;
}

export async function upsertReport(report: ManagedReport): Promise<void> {
  const conf = buildAuth();
  if (!conf) throw new Error('Google Sheets is not configured.');
  const sheets = google.sheets({ version: 'v4', auth: conf.auth });
  await ensureTab(
    sheets,
    conf.sheetId,
    REPORTS_TAB,
    ['id', 'year', 'title', 'description', 'datePublished', 'pdfUrl', 'highlights', 'thumbnail', 'active', 'sortOrder', 'updatedAt'],
    'K',
  );
  const rows = await getRows(REPORTS_TAB, 'A2:K');
  let idx = -1;
  for (let i = rows.length - 1; i >= 0; i -= 1) {
    if (rows[i]?.[0] === report.id) {
      idx = i;
      break;
    }
  }
  const rowData = [
    report.id,
    report.year,
    report.title,
    report.description,
    report.datePublished,
    report.pdfUrl,
    serializeHighlights(report.highlights),
    report.thumbnail || '',
    String(report.active),
    String(report.sortOrder),
    new Date().toISOString(),
  ];
  if (idx >= 0) {
    const rowNumber = idx + 2;
    await sheets.spreadsheets.values.update({
      spreadsheetId: conf.sheetId,
      range: `${REPORTS_TAB}!A${rowNumber}:K${rowNumber}`,
      valueInputOption: 'RAW',
      requestBody: { values: [rowData] },
    });
  } else {
    await sheets.spreadsheets.values.append({
      spreadsheetId: conf.sheetId,
      range: `${REPORTS_TAB}!A:K`,
      valueInputOption: 'RAW',
      requestBody: { values: [rowData] },
    });
  }
}

export async function deleteReport(id: string): Promise<void> {
  const conf = buildAuth();
  if (!conf) throw new Error('Google Sheets is not configured.');
  const sheets = google.sheets({ version: 'v4', auth: conf.auth });
  await ensureTab(
    sheets,
    conf.sheetId,
    REPORTS_TAB,
    ['id', 'year', 'title', 'description', 'datePublished', 'pdfUrl', 'highlights', 'thumbnail', 'active', 'sortOrder', 'updatedAt'],
    'K',
  );
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: conf.sheetId,
    range: `${REPORTS_TAB}!A2:A`,
  });
  const rows = response.data.values || [];
  const idx = rows.findIndex((r) => r[0] === id);
  if (idx < 0) throw new Error('Report not found.');
  const rowZeroBased = idx + 1;
  const meta = await sheets.spreadsheets.get({
    spreadsheetId: conf.sheetId,
    fields: 'sheets(properties(sheetId,title))',
  });
  const tabData = (meta.data.sheets || []).find((s) => s.properties?.title === REPORTS_TAB);
  if (!tabData?.properties?.sheetId && tabData?.properties?.sheetId !== 0) {
    throw new Error(`${REPORTS_TAB} tab not found.`);
  }
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: conf.sheetId,
    requestBody: {
      requests: [{
        deleteDimension: {
          range: {
            sheetId: tabData.properties.sheetId,
            dimension: 'ROWS',
            startIndex: rowZeroBased,
            endIndex: rowZeroBased + 1,
          },
        },
      }],
    },
  });
}

function normalizeSeo(input: Partial<SeoSettings>, fallback: SeoSettings): SeoSettings {
  return {
    pageKey: (input.pageKey || fallback.pageKey).trim(),
    title: (input.title || fallback.title).trim(),
    description: (input.description || fallback.description).trim(),
    keywords: (input.keywords || fallback.keywords).trim(),
    canonical: (input.canonical || fallback.canonical).trim(),
    ogTitle: (input.ogTitle || fallback.ogTitle).trim(),
    ogDescription: (input.ogDescription || fallback.ogDescription).trim(),
    ogImage: (input.ogImage || fallback.ogImage).trim(),
    twitterTitle: (input.twitterTitle || fallback.twitterTitle).trim(),
    twitterDescription: (input.twitterDescription || fallback.twitterDescription).trim(),
    twitterImage: (input.twitterImage || fallback.twitterImage).trim(),
    updatedAt: input.updatedAt || fallback.updatedAt || '',
  };
}

export async function getSeoSettingsFromSheet(): Promise<SeoSettings[]> {
  const conf = buildAuth();
  if (!conf) return DEFAULT_SEO_SETTINGS;
  try {
    const sheets = google.sheets({ version: 'v4', auth: conf.auth });
    await ensureTab(
      sheets,
      conf.sheetId,
      SEO_SETTINGS_TAB,
      ['pageKey', 'title', 'description', 'keywords', 'canonical', 'ogTitle', 'ogDescription', 'ogImage', 'twitterTitle', 'twitterDescription', 'twitterImage', 'updatedAt'],
      'L',
    );
    const rows = await getRows(SEO_SETTINGS_TAB, 'A2:L');
    const parsedMap = new Map<string, SeoSettings>();
    const timeMap = new Map<string, number>();
    for (const r of rows) {
      const pageKey = (r[0] || '').trim();
      if (!pageKey) continue;
      const setting: SeoSettings = {
        pageKey: r[0] || '',
        title: r[1] || '',
        description: r[2] || '',
        keywords: r[3] || '',
        canonical: r[4] || '',
        ogTitle: r[5] || '',
        ogDescription: r[6] || '',
        ogImage: r[7] || '',
        twitterTitle: r[8] || '',
        twitterDescription: r[9] || '',
        twitterImage: r[10] || '',
        updatedAt: r[11] || '',
      };
      const ts = Date.parse(setting.updatedAt || '');
      const existingTs = timeMap.get(pageKey) ?? Number.NEGATIVE_INFINITY;
      const effectiveTs = Number.isFinite(ts) ? ts : existingTs + 1;
      if (!parsedMap.has(pageKey) || effectiveTs >= existingTs) {
        parsedMap.set(pageKey, setting);
        timeMap.set(pageKey, effectiveTs);
      }
    }
    const parsed = Array.from(parsedMap.values());
    const merged = DEFAULT_SEO_SETTINGS.map((fallback) => {
      const existing = parsed.find((item) => item.pageKey === fallback.pageKey);
      return normalizeSeo(existing || {}, fallback);
    });
    return merged;
  } catch {
    return DEFAULT_SEO_SETTINGS;
  }
}

export async function getSeoSettingsByPage(pageKey: 'home' | 'donate' | 'reports'): Promise<SeoSettings> {
  const all = await getSeoSettingsFromSheet();
  const fallback = DEFAULT_SEO_SETTINGS.find((item) => item.pageKey === pageKey) || DEFAULT_SEO_SETTINGS[0];
  return normalizeSeo(all.find((item) => item.pageKey === pageKey) || {}, fallback);
}

export async function upsertSeoSettings(input: SeoSettings): Promise<void> {
  const conf = buildAuth();
  if (!conf) throw new Error('Google Sheets is not configured.');
  const sheets = google.sheets({ version: 'v4', auth: conf.auth });
  await ensureTab(
    sheets,
    conf.sheetId,
    SEO_SETTINGS_TAB,
    ['pageKey', 'title', 'description', 'keywords', 'canonical', 'ogTitle', 'ogDescription', 'ogImage', 'twitterTitle', 'twitterDescription', 'twitterImage', 'updatedAt'],
    'L',
  );
  const rows = await getRows(SEO_SETTINGS_TAB, 'A2:L');
  let idx = -1;
  for (let i = rows.length - 1; i >= 0; i -= 1) {
    if (rows[i]?.[0] === input.pageKey) {
      idx = i;
      break;
    }
  }
  const rowData = [
    input.pageKey,
    input.title,
    input.description,
    input.keywords,
    input.canonical,
    input.ogTitle,
    input.ogDescription,
    input.ogImage,
    input.twitterTitle,
    input.twitterDescription,
    input.twitterImage,
    new Date().toISOString(),
  ];
  if (idx >= 0) {
    const rowNumber = idx + 2;
    await sheets.spreadsheets.values.update({
      spreadsheetId: conf.sheetId,
      range: `${SEO_SETTINGS_TAB}!A${rowNumber}:L${rowNumber}`,
      valueInputOption: 'RAW',
      requestBody: { values: [rowData] },
    });
  } else {
    await sheets.spreadsheets.values.append({
      spreadsheetId: conf.sheetId,
      range: `${SEO_SETTINGS_TAB}!A:L`,
      valueInputOption: 'RAW',
      requestBody: { values: [rowData] },
    });
  }
}
