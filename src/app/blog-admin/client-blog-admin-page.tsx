'use client';

import { useEffect, useMemo, useState } from 'react';

type AdminPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: { name: string; role: string; avatar: string };
  date: string;
  readTime: string;
  image: string;
  image2: string;
  image3: string;
  content: string;
  published: boolean;
  updatedAt?: string;
};

type SessionUser = {
  id: string;
  email: string;
  role: 'super_admin' | 'editor' | 'viewer';
};

type AdminUserRow = {
  id: string;
  email: string;
  role: 'super_admin' | 'editor' | 'viewer';
  status: 'active' | 'disabled';
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
};

type SiteSettingsState = {
  linkedinPostUrl: string;
};

type ImpactStatState = {
  id?: string;
  label: string;
  value: number;
  suffix: string;
  description: string;
  active: boolean;
  sortOrder: number;
};

type ReportState = {
  id?: string;
  year: string;
  title: string;
  description: string;
  datePublished: string;
  pdfUrl: string;
  highlights: string;
  thumbnail: string;
  active: boolean;
  sortOrder: number;
};

type SeoSettingsState = {
  pageKey: 'home' | 'donate' | 'reports';
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
};

type AnnouncementState = {
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
};

type MemberState = {
  id?: string;
  name: string;
  title: string;
  image: string;
  linkedin: string;
  website: string;
  active: boolean;
  sortOrder: number;
};

type AuditLogRow = {
  id: string;
  timestamp: string;
  actorEmail: string;
  actorRole: string;
  action: string;
  targetType: string;
  targetId: string;
  details: string;
};

type RecycleBinRow = {
  id: string;
  entityType: 'blog_post' | 'team_member' | 'board_member' | 'admin_user';
  entityId: string;
  deletedBy: string;
  deletedAt: string;
  payload: string;
};

type InviteRow = {
  id: string;
  email: string;
  role: 'super_admin' | 'editor' | 'viewer';
  status: 'pending' | 'used' | 'expired' | 'revoked';
  expiresAt: string;
  createdAt: string;
  createdBy: string;
  usedAt?: string;
};

type RevisionRow = {
  id: string;
  timestamp: string;
  actorEmail: string;
  actorRole: string;
  entityType: string;
  entityId: string;
  action: string;
  snapshot: string;
};

type SessionLogRow = {
  id: string;
  timestamp: string;
  actorEmail: string;
  actorRole: string;
  action: string;
  targetType: string;
  targetId: string;
  details: string;
};

type AdminStatsCards = {
  posts: number;
  team: number;
  board: number;
  admins: number;
  recycle: number;
  failedLogins7d: number;
  updates7d: number;
};

type SecurityConfigState = {
  portalPath: string;
  allowlistEnabled: boolean;
  allowlistCount: number;
  currentIp: string;
  currentIpAllowed: boolean;
};

type FormState = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  image: string;
  image2: string;
  image3: string;
  content: string;
  published: boolean;
};

const EMPTY_FORM: FormState = {
  title: '',
  slug: '',
  excerpt: '',
  category: 'news',
  authorName: 'Ghana Code Club Team',
  authorRole: 'Editorial Team',
  authorAvatar: '/images/team/mentor1.jpg',
  date: '',
  readTime: '',
  image: '/images/blog/ai-workbooks.jpeg',
  image2: '/images/blog/ai-workbooks-2.jpeg',
  image3: '/images/blog/ai-workbooks-3.jpeg',
  content: '',
  published: true,
};

const EMPTY_MEMBER_FORM: MemberState = {
  name: '',
  title: '',
  image: '',
  linkedin: '',
  website: '',
  active: true,
  sortOrder: 1,
};

const EMPTY_REPORT_FORM: ReportState = {
  year: '',
  title: '',
  description: '',
  datePublished: '',
  pdfUrl: '',
  highlights: '',
  thumbnail: '',
  active: true,
  sortOrder: 1,
};

const EMPTY_SEO_FORM: SeoSettingsState = {
  pageKey: 'home',
  title: '',
  description: '',
  keywords: '',
  canonical: '',
  ogTitle: '',
  ogDescription: '',
  ogImage: '',
  twitterTitle: '',
  twitterDescription: '',
  twitterImage: '',
};

export default function ClientBlogAdminPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [adminUsers, setAdminUsers] = useState<AdminUserRow[]>([]);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserRole, setNewUserRole] = useState<'super_admin' | 'editor' | 'viewer'>('editor');
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [activeTab, setActiveTab] = useState<'posts' | 'settings' | 'impact' | 'reports' | 'seo' | 'announcement' | 'team' | 'board' | 'users' | 'logs' | 'revisions' | 'security' | 'sessions' | 'recycle'>('posts');
  const [siteSettings, setSiteSettings] = useState<SiteSettingsState>({
    linkedinPostUrl: '',
  });
  const [announcement, setAnnouncement] = useState<AnnouncementState>({
    id: 'home-announcement',
    enabled: false,
    badge: 'Upcoming Event',
    title: '',
    eventTitle: '',
    date: '',
    time: '',
    location: '',
    image: '',
    description: '',
    buttonText: 'Learn More',
    buttonUrl: '#',
  });
  const [teamMembers, setTeamMembers] = useState<MemberState[]>([]);
  const [boardMembers, setBoardMembers] = useState<MemberState[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogRow[]>([]);
  const [recycleBinEntries, setRecycleBinEntries] = useState<RecycleBinRow[]>([]);
  const [invites, setInvites] = useState<InviteRow[]>([]);
  const [revisions, setRevisions] = useState<RevisionRow[]>([]);
  const [revisionsPage, setRevisionsPage] = useState(1);
  const [revisionsTotalCount, setRevisionsTotalCount] = useState(0);
  const [revisionsTotalPages, setRevisionsTotalPages] = useState(1);
  const [revisionsLoading, setRevisionsLoading] = useState(false);
  const [revisionsSearchInput, setRevisionsSearchInput] = useState('');
  const [revisionsSearch, setRevisionsSearch] = useState('');
  const [revisionsEntityType, setRevisionsEntityType] = useState('all');
  const [sessionLogs, setSessionLogs] = useState<SessionLogRow[]>([]);
  const [sessionInvalidBefore, setSessionInvalidBefore] = useState('');
  const [stats, setStats] = useState<AdminStatsCards | null>(null);
  const [logSearch, setLogSearch] = useState('');
  const [logActionFilter, setLogActionFilter] = useState('all');
  const [logTargetFilter, setLogTargetFilter] = useState('all');
  const [recycleSearchInput, setRecycleSearchInput] = useState('');
  const [recycleSearch, setRecycleSearch] = useState('');
  const [recycleTypeFilter, setRecycleTypeFilter] = useState<'all' | RecycleBinRow['entityType']>('all');
  const [recycleFromDate, setRecycleFromDate] = useState('');
  const [recycleToDate, setRecycleToDate] = useState('');
  const [recyclePage, setRecyclePage] = useState(1);
  const [recycleTotalCount, setRecycleTotalCount] = useState(0);
  const [recycleTotalPages, setRecycleTotalPages] = useState(1);
  const [recycleLoading, setRecycleLoading] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'super_admin' | 'editor' | 'viewer'>('editor');
  const [inviteDays, setInviteDays] = useState(7);
  const [inviteLastLink, setInviteLastLink] = useState('');
  const [selectedRecycleIds, setSelectedRecycleIds] = useState<string[]>([]);
  const [teamForm, setTeamForm] = useState<MemberState>(EMPTY_MEMBER_FORM);
  const [boardForm, setBoardForm] = useState<MemberState>(EMPTY_MEMBER_FORM);
  const [impactStats, setImpactStats] = useState<ImpactStatState[]>([]);
  const [reports, setReports] = useState<ReportState[]>([]);
  const [reportsPage, setReportsPage] = useState(1);
  const [reportsTotalCount, setReportsTotalCount] = useState(0);
  const [reportsTotalPages, setReportsTotalPages] = useState(1);
  const [reportsLoading, setReportsLoading] = useState(false);
  const [reportsSearchInput, setReportsSearchInput] = useState('');
  const [reportsSearch, setReportsSearch] = useState('');
  const [reportsStatusFilter, setReportsStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [reportForm, setReportForm] = useState<ReportState>(EMPTY_REPORT_FORM);
  const [seoSettings, setSeoSettings] = useState<SeoSettingsState[]>([]);
  const [seoForm, setSeoForm] = useState<SeoSettingsState>(EMPTY_SEO_FORM);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [securityConfig, setSecurityConfig] = useState<SecurityConfigState | null>(null);

  const isEditing = useMemo(() => Boolean(form.id), [form.id]);
  const canManageUsers = user?.role === 'super_admin';
  const canEditContent = user?.role === 'super_admin' || user?.role === 'editor';
  const isViewer = user?.role === 'viewer';
  const REPORTS_PAGE_SIZE = 10;
  const REVISIONS_PAGE_SIZE = 15;
  const hasSecurityAllowlistWarning = Boolean(
    canManageUsers &&
    securityConfig?.allowlistEnabled &&
    !securityConfig.currentIpAllowed,
  );
  const filteredAuditLogs = useMemo(() => {
    const q = logSearch.trim().toLowerCase();
    return auditLogs.filter((log) => {
      const actionMatch = logActionFilter === 'all' || log.action === logActionFilter;
      const targetMatch = logTargetFilter === 'all' || log.targetType === logTargetFilter;
      const searchMatch = !q ||
        log.actorEmail.toLowerCase().includes(q) ||
        log.targetId.toLowerCase().includes(q) ||
        log.details.toLowerCase().includes(q) ||
        log.action.toLowerCase().includes(q) ||
        log.targetType.toLowerCase().includes(q);
      return actionMatch && targetMatch && searchMatch;
    });
  }, [auditLogs, logActionFilter, logTargetFilter, logSearch]);

  const logActions = useMemo(() => {
    return ['all', ...Array.from(new Set(auditLogs.map((l) => l.action))).sort()];
  }, [auditLogs]);

  const logTargets = useMemo(() => {
    return ['all', ...Array.from(new Set(auditLogs.map((l) => l.targetType))).sort()];
  }, [auditLogs]);

  function isValidHttpUrl(value: string): boolean {
    const raw = value.trim();
    if (!raw) return false;
    try {
      const u = new URL(raw);
      return u.protocol === 'http:' || u.protocol === 'https:';
    } catch {
      return false;
    }
  }

  const seoErrors = useMemo(() => {
    const errors: Partial<Record<keyof SeoSettingsState, string>> = {};
    if (!seoForm.title.trim()) errors.title = 'SEO title is required.';
    if (!seoForm.description.trim()) errors.description = 'SEO description is required.';
    if (seoForm.canonical.trim() && !isValidHttpUrl(seoForm.canonical)) errors.canonical = 'Canonical URL must be valid http(s).';
    if (seoForm.ogImage.trim() && !isValidHttpUrl(seoForm.ogImage)) errors.ogImage = 'Open Graph image URL must be valid http(s).';
    if (seoForm.twitterImage.trim() && !isValidHttpUrl(seoForm.twitterImage)) errors.twitterImage = 'Twitter image URL must be valid http(s).';
    return errors;
  }, [seoForm]);

  const RECYCLE_PAGE_SIZE = 10;

  useEffect(() => {
    void loadSessionAndData();
  }, []);

  useEffect(() => {
    if (!message.trim()) return;
    const lower = message.toLowerCase();
    const type = lower.includes('failed') || lower.includes('error') || lower.includes('forbidden') ? 'error' : 'success';
    setToast({ type, text: message });
    const timer = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(timer);
  }, [message]);

  useEffect(() => {
    if (!canManageUsers) return;
    void loadRecycleBin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canManageUsers, recycleSearch, recycleTypeFilter, recycleFromDate, recycleToDate, recyclePage]);

  useEffect(() => {
    const t = setTimeout(() => {
      setRecycleSearch(recycleSearchInput);
      setRecyclePage(1);
    }, 300);
    return () => clearTimeout(t);
  }, [recycleSearchInput]);

  useEffect(() => {
    const t = setTimeout(() => {
      setReportsSearch(reportsSearchInput);
      setReportsPage(1);
    }, 300);
    return () => clearTimeout(t);
  }, [reportsSearchInput]);

  useEffect(() => {
    const t = setTimeout(() => {
      setRevisionsSearch(revisionsSearchInput);
      setRevisionsPage(1);
    }, 300);
    return () => clearTimeout(t);
  }, [revisionsSearchInput]);

  useEffect(() => {
    if (!user) return;
    void loadReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, reportsPage, reportsSearch, reportsStatusFilter]);

  useEffect(() => {
    if (!canManageUsers) return;
    void loadRevisions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canManageUsers, revisionsPage, revisionsSearch, revisionsEntityType]);

  useEffect(() => {
    if (isViewer && activeTab !== 'posts') {
      setActiveTab('posts');
    }
  }, [isViewer, activeTab]);

  async function loadSessionAndData() {
    const meRes = await fetch('/api/admin/auth/me');
    if (!meRes.ok) {
      setUser(null);
      return;
    }
    const meData = await meRes.json();
    setUser(meData.user);
    await Promise.all([
      loadPosts(),
      loadSiteSettings(),
      loadImpactStats(),
      loadReports(),
      loadSeoSettings(),
      loadAnnouncement(),
      loadTeamMembers(),
      loadBoardMembers(),
    ]);
    if (meData.user?.role === 'super_admin') {
      await Promise.all([
        loadAdminUsers(),
        loadAuditLogs(),
        loadInvites(),
        loadRevisions(),
        loadSessions(),
        loadStats(),
        loadSecurityConfig(),
      ]);
    }
  }

  async function loadPosts() {
    setLoading(true);
    setMessage('');
    const res = await fetch('/api/blog-admin/posts');
    const data = await res.json();
    if (!res.ok) {
      setLoading(false);
      throw new Error(data.error || 'Failed to load posts.');
    }
    setPosts(data.posts || []);
    setLoading(false);
  }

  async function loadAdminUsers() {
    const res = await fetch('/api/admin/users');
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to load users.');
    setAdminUsers(data.users || []);
  }

  async function loadInvites() {
    const res = await fetch('/api/admin/invites');
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to load invites.');
    setInvites(data.invites || []);
  }

  async function loadRevisions() {
    setRevisionsLoading(true);
    const params = new URLSearchParams({
      page: String(revisionsPage),
      pageSize: String(REVISIONS_PAGE_SIZE),
    });
    const q = revisionsSearch.trim();
    if (q) params.set('q', q);
    if (revisionsEntityType !== 'all') params.set('entityType', revisionsEntityType);
    const res = await fetch(`/api/admin/revisions?${params.toString()}`);
    const data = await res.json();
    if (!res.ok) {
      setRevisionsLoading(false);
      throw new Error(data.error || 'Failed to load revisions.');
    }
    setRevisions(data.revisions || []);
    setRevisionsTotalCount(Number(data.total || 0));
    setRevisionsTotalPages(Number(data.totalPages || 1));
    setRevisionsPage(Number(data.page || 1));
    setRevisionsLoading(false);
  }

  async function loadSessions() {
    const res = await fetch('/api/admin/sessions');
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to load sessions.');
    setSessionLogs(data.authLogs || []);
    setSessionInvalidBefore(data.globalInvalidBefore || '');
  }

  async function loadStats() {
    const res = await fetch('/api/admin/stats');
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to load dashboard stats.');
    setStats(data.cards || null);
  }

  async function loadSecurityConfig() {
    const res = await fetch('/api/admin/security-config');
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to load security settings.');
    setSecurityConfig(data as SecurityConfigState);
  }

  async function loadSiteSettings() {
    const res = await fetch('/api/admin/site-settings');
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to load site settings.');
    setSiteSettings(data.settings || { linkedinPostUrl: '' });
  }

  async function loadImpactStats() {
    const res = await fetch('/api/admin/impact-stats');
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to load impact stats.');
    setImpactStats(data.stats || []);
  }

  async function loadReports() {
    setReportsLoading(true);
    const params = new URLSearchParams({
      page: String(reportsPage),
      pageSize: String(REPORTS_PAGE_SIZE),
      status: reportsStatusFilter,
    });
    const q = reportsSearch.trim();
    if (q) params.set('q', q);
    const res = await fetch(`/api/admin/reports?${params.toString()}`);
    const data = await res.json();
    if (!res.ok) {
      setReportsLoading(false);
      throw new Error(data.error || 'Failed to load reports.');
    }
    setReports((data.reports || []).map((report: ReportState & { highlights?: string[] }) => ({
      ...report,
      highlights: Array.isArray(report.highlights) ? report.highlights.join('\n') : String(report.highlights || ''),
    })));
    setReportsTotalCount(Number(data.total || 0));
    setReportsTotalPages(Number(data.totalPages || 1));
    setReportsPage(Number(data.page || 1));
    setReportsLoading(false);
  }

  async function loadSeoSettings() {
    const res = await fetch('/api/admin/seo-settings');
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to load SEO settings.');
    const settings = (data.settings || []) as SeoSettingsState[];
    setSeoSettings(settings);
    if (settings.length > 0) {
      setSeoForm(settings[0]);
    }
  }

  async function loadAnnouncement() {
    const res = await fetch('/api/admin/announcement');
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to load announcement.');
    setAnnouncement(data.announcement);
  }

  async function loadTeamMembers() {
    const res = await fetch('/api/admin/team-members');
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to load team members.');
    setTeamMembers(data.members || []);
  }

  async function loadBoardMembers() {
    const res = await fetch('/api/admin/board-members');
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to load board members.');
    setBoardMembers(data.members || []);
  }

  async function loadAuditLogs() {
    const res = await fetch('/api/admin/audit-logs?limit=300');
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to load audit logs.');
    setAuditLogs(data.logs || []);
  }

  async function loadRecycleBin() {
    setRecycleLoading(true);
    const params = new URLSearchParams({
      page: String(recyclePage),
      pageSize: String(RECYCLE_PAGE_SIZE),
    });
    const q = recycleSearch.trim();
    if (q) params.set('q', q);
    if (recycleTypeFilter !== 'all') params.set('type', recycleTypeFilter);
    if (recycleFromDate) params.set('from', recycleFromDate);
    if (recycleToDate) params.set('to', recycleToDate);

    const res = await fetch(`/api/admin/recycle-bin?${params.toString()}`);
    const data = await res.json();
    if (!res.ok) {
      setRecycleLoading(false);
      throw new Error(data.error || 'Failed to load recycle bin.');
    }
    setRecycleBinEntries(data.entries || []);
    setRecycleTotalCount(Number(data.total || 0));
    setRecycleTotalPages(Math.max(1, Number(data.totalPages || 1)));
    if (Number.isFinite(Number(data.page)) && Number(data.page) !== recyclePage) {
      setRecyclePage(Number(data.page));
    }
    setSelectedRecycleIds([]);
    setRecycleLoading(false);
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const raw = await res.text();
      let data: { error?: string; user?: SessionUser } = {};
      if (raw) {
        try {
          data = JSON.parse(raw) as { error?: string; user?: SessionUser };
        } catch {
          data = { error: `Login failed (${res.status}).` };
        }
      }
      if (!res.ok) {
        throw new Error(data.error || 'Login failed.');
      }
      if (!data.user) throw new Error('Login failed: invalid server response.');
      setUser(data.user);
      setPassword('');
      await loadSessionAndData();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Login failed.');
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    setUser(null);
    setPosts([]);
    setAdminUsers([]);
    setMessage('');
  }

  async function handleCreateUser(e: React.FormEvent) {
    e.preventDefault();
    if (!canManageUsers) return;
    setLoading(true);
    setMessage('');
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: newUserEmail,
        password: newUserPassword,
        role: newUserRole,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setLoading(false);
      setMessage(data.error || 'Failed to create user.');
      return;
    }
    setNewUserEmail('');
    setNewUserPassword('');
    setNewUserRole('editor');
    await loadAdminUsers();
    setLoading(false);
    setMessage('User created.');
  }

  async function createInvite(e: React.FormEvent) {
    e.preventDefault();
    if (!canManageUsers) return;
    setLoading(true);
    setMessage('');
    const res = await fetch('/api/admin/invites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: inviteEmail, role: inviteRole, expiresDays: inviteDays }),
    });
    const data = await res.json();
    if (!res.ok) {
      setLoading(false);
      setMessage(data.error || 'Failed to create invite.');
      return;
    }
    setInviteLastLink(String(data.inviteLink || ''));
    setInviteEmail('');
    await loadInvites();
    setLoading(false);
    setMessage('Invite created.');
  }

  async function revokeInvite(id: string) {
    const res = await fetch(`/api/admin/invites?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to revoke invite.');
  }

  async function restoreRevision(id: string) {
    const res = await fetch('/api/admin/revisions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to restore revision.');
  }

  async function revokeAllSessions() {
    const res = await fetch('/api/admin/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'revoke_all' }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to revoke sessions.');
  }

  async function updateUserRole(id: string, role: 'super_admin' | 'editor' | 'viewer') {
    const res = await fetch('/api/admin/users', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, role, status: 'active' }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update user.');
  }

  async function updateUserStatus(id: string, status: 'active' | 'disabled') {
    const res = await fetch('/api/admin/users', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update user status.');
  }

  async function resetUserPassword(id: string) {
    const pwd = prompt('Enter new password for this user:');
    if (!pwd) return;
    const res = await fetch('/api/admin/users', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, password: pwd }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to reset password.');
  }

  async function deleteUser(id: string) {
    if (!confirm('Delete this user account?')) return;
    const res = await fetch(`/api/admin/users?id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to delete user.');
  }

  async function saveSiteSettings(e: React.FormEvent) {
    e.preventDefault();
    if (!canEditContent) return;
    setLoading(true);
    setMessage('');
    const res = await fetch('/api/admin/site-settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(siteSettings),
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error || 'Failed to update site settings.');
      setLoading(false);
      return;
    }
    await loadSiteSettings();
    setMessage('Site settings updated.');
    setLoading(false);
  }

  function selectSeoPage(pageKey: SeoSettingsState['pageKey']) {
    const selected = seoSettings.find((item) => item.pageKey === pageKey);
    if (selected) {
      setSeoForm(selected);
      return;
    }
    setSeoForm({ ...EMPTY_SEO_FORM, pageKey });
  }

  async function saveSeoSettings(e: React.FormEvent) {
    e.preventDefault();
    if (!canEditContent) return;
    if (Object.keys(seoErrors).length > 0) {
      setMessage('Please fix the SEO validation errors before saving.');
      return;
    }
    setLoading(true);
    setMessage('');
    const res = await fetch('/api/admin/seo-settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(seoForm),
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error || 'Failed to update SEO settings.');
      setLoading(false);
      return;
    }
    await loadSeoSettings();
    const pageRes = await fetch(`/api/admin/seo-settings?pageKey=${encodeURIComponent(seoForm.pageKey)}`);
    const pageData = await pageRes.json().catch(() => ({}));
    if (pageRes.ok && pageData.settings) {
      setSeoForm(pageData.settings as SeoSettingsState);
    }
    setMessage('SEO settings updated.');
    setLoading(false);
  }

  async function saveImpactNumbers() {
    if (!canEditContent) return;
    setLoading(true);
    setMessage('');
    const payloads = impactStats
      .filter((stat) => stat.id)
      .map((stat) => ({
        ...stat,
        value: Number.isFinite(stat.value) ? Math.max(0, Math.round(stat.value)) : 0,
      }));
    const res = await fetch('/api/admin/impact-stats', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stats: payloads }),
    });
    const raw = await res.text();
    let data: { error?: string } = {};
    if (raw) {
      try {
        data = JSON.parse(raw) as { error?: string };
      } catch {
        data = {};
      }
    }
    if (!res.ok) {
      setMessage(data.error || `Failed to update impact numbers (HTTP ${res.status}).`);
      setLoading(false);
      return;
    }
    await loadImpactStats();
    setMessage('Impact numbers updated.');
    setLoading(false);
  }

  async function saveReport(e: React.FormEvent) {
    e.preventDefault();
    if (!canEditContent) return;
    setLoading(true);
    setMessage('');
    const method = reportForm.id ? 'PUT' : 'POST';
    const res = await fetch('/api/admin/reports', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reportForm),
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error || 'Failed to save report.');
      setLoading(false);
      return;
    }
    setReportForm(EMPTY_REPORT_FORM);
    await loadReports();
    setMessage(reportForm.id ? 'Report updated.' : 'Report created.');
    setLoading(false);
  }

  async function removeReport(id?: string) {
    if (!id || !confirm('Delete this report?')) return;
    const res = await fetch(`/api/admin/reports?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to delete report.');
    await loadReports();
  }

  async function saveAnnouncement(e: React.FormEvent) {
    e.preventDefault();
    if (!canEditContent) return;
    setLoading(true);
    setMessage('');
    const res = await fetch('/api/admin/announcement', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(announcement),
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error || 'Failed to update announcement.');
      setLoading(false);
      return;
    }
    await loadAnnouncement();
    setMessage('Homepage announcement updated.');
    setLoading(false);
  }

  async function saveTeamMember(e: React.FormEvent) {
    e.preventDefault();
    if (!canEditContent) return;
    setLoading(true);
    setMessage('');
    const method = teamForm.id ? 'PUT' : 'POST';
    const res = await fetch('/api/admin/team-members', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(teamForm),
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error || 'Failed to save team member.');
      setLoading(false);
      return;
    }
    setTeamForm(EMPTY_MEMBER_FORM);
    await loadTeamMembers();
    setMessage(teamForm.id ? 'Team member updated.' : 'Team member created.');
    setLoading(false);
  }

  async function saveBoardMember(e: React.FormEvent) {
    e.preventDefault();
    if (!canEditContent) return;
    setLoading(true);
    setMessage('');
    const method = boardForm.id ? 'PUT' : 'POST';
    const res = await fetch('/api/admin/board-members', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(boardForm),
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error || 'Failed to save board member.');
      setLoading(false);
      return;
    }
    setBoardForm(EMPTY_MEMBER_FORM);
    await loadBoardMembers();
    setMessage(boardForm.id ? 'Board member updated.' : 'Board member created.');
    setLoading(false);
  }

  async function removeTeamMember(id?: string) {
    if (!id || !confirm('Delete this team member?')) return;
    const res = await fetch(`/api/admin/team-members?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to delete team member.');
    await loadTeamMembers();
  }

  async function removeBoardMember(id?: string) {
    if (!id || !confirm('Delete this board member?')) return;
    const res = await fetch(`/api/admin/board-members?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to delete board member.');
    await loadBoardMembers();
  }

  function escapeCsv(value: string): string {
    if (value.includes(',') || value.includes('"') || value.includes('\n')) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  }

  function exportAuditLogsCsv() {
    const headers = ['timestamp', 'actorEmail', 'actorRole', 'action', 'targetType', 'targetId', 'details'];
    const lines = [
      headers.join(','),
      ...filteredAuditLogs.map((log) => [
        escapeCsv(log.timestamp || ''),
        escapeCsv(log.actorEmail || ''),
        escapeCsv(log.actorRole || ''),
        escapeCsv(log.action || ''),
        escapeCsv(log.targetType || ''),
        escapeCsv(log.targetId || ''),
        escapeCsv(log.details || ''),
      ].join(',')),
    ];
    const csv = lines.join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    a.href = url;
    a.download = `audit-logs-${timestamp}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  async function exportFullBackup() {
    try {
      const res = await fetch('/api/admin/backup/export');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to export backup.');
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      a.href = url;
      a.download = `dashboard-backup-${timestamp}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setMessage('Backup exported successfully.');
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Failed to export backup.');
    }
  }

  async function restoreRecycleItem(id: string) {
    const res = await fetch('/api/admin/recycle-bin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to restore item.');
  }

  async function purgeRecycleItem(id: string) {
    const res = await fetch(`/api/admin/recycle-bin?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to permanently delete item.');
  }

  async function bulkRestoreRecycleItems(ids: string[]) {
    for (const id of ids) {
      await restoreRecycleItem(id);
    }
  }

  async function bulkPurgeRecycleItems(ids: string[]) {
    for (const id of ids) {
      await purgeRecycleItem(id);
    }
  }

  function isRecycleSelected(id: string): boolean {
    return selectedRecycleIds.includes(id);
  }

  function toggleRecycleSelected(id: string) {
    setSelectedRecycleIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  }

  function toggleSelectAllOnRecyclePage() {
    const pageIds = recycleBinEntries.map((e) => e.id);
    const allSelected = pageIds.length > 0 && pageIds.every((id) => selectedRecycleIds.includes(id));
    if (allSelected) {
      setSelectedRecycleIds((prev) => prev.filter((id) => !pageIds.includes(id)));
    } else {
      setSelectedRecycleIds((prev) => Array.from(new Set([...prev, ...pageIds])));
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const method = isEditing ? 'PUT' : 'POST';
    const res = await fetch('/api/blog-admin/posts', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) {
      setLoading(false);
      setMessage(data.error || 'Failed to save post.');
      return;
    }

    setMessage(isEditing ? 'Post updated successfully.' : 'Post created successfully.');
    setForm(EMPTY_FORM);
    await loadPosts();
    setLoading(false);
  }

  function startEdit(p: AdminPost) {
    setForm({
      id: p.id,
      title: p.title,
      slug: p.slug || '',
      excerpt: p.excerpt || '',
      category: p.category || 'news',
      authorName: p.author?.name || 'Ghana Code Club Team',
      authorRole: p.author?.role || 'Editorial Team',
      authorAvatar: p.author?.avatar || '/images/team/mentor1.jpg',
      date: p.date || '',
      readTime: p.readTime || '',
      image: p.image || '',
      image2: p.image2 || '',
      image3: p.image3 || '',
      content: p.content || '',
      published: p.published ?? true,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function removePost(id: string) {
    if (!confirm('Delete this post?')) return;
    setLoading(true);
    const res = await fetch(`/api/blog-admin/posts?id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error || 'Failed to delete post.');
      setLoading(false);
      return;
    }
    setMessage('Post deleted.');
    await loadPosts();
    setLoading(false);
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="w-full max-w-md bg-white rounded-xl shadow p-6 space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
          <p className="text-sm text-gray-600">Log in with your assigned admin email and password.</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Admin email"
            className="w-full border rounded-lg px-3 py-2"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border rounded-lg px-3 py-2"
            required
          />
          <button disabled={loading} className="w-full bg-red-600 text-white rounded-lg py-2 font-semibold hover:bg-red-700 transition-colors disabled:opacity-50">
            Open Dashboard
          </button>
          {message && <p className="text-sm text-red-600">{message}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Manage blog posts, users and roles.</p>
              <p className="text-xs text-gray-500 mt-1">Signed in as {user.email} ({user.role})</p>
              {isViewer && (
                <p className="mt-2 inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 border border-blue-200">
                  Read-only access
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {canManageUsers && (
                <button onClick={exportFullBackup} className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">
                  Export Backup
                </button>
              )}
              <button onClick={handleLogout} className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-black">Logout</button>
            </div>
          </div>
          {canManageUsers && stats && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="rounded-lg border p-3"><p className="text-xs text-gray-500">Posts</p><p className="text-xl font-semibold">{stats.posts}</p></div>
              <div className="rounded-lg border p-3"><p className="text-xs text-gray-500">Admins</p><p className="text-xl font-semibold">{stats.admins}</p></div>
              <div className="rounded-lg border p-3"><p className="text-xs text-gray-500">Updates (7d)</p><p className="text-xl font-semibold">{stats.updates7d}</p></div>
              <div className="rounded-lg border p-3"><p className="text-xs text-gray-500">Failed Logins (7d)</p><p className="text-xl font-semibold">{stats.failedLogins7d}</p></div>
            </div>
          )}
          {hasSecurityAllowlistWarning && (
            <div className="mt-4 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800">
              Security warning: your current IP ({securityConfig?.currentIp}) is not in `ADMIN_ALLOWED_IPS`. In production, admin access may be blocked from this device.
            </div>
          )}
          <div className="mt-4 overflow-x-auto">
            <div className="flex flex-nowrap sm:flex-wrap gap-2 min-w-max sm:min-w-0 pb-1">
            <button
              onClick={() => setActiveTab('posts')}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap ${activeTab === 'posts' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Blog Posts
            </button>
            {canEditContent && (
              <>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap ${activeTab === 'settings' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                  LinkedIn Post
                </button>
                <button
                  onClick={() => setActiveTab('impact')}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap ${activeTab === 'impact' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                  Impact Stats
                </button>
                <button
                  onClick={() => setActiveTab('reports')}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap ${activeTab === 'reports' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                  Reports
                </button>
                <button
                  onClick={() => setActiveTab('seo')}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap ${activeTab === 'seo' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                  SEO
                </button>
                <button
                  onClick={() => setActiveTab('announcement')}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap ${activeTab === 'announcement' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                  Homepage Alert
                </button>
                <button
                  onClick={() => setActiveTab('team')}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap ${activeTab === 'team' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                  Team
                </button>
                <button
                  onClick={() => setActiveTab('board')}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap ${activeTab === 'board' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                  Board
                </button>
              </>
            )}
            {canManageUsers && (
              <>
                <button
                  onClick={() => setActiveTab('users')}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap ${activeTab === 'users' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                  Users & Roles
                </button>
                <button
                  onClick={() => setActiveTab('logs')}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap ${activeTab === 'logs' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                  Audit Logs
                </button>
                <button
                  onClick={() => setActiveTab('revisions')}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap ${activeTab === 'revisions' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                  Revisions
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap ${activeTab === 'security' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                  Security
                </button>
                <button
                  onClick={() => setActiveTab('sessions')}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap ${activeTab === 'sessions' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                  Sessions
                </button>
                <button
                  onClick={() => setActiveTab('recycle')}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap ${activeTab === 'recycle' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                  Recycle Bin
                </button>
              </>
            )}
            </div>
          </div>
        </div>

        {activeTab === 'posts' && (
        <>
        {!canEditContent && (
          <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-xl p-4 text-sm">
            You have viewer access. You can view posts but cannot create, edit, or delete.
          </div>
        )}
        {canEditContent && (
        <form onSubmit={handleSave} className="bg-white rounded-xl shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">{isEditing ? 'Edit Post' : 'Create New Post'}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <input className="border rounded-lg px-3 py-2" placeholder="Title *" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} required />
            <input className="border rounded-lg px-3 py-2" placeholder="Slug (optional)" value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} />
            <input className="border rounded-lg px-3 py-2" placeholder="Category (e.g. news)" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} />
            <input className="border rounded-lg px-3 py-2" placeholder="Date (e.g. February 2026)" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} />
            <input className="border rounded-lg px-3 py-2" placeholder="Read time (e.g. 4 min read)" value={form.readTime} onChange={(e) => setForm((f) => ({ ...f, readTime: e.target.value }))} />
            <input className="border rounded-lg px-3 py-2" placeholder="Author name" value={form.authorName} onChange={(e) => setForm((f) => ({ ...f, authorName: e.target.value }))} />
            <input className="border rounded-lg px-3 py-2" placeholder="Author role" value={form.authorRole} onChange={(e) => setForm((f) => ({ ...f, authorRole: e.target.value }))} />
            <input className="border rounded-lg px-3 py-2" placeholder="Author avatar URL" value={form.authorAvatar} onChange={(e) => setForm((f) => ({ ...f, authorAvatar: e.target.value }))} />
            <input className="border rounded-lg px-3 py-2" placeholder="Image URL" value={form.image} onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))} />
            <input className="border rounded-lg px-3 py-2" placeholder="Image 2 URL" value={form.image2} onChange={(e) => setForm((f) => ({ ...f, image2: e.target.value }))} />
            <input className="border rounded-lg px-3 py-2" placeholder="Image 3 URL" value={form.image3} onChange={(e) => setForm((f) => ({ ...f, image3: e.target.value }))} />
          </div>
          <textarea className="w-full border rounded-lg px-3 py-2" rows={3} placeholder="Excerpt" value={form.excerpt} onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))} />
          <textarea className="w-full border rounded-lg px-3 py-2" rows={12} placeholder="Post content *" value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))} required />
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.published} onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))} />
            Published
          </label>
          <div className="flex gap-3">
            <button disabled={loading} className="bg-red-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50">
              {isEditing ? 'Update Post' : 'Create Post'}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={() => setForm(EMPTY_FORM)}
                className="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg font-semibold hover:bg-gray-300"
              >
                Cancel Edit
              </button>
            )}
          </div>
          {message && <p className="text-sm text-gray-700">{message}</p>}
        </form>
        )}

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Existing Posts ({posts.length})</h2>
          <div className="space-y-3">
            {posts.map((p) => (
              <div key={p.id} className="border rounded-lg p-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <p className="font-semibold text-gray-900">{p.title}</p>
                  <p className="text-xs text-gray-500">{p.slug} | {p.category} | {p.published ? 'Published' : 'Draft'}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {canEditContent && (
                    <>
                      <button onClick={() => startEdit(p)} className="px-3 py-1.5 rounded bg-blue-600 text-white text-sm">Edit</button>
                      <button onClick={() => removePost(p.id)} className="px-3 py-1.5 rounded bg-red-600 text-white text-sm">Delete</button>
                    </>
                  )}
                </div>
              </div>
            ))}
            {posts.length === 0 && <p className="text-sm text-gray-500">No posts in sheet yet.</p>}
          </div>
        </div>
        </>
        )}

        {activeTab === 'settings' && (
          <form onSubmit={saveSiteSettings} className="bg-white rounded-xl shadow p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">LinkedIn Post Settings</h2>
            <input
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Paste LinkedIn post URL only"
              value={siteSettings.linkedinPostUrl}
              onChange={(e) => setSiteSettings((s) => ({ ...s, linkedinPostUrl: e.target.value }))}
              disabled={!canEditContent}
            />
            <p className="text-xs text-gray-500">You only need the LinkedIn post link. The embed URL updates automatically.</p>
            {canEditContent && (
              <button disabled={loading} className="bg-red-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50">
                Save LinkedIn Settings
              </button>
            )}
            {message && <p className="text-sm text-gray-700">{message}</p>}
          </form>
        )}

        {activeTab === 'impact' && (
          <div className="bg-white rounded-xl shadow p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Update Impact Numbers</h2>
            <p className="text-sm text-gray-600">Edit only the numeric values below and save.</p>
            <div className="space-y-3">
              {impactStats.map((stat, index) => (
                <div key={stat.id || index} className="border rounded-lg p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <p className="font-semibold text-gray-900">{stat.label}</p>
                    <p className="text-xs text-gray-500">{stat.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={0}
                      className="w-36 border rounded-lg px-3 py-2"
                      value={stat.value}
                      onChange={(e) => {
                        const value = Number(e.target.value || 0);
                        setImpactStats((prev) => prev.map((item, i) => i === index ? { ...item, value } : item));
                      }}
                      disabled={!canEditContent}
                    />
                    <span className="text-gray-500 text-sm">{stat.suffix || '+'}</span>
                  </div>
                </div>
              ))}
              {impactStats.length === 0 && <p className="text-sm text-gray-500">No impact stats found.</p>}
            </div>
            {canEditContent && (
              <button onClick={saveImpactNumbers} disabled={loading} className="bg-red-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50">
                Save Numbers
              </button>
            )}
            {message && <p className="text-sm text-gray-700">{message}</p>}
          </div>
        )}

        {activeTab === 'reports' && (
          <>
            {canEditContent && (
              <form onSubmit={saveReport} className="bg-white rounded-xl shadow p-6 space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">{reportForm.id ? 'Edit Report' : 'Add Report'}</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  <input className="border rounded-lg px-3 py-2" placeholder="Year (e.g. 2026)" value={reportForm.year} onChange={(e) => setReportForm((r) => ({ ...r, year: e.target.value }))} required />
                  <input className="border rounded-lg px-3 py-2" placeholder="Title" value={reportForm.title} onChange={(e) => setReportForm((r) => ({ ...r, title: e.target.value }))} required />
                  <input className="border rounded-lg px-3 py-2" placeholder="Published date (YYYY-MM-DD)" value={reportForm.datePublished} onChange={(e) => setReportForm((r) => ({ ...r, datePublished: e.target.value }))} required />
                  <input type="number" className="border rounded-lg px-3 py-2" placeholder="Sort order" value={reportForm.sortOrder} onChange={(e) => setReportForm((r) => ({ ...r, sortOrder: Number(e.target.value || 1) }))} />
                  <input className="border rounded-lg px-3 py-2 md:col-span-2" placeholder="PDF URL (e.g. /reports/file.pdf)" value={reportForm.pdfUrl} onChange={(e) => setReportForm((r) => ({ ...r, pdfUrl: e.target.value }))} required />
                  <input className="border rounded-lg px-3 py-2 md:col-span-2" placeholder="Thumbnail URL (optional)" value={reportForm.thumbnail} onChange={(e) => setReportForm((r) => ({ ...r, thumbnail: e.target.value }))} />
                </div>
                <textarea className="w-full border rounded-lg px-3 py-2" rows={3} placeholder="Description" value={reportForm.description} onChange={(e) => setReportForm((r) => ({ ...r, description: e.target.value }))} />
                <textarea className="w-full border rounded-lg px-3 py-2" rows={4} placeholder="Highlights (one per line)" value={reportForm.highlights} onChange={(e) => setReportForm((r) => ({ ...r, highlights: e.target.value }))} />
                <label className="inline-flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={reportForm.active} onChange={(e) => setReportForm((r) => ({ ...r, active: e.target.checked }))} />
                  Active
                </label>
                <div className="flex gap-2">
                  <button disabled={loading} className="bg-red-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50">
                    {reportForm.id ? 'Update Report' : 'Add Report'}
                  </button>
                  {reportForm.id && (
                    <button type="button" onClick={() => setReportForm(EMPTY_REPORT_FORM)} className="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg font-semibold hover:bg-gray-300">
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            )}
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Reports ({reportsTotalCount})</h2>
                <div className="flex flex-wrap gap-2">
                  <input
                    className="border rounded-lg px-3 py-2 text-sm"
                    placeholder="Search reports..."
                    value={reportsSearchInput}
                    onChange={(e) => setReportsSearchInput(e.target.value)}
                  />
                  <select
                    className="border rounded-lg px-3 py-2 text-sm"
                    value={reportsStatusFilter}
                    onChange={(e) => {
                      setReportsStatusFilter(e.target.value as 'all' | 'active' | 'inactive');
                      setReportsPage(1);
                    }}
                  >
                    <option value="all">all status</option>
                    <option value="active">active</option>
                    <option value="inactive">inactive</option>
                  </select>
                </div>
              </div>
              <div className="space-y-3">
                {reportsLoading && <p className="text-xs text-gray-500">Loading reports...</p>}
                {reports.map((report) => (
                  <div key={report.id} className="border rounded-lg p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      {report.thumbnail ? (
                        <img src={report.thumbnail} alt={report.title} className="w-12 h-12 rounded object-cover border border-gray-100 shrink-0" />
                      ) : (
                        <div className="w-12 h-12 rounded bg-gray-100 border border-gray-100 shrink-0" />
                      )}
                      <div className="min-w-0">
                      <p className="font-semibold text-gray-900">{report.title}</p>
                      <p className="text-xs text-gray-500 truncate">{report.year} | {report.pdfUrl}</p>
                      </div>
                    </div>
                    {canEditContent && (
                      <div className="flex flex-wrap gap-2">
                        <a href={report.pdfUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded bg-gray-700 text-white text-sm">Open</a>
                        <button onClick={() => setReportForm(report)} className="px-3 py-1.5 rounded bg-blue-600 text-white text-sm">Edit</button>
                        <button onClick={async () => {
                          try {
                            await removeReport(report.id);
                            setMessage('Report deleted.');
                          } catch (err) {
                            setMessage(err instanceof Error ? err.message : 'Failed to delete report.');
                          }
                        }} className="px-3 py-1.5 rounded bg-red-600 text-white text-sm">Delete</button>
                      </div>
                    )}
                  </div>
                ))}
                {reports.length === 0 && <p className="text-sm text-gray-500">No reports yet.</p>}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs text-gray-500">Page {reportsPage} of {reportsTotalPages}</p>
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1.5 rounded bg-gray-200 text-gray-800 text-sm disabled:opacity-50"
                    disabled={reportsPage <= 1}
                    onClick={() => setReportsPage((p) => Math.max(1, p - 1))}
                  >
                    Prev
                  </button>
                  <button
                    className="px-3 py-1.5 rounded bg-gray-200 text-gray-800 text-sm disabled:opacity-50"
                    disabled={reportsPage >= reportsTotalPages}
                    onClick={() => setReportsPage((p) => Math.min(reportsTotalPages, p + 1))}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'seo' && (
          <form onSubmit={saveSeoSettings} className="bg-white rounded-xl shadow p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">SEO Settings</h2>
            <p className="text-sm text-gray-600">Update page SEO metadata. Changes will reflect on the selected page automatically.</p>
            <div className="grid md:grid-cols-2 gap-3">
              <select
                className="border rounded-lg px-3 py-2"
                value={seoForm.pageKey}
                onChange={(e) => selectSeoPage(e.target.value as SeoSettingsState['pageKey'])}
                disabled={!canEditContent}
              >
                <option value="home">Homepage</option>
                <option value="donate">Donate Page</option>
                <option value="reports">Reports Page</option>
              </select>
              <div>
                <input className="w-full border rounded-lg px-3 py-2" placeholder="Canonical URL" value={seoForm.canonical} onChange={(e) => setSeoForm((s) => ({ ...s, canonical: e.target.value }))} disabled={!canEditContent} />
                {seoErrors.canonical && <p className="text-xs text-red-600 mt-1">{seoErrors.canonical}</p>}
              </div>
              <div className="md:col-span-2">
                <input className="w-full border rounded-lg px-3 py-2" placeholder="SEO Title" value={seoForm.title} onChange={(e) => setSeoForm((s) => ({ ...s, title: e.target.value }))} disabled={!canEditContent} />
                {seoErrors.title && <p className="text-xs text-red-600 mt-1">{seoErrors.title}</p>}
              </div>
              <div className="md:col-span-2">
                <textarea className="w-full border rounded-lg px-3 py-2" rows={3} placeholder="SEO Description" value={seoForm.description} onChange={(e) => setSeoForm((s) => ({ ...s, description: e.target.value }))} disabled={!canEditContent} />
                {seoErrors.description && <p className="text-xs text-red-600 mt-1">{seoErrors.description}</p>}
              </div>
              <input className="border rounded-lg px-3 py-2 md:col-span-2" placeholder="Keywords (comma separated)" value={seoForm.keywords} onChange={(e) => setSeoForm((s) => ({ ...s, keywords: e.target.value }))} disabled={!canEditContent} />
              <input className="border rounded-lg px-3 py-2" placeholder="Open Graph Title" value={seoForm.ogTitle} onChange={(e) => setSeoForm((s) => ({ ...s, ogTitle: e.target.value }))} disabled={!canEditContent} />
              <div>
                <input className="w-full border rounded-lg px-3 py-2" placeholder="Open Graph Image URL" value={seoForm.ogImage} onChange={(e) => setSeoForm((s) => ({ ...s, ogImage: e.target.value }))} disabled={!canEditContent} />
                {seoErrors.ogImage && <p className="text-xs text-red-600 mt-1">{seoErrors.ogImage}</p>}
              </div>
              <textarea className="border rounded-lg px-3 py-2 md:col-span-2" rows={3} placeholder="Open Graph Description" value={seoForm.ogDescription} onChange={(e) => setSeoForm((s) => ({ ...s, ogDescription: e.target.value }))} disabled={!canEditContent} />
              <input className="border rounded-lg px-3 py-2" placeholder="Twitter Title" value={seoForm.twitterTitle} onChange={(e) => setSeoForm((s) => ({ ...s, twitterTitle: e.target.value }))} disabled={!canEditContent} />
              <div>
                <input className="w-full border rounded-lg px-3 py-2" placeholder="Twitter Image URL" value={seoForm.twitterImage} onChange={(e) => setSeoForm((s) => ({ ...s, twitterImage: e.target.value }))} disabled={!canEditContent} />
                {seoErrors.twitterImage && <p className="text-xs text-red-600 mt-1">{seoErrors.twitterImage}</p>}
              </div>
              <textarea className="border rounded-lg px-3 py-2 md:col-span-2" rows={3} placeholder="Twitter Description" value={seoForm.twitterDescription} onChange={(e) => setSeoForm((s) => ({ ...s, twitterDescription: e.target.value }))} disabled={!canEditContent} />
            </div>
            {canEditContent && (
              <button disabled={loading || Object.keys(seoErrors).length > 0} className="bg-red-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50">
                Save SEO Settings
              </button>
            )}
            {message && <p className="text-sm text-gray-700">{message}</p>}
          </form>
        )}

        {activeTab === 'announcement' && (
          <form onSubmit={saveAnnouncement} className="bg-white rounded-xl shadow p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Homepage Alert / Modal</h2>
            <label className="inline-flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={announcement.enabled}
                onChange={(e) => setAnnouncement((a) => ({ ...a, enabled: e.target.checked }))}
                disabled={!canEditContent}
              />
              Enable modal on homepage
            </label>
            <div className="grid md:grid-cols-2 gap-3">
              <input className="border rounded-lg px-3 py-2" placeholder="Badge (e.g. Upcoming Event)" value={announcement.badge} onChange={(e) => setAnnouncement((a) => ({ ...a, badge: e.target.value }))} disabled={!canEditContent} />
              <input className="border rounded-lg px-3 py-2" placeholder="Modal title" value={announcement.title} onChange={(e) => setAnnouncement((a) => ({ ...a, title: e.target.value }))} disabled={!canEditContent} />
              <input className="border rounded-lg px-3 py-2" placeholder="Event title" value={announcement.eventTitle} onChange={(e) => setAnnouncement((a) => ({ ...a, eventTitle: e.target.value }))} disabled={!canEditContent} />
              <input className="border rounded-lg px-3 py-2" placeholder="Date" value={announcement.date} onChange={(e) => setAnnouncement((a) => ({ ...a, date: e.target.value }))} disabled={!canEditContent} />
              <input className="border rounded-lg px-3 py-2" placeholder="Time" value={announcement.time} onChange={(e) => setAnnouncement((a) => ({ ...a, time: e.target.value }))} disabled={!canEditContent} />
              <input className="border rounded-lg px-3 py-2" placeholder="Location" value={announcement.location} onChange={(e) => setAnnouncement((a) => ({ ...a, location: e.target.value }))} disabled={!canEditContent} />
              <input className="border rounded-lg px-3 py-2" placeholder="Image URL" value={announcement.image} onChange={(e) => setAnnouncement((a) => ({ ...a, image: e.target.value }))} disabled={!canEditContent} />
              <input className="border rounded-lg px-3 py-2" placeholder="Button text" value={announcement.buttonText} onChange={(e) => setAnnouncement((a) => ({ ...a, buttonText: e.target.value }))} disabled={!canEditContent} />
              <input className="border rounded-lg px-3 py-2 md:col-span-2" placeholder="Button URL" value={announcement.buttonUrl} onChange={(e) => setAnnouncement((a) => ({ ...a, buttonUrl: e.target.value }))} disabled={!canEditContent} />
            </div>
            <textarea className="w-full border rounded-lg px-3 py-2" rows={6} placeholder="Description (you can use line breaks)" value={announcement.description} onChange={(e) => setAnnouncement((a) => ({ ...a, description: e.target.value }))} disabled={!canEditContent} />
            {canEditContent && (
              <button disabled={loading} className="bg-red-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50">
                Save Homepage Alert
              </button>
            )}
            {message && <p className="text-sm text-gray-700">{message}</p>}
          </form>
        )}

        {activeTab === 'team' && (
          <>
            {canEditContent && (
              <form onSubmit={saveTeamMember} className="bg-white rounded-xl shadow p-6 space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">{teamForm.id ? 'Edit Team Member' : 'Add Team Member'}</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  <input className="border rounded-lg px-3 py-2" placeholder="Name" value={teamForm.name} onChange={(e) => setTeamForm((m) => ({ ...m, name: e.target.value }))} required />
                  <input className="border rounded-lg px-3 py-2" placeholder="Title/Role" value={teamForm.title} onChange={(e) => setTeamForm((m) => ({ ...m, title: e.target.value }))} />
                  <input className="border rounded-lg px-3 py-2" placeholder="Image path or URL" value={teamForm.image} onChange={(e) => setTeamForm((m) => ({ ...m, image: e.target.value }))} />
                  <input className="border rounded-lg px-3 py-2" placeholder="LinkedIn URL" value={teamForm.linkedin} onChange={(e) => setTeamForm((m) => ({ ...m, linkedin: e.target.value }))} />
                  <input className="border rounded-lg px-3 py-2" placeholder="Website URL" value={teamForm.website} onChange={(e) => setTeamForm((m) => ({ ...m, website: e.target.value }))} />
                  <input type="number" className="border rounded-lg px-3 py-2" placeholder="Sort order" value={teamForm.sortOrder} onChange={(e) => setTeamForm((m) => ({ ...m, sortOrder: Number(e.target.value || 1) }))} />
                </div>
                <label className="inline-flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={teamForm.active} onChange={(e) => setTeamForm((m) => ({ ...m, active: e.target.checked }))} />
                  Active
                </label>
                <div className="flex gap-2">
                  <button disabled={loading} className="bg-red-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50">
                    {teamForm.id ? 'Update Team Member' : 'Add Team Member'}
                  </button>
                  {teamForm.id && (
                    <button type="button" onClick={() => setTeamForm(EMPTY_MEMBER_FORM)} className="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg font-semibold hover:bg-gray-300">
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            )}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Team Members ({teamMembers.length})</h2>
              <div className="space-y-3">
                {teamMembers.map((member) => (
                  <div key={member.id} className="border rounded-lg p-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <p className="font-semibold text-gray-900">{member.name}</p>
                      <p className="text-xs text-gray-500">{member.title}</p>
                    </div>
                    {canEditContent && (
                      <div className="flex gap-2">
                        <button onClick={() => setTeamForm(member)} className="px-3 py-1.5 rounded bg-blue-600 text-white text-sm">Edit</button>
                        <button onClick={async () => {
                          try {
                            await removeTeamMember(member.id);
                            setMessage('Team member deleted.');
                          } catch (err) {
                            setMessage(err instanceof Error ? err.message : 'Failed to delete team member.');
                          }
                        }} className="px-3 py-1.5 rounded bg-red-600 text-white text-sm">Delete</button>
                      </div>
                    )}
                  </div>
                ))}
                {teamMembers.length === 0 && <p className="text-sm text-gray-500">No team members in the sheet yet.</p>}
              </div>
            </div>
          </>
        )}

        {activeTab === 'board' && (
          <>
            {canEditContent && (
              <form onSubmit={saveBoardMember} className="bg-white rounded-xl shadow p-6 space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">{boardForm.id ? 'Edit Board Member' : 'Add Board Member'}</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  <input className="border rounded-lg px-3 py-2" placeholder="Name" value={boardForm.name} onChange={(e) => setBoardForm((m) => ({ ...m, name: e.target.value }))} required />
                  <input className="border rounded-lg px-3 py-2" placeholder="Title/Role" value={boardForm.title} onChange={(e) => setBoardForm((m) => ({ ...m, title: e.target.value }))} />
                  <input className="border rounded-lg px-3 py-2" placeholder="Image path or URL" value={boardForm.image} onChange={(e) => setBoardForm((m) => ({ ...m, image: e.target.value }))} />
                  <input className="border rounded-lg px-3 py-2" placeholder="LinkedIn URL" value={boardForm.linkedin} onChange={(e) => setBoardForm((m) => ({ ...m, linkedin: e.target.value }))} />
                  <input className="border rounded-lg px-3 py-2" placeholder="Website URL" value={boardForm.website} onChange={(e) => setBoardForm((m) => ({ ...m, website: e.target.value }))} />
                  <input type="number" className="border rounded-lg px-3 py-2" placeholder="Sort order" value={boardForm.sortOrder} onChange={(e) => setBoardForm((m) => ({ ...m, sortOrder: Number(e.target.value || 1) }))} />
                </div>
                <label className="inline-flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={boardForm.active} onChange={(e) => setBoardForm((m) => ({ ...m, active: e.target.checked }))} />
                  Active
                </label>
                <div className="flex gap-2">
                  <button disabled={loading} className="bg-red-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50">
                    {boardForm.id ? 'Update Board Member' : 'Add Board Member'}
                  </button>
                  {boardForm.id && (
                    <button type="button" onClick={() => setBoardForm(EMPTY_MEMBER_FORM)} className="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg font-semibold hover:bg-gray-300">
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            )}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Board Members ({boardMembers.length})</h2>
              <div className="space-y-3">
                {boardMembers.map((member) => (
                  <div key={member.id} className="border rounded-lg p-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <p className="font-semibold text-gray-900">{member.name}</p>
                      <p className="text-xs text-gray-500">{member.title}</p>
                    </div>
                    {canEditContent && (
                      <div className="flex gap-2">
                        <button onClick={() => setBoardForm(member)} className="px-3 py-1.5 rounded bg-blue-600 text-white text-sm">Edit</button>
                        <button onClick={async () => {
                          try {
                            await removeBoardMember(member.id);
                            setMessage('Board member deleted.');
                          } catch (err) {
                            setMessage(err instanceof Error ? err.message : 'Failed to delete board member.');
                          }
                        }} className="px-3 py-1.5 rounded bg-red-600 text-white text-sm">Delete</button>
                      </div>
                    )}
                  </div>
                ))}
                {boardMembers.length === 0 && <p className="text-sm text-gray-500">No board members in the sheet yet.</p>}
              </div>
            </div>
          </>
        )}

        {activeTab === 'users' && canManageUsers && (
          <>
            <form onSubmit={handleCreateUser} className="bg-white rounded-xl shadow p-6 space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Create Admin User</h2>
              <div className="grid md:grid-cols-3 gap-3">
                <input
                  type="email"
                  className="border rounded-lg px-3 py-2"
                  placeholder="email@domain.com"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  className="border rounded-lg px-3 py-2"
                  placeholder="Temporary password"
                  value={newUserPassword}
                  onChange={(e) => setNewUserPassword(e.target.value)}
                  required
                />
                <select
                  className="border rounded-lg px-3 py-2"
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value as 'super_admin' | 'editor' | 'viewer')}
                >
                  <option value="editor">editor</option>
                  <option value="viewer">viewer</option>
                  <option value="super_admin">super_admin</option>
                </select>
              </div>
              <button disabled={loading} className="bg-red-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50">
                Create User
              </button>
              {message && <p className="text-sm text-gray-700">{message}</p>}
            </form>

            <form onSubmit={createInvite} className="bg-white rounded-xl shadow p-6 space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Invite Admin User</h2>
              <div className="grid md:grid-cols-4 gap-3">
                <input
                  type="email"
                  className="border rounded-lg px-3 py-2"
                  placeholder="invitee@domain.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  required
                />
                <select
                  className="border rounded-lg px-3 py-2"
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as 'super_admin' | 'editor' | 'viewer')}
                >
                  <option value="editor">editor</option>
                  <option value="viewer">viewer</option>
                  <option value="super_admin">super_admin</option>
                </select>
                <input
                  type="number"
                  min={1}
                  max={30}
                  className="border rounded-lg px-3 py-2"
                  value={inviteDays}
                  onChange={(e) => setInviteDays(Number(e.target.value || 7))}
                />
                <button disabled={loading} className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50">
                  Create Invite
                </button>
              </div>
              {inviteLastLink && (
                <div className="text-sm">
                  <p className="text-gray-600 mb-1">Latest invite link:</p>
                  <div className="flex flex-wrap gap-2 items-center">
                    <code className="bg-gray-100 px-2 py-1 rounded">{inviteLastLink}</code>
                    <button
                      type="button"
                      className="px-2 py-1 rounded bg-gray-800 text-white"
                      onClick={async () => {
                        await navigator.clipboard.writeText(inviteLastLink);
                        setMessage('Invite link copied.');
                      }}
                    >
                      Copy
                    </button>
                  </div>
                </div>
              )}
              <div className="space-y-2">
                {invites.slice(0, 10).map((invite) => (
                  <div key={invite.id} className="border rounded p-2 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <p className="text-sm text-gray-700">
                      {invite.email} | {invite.role} | {invite.status} | expires {invite.expiresAt || '-'}
                    </p>
                    <button
                      type="button"
                      disabled={invite.status !== 'pending'}
                      className="px-3 py-1.5 rounded bg-amber-600 text-white text-sm disabled:opacity-50"
                      onClick={async () => {
                        try {
                          await revokeInvite(invite.id);
                          await loadInvites();
                          setMessage('Invite revoked.');
                        } catch (err) {
                          setMessage(err instanceof Error ? err.message : 'Failed to revoke invite.');
                        }
                      }}
                    >
                      Revoke
                    </button>
                  </div>
                ))}
              </div>
            </form>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Admin Accounts ({adminUsers.length})</h2>
              <div className="space-y-3">
                {adminUsers.map((u) => (
                  <div key={u.id} className="border rounded-lg p-3 flex flex-col gap-3">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <p className="font-semibold text-gray-900">{u.email}</p>
                        <p className="text-xs text-gray-500">role: {u.role} | status: {u.status}</p>
                        <p className="text-xs text-gray-500">last login: {u.lastLoginAt || 'never'}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <select
                          className="border rounded px-2 py-1 text-sm"
                          value={u.role}
                          onChange={async (e) => {
                            try {
                              await updateUserRole(u.id, e.target.value as 'super_admin' | 'editor' | 'viewer');
                              await loadAdminUsers();
                              setMessage('User role updated.');
                            } catch (err) {
                              setMessage(err instanceof Error ? err.message : 'Failed to update role.');
                            }
                          }}
                        >
                          <option value="viewer">viewer</option>
                          <option value="editor">editor</option>
                          <option value="super_admin">super_admin</option>
                        </select>
                        <button
                          className="bg-amber-600 text-white px-3 py-1.5 rounded text-sm"
                          onClick={async () => {
                            try {
                              await updateUserStatus(u.id, u.status === 'active' ? 'disabled' : 'active');
                              await loadAdminUsers();
                              setMessage('User status updated.');
                            } catch (err) {
                              setMessage(err instanceof Error ? err.message : 'Failed to update status.');
                            }
                          }}
                        >
                          {u.status === 'active' ? 'Disable' : 'Enable'}
                        </button>
                        <button
                          className="bg-blue-600 text-white px-3 py-1.5 rounded text-sm"
                          onClick={async () => {
                            try {
                              await resetUserPassword(u.id);
                              setMessage('Password reset.');
                            } catch (err) {
                              setMessage(err instanceof Error ? err.message : 'Failed to reset password.');
                            }
                          }}
                        >
                          Reset Password
                        </button>
                        <button
                          className="bg-red-600 text-white px-3 py-1.5 rounded text-sm"
                          onClick={async () => {
                            try {
                              await deleteUser(u.id);
                              await loadAdminUsers();
                              setMessage('User deleted.');
                            } catch (err) {
                              setMessage(err instanceof Error ? err.message : 'Failed to delete user.');
                            }
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {adminUsers.length === 0 && (
                  <p className="text-sm text-gray-500">No admin users yet. Create one above.</p>
                )}
              </div>
            </div>
          </>
        )}

        {activeTab === 'logs' && canManageUsers && (
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex flex-col gap-4 mb-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <h2 className="text-xl font-semibold text-gray-900">Audit Logs ({filteredAuditLogs.length})</h2>
                <div className="flex gap-2">
                  <button
                    onClick={exportAuditLogsCsv}
                    className="px-3 py-1.5 rounded bg-emerald-600 text-white text-sm"
                  >
                    Export CSV
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        await loadAuditLogs();
                        setMessage('Audit logs refreshed.');
                      } catch (err) {
                        setMessage(err instanceof Error ? err.message : 'Failed to load logs.');
                      }
                    }}
                    className="px-3 py-1.5 rounded bg-gray-800 text-white text-sm"
                  >
                    Refresh
                  </button>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-3">
                <input
                  className="border rounded-lg px-3 py-2"
                  placeholder="Search actor, action, target, details..."
                  value={logSearch}
                  onChange={(e) => setLogSearch(e.target.value)}
                />
                <select
                  className="border rounded-lg px-3 py-2"
                  value={logActionFilter}
                  onChange={(e) => setLogActionFilter(e.target.value)}
                >
                  {logActions.map((action) => (
                    <option key={action} value={action}>{action}</option>
                  ))}
                </select>
                <select
                  className="border rounded-lg px-3 py-2"
                  value={logTargetFilter}
                  onChange={(e) => setLogTargetFilter(e.target.value)}
                >
                  {logTargets.map((target) => (
                    <option key={target} value={target}>{target}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="space-y-3">
              {filteredAuditLogs.map((log) => (
                <div key={log.id} className="border rounded-lg p-3">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <p className="text-sm font-semibold text-gray-900">
                      {log.action.toUpperCase()} {log.targetType}
                    </p>
                    <p className="text-xs text-gray-500">{log.timestamp || '-'}</p>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    by {log.actorEmail} ({log.actorRole}) | target: {log.targetId}
                  </p>
                  <p className="text-sm text-gray-700 mt-2">{log.details}</p>
                </div>
              ))}
              {filteredAuditLogs.length === 0 && <p className="text-sm text-gray-500">No audit entries found for the current filters.</p>}
            </div>
          </div>
        )}

        {activeTab === 'revisions' && canManageUsers && (
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex flex-col gap-3 mb-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <h2 className="text-xl font-semibold text-gray-900">Revisions ({revisionsTotalCount})</h2>
                <button
                  onClick={async () => {
                    try {
                      await loadRevisions();
                      setMessage('Revisions refreshed.');
                    } catch (err) {
                      setMessage(err instanceof Error ? err.message : 'Failed to refresh revisions.');
                    }
                  }}
                  className="px-3 py-1.5 rounded bg-gray-800 text-white text-sm"
                >
                  Refresh
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                <input
                  className="border rounded-lg px-3 py-2 text-sm"
                  placeholder="Search revisions..."
                  value={revisionsSearchInput}
                  onChange={(e) => setRevisionsSearchInput(e.target.value)}
                />
                <select
                  className="border rounded-lg px-3 py-2 text-sm"
                  value={revisionsEntityType}
                  onChange={(e) => {
                    setRevisionsEntityType(e.target.value);
                    setRevisionsPage(1);
                  }}
                >
                  <option value="all">all types</option>
                  <option value="blog_post">blog_post</option>
                  <option value="team_member">team_member</option>
                  <option value="board_member">board_member</option>
                  <option value="site_settings">site_settings</option>
                  <option value="homepage_announcement">homepage_announcement</option>
                  <option value="impact_stat">impact_stat</option>
                  <option value="report">report</option>
                  <option value="seo_settings">seo_settings</option>
                  <option value="admin_user">admin_user</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              {revisionsLoading && <p className="text-xs text-gray-500">Loading revisions...</p>}
              {revisions.map((rev) => (
                <div key={rev.id} className="border rounded p-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <p className="font-semibold text-gray-900">{rev.entityType} | {rev.entityId}</p>
                    <p className="text-xs text-gray-500">{rev.action} by {rev.actorEmail} on {rev.timestamp}</p>
                  </div>
                  <button
                    className="px-3 py-1.5 rounded bg-blue-600 text-white text-sm"
                    onClick={async () => {
                      if (!confirm('Restore this revision? Current data will be overwritten.')) return;
                      try {
                        await restoreRevision(rev.id);
                        await Promise.all([
                          loadPosts(),
                          loadTeamMembers(),
                          loadBoardMembers(),
                          loadSiteSettings(),
                          loadImpactStats(),
                          loadReports(),
                          loadSeoSettings(),
                          loadAnnouncement(),
                          loadAdminUsers(),
                          loadRevisions(),
                        ]);
                        setMessage('Revision restored.');
                      } catch (err) {
                        setMessage(err instanceof Error ? err.message : 'Failed to restore revision.');
                      }
                    }}
                  >
                    Restore
                  </button>
                </div>
              ))}
              {revisions.length === 0 && <p className="text-sm text-gray-500">No revisions available yet.</p>}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs text-gray-500">Page {revisionsPage} of {revisionsTotalPages}</p>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1.5 rounded bg-gray-200 text-gray-800 text-sm disabled:opacity-50"
                  disabled={revisionsPage <= 1}
                  onClick={() => setRevisionsPage((p) => Math.max(1, p - 1))}
                >
                  Prev
                </button>
                <button
                  className="px-3 py-1.5 rounded bg-gray-200 text-gray-800 text-sm disabled:opacity-50"
                  disabled={revisionsPage >= revisionsTotalPages}
                  onClick={() => setRevisionsPage((p) => Math.min(revisionsTotalPages, p + 1))}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sessions' && canManageUsers && (
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Session Management</h2>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1.5 rounded bg-gray-800 text-white text-sm"
                  onClick={async () => {
                    try {
                      await loadSessions();
                      setMessage('Sessions refreshed.');
                    } catch (err) {
                      setMessage(err instanceof Error ? err.message : 'Failed to refresh sessions.');
                    }
                  }}
                >
                  Refresh
                </button>
                <button
                  className="px-3 py-1.5 rounded bg-red-700 text-white text-sm"
                  onClick={async () => {
                    if (!confirm('Revoke all active admin sessions?')) return;
                    try {
                      await revokeAllSessions();
                      await loadSessions();
                      setMessage('All sessions revoked.');
                    } catch (err) {
                      setMessage(err instanceof Error ? err.message : 'Failed to revoke sessions.');
                    }
                  }}
                >
                  Log Out All Devices
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3">Global session invalid before: {sessionInvalidBefore || 'not set'}</p>
            <div className="space-y-2">
              {sessionLogs.map((log) => (
                <div key={log.id} className="border rounded p-2">
                  <p className="text-sm font-semibold text-gray-800">{log.action} | {log.targetType}</p>
                  <p className="text-xs text-gray-600">{log.timestamp} | {log.actorEmail} | {log.details}</p>
                </div>
              ))}
              {sessionLogs.length === 0 && <p className="text-sm text-gray-500">No session/security logs found.</p>}
            </div>
          </div>
        )}

        {activeTab === 'security' && canManageUsers && (
          <div className="bg-white rounded-xl shadow p-6 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <h2 className="text-xl font-semibold text-gray-900">Security Settings</h2>
              <button
                className="px-3 py-1.5 rounded bg-gray-800 text-white text-sm"
                onClick={async () => {
                  try {
                    await loadSecurityConfig();
                    setMessage('Security settings refreshed.');
                  } catch (err) {
                    setMessage(err instanceof Error ? err.message : 'Failed to refresh security settings.');
                  }
                }}
              >
                Refresh
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="rounded-lg border p-3">
                <p className="text-xs text-gray-500">Admin portal path</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">{securityConfig?.portalPath || 'loading...'}</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs text-gray-500">IP allowlist</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">
                  {securityConfig?.allowlistEnabled ? `Enabled (${securityConfig.allowlistCount} IPs)` : 'Disabled'}
                </p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs text-gray-500">Current request IP</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">{securityConfig?.currentIp || 'loading...'}</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs text-gray-500">Current IP in allowlist</p>
                <p className={`text-sm font-semibold mt-1 ${securityConfig?.currentIpAllowed ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {securityConfig?.allowlistEnabled
                    ? (securityConfig.currentIpAllowed ? 'Yes' : 'No')
                    : 'Not required (allowlist off)'}
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800">
              These values are read-only in dashboard and come from environment variables:
              <span className="font-mono"> ADMIN_PORTAL_PATH </span>
              and
              <span className="font-mono"> ADMIN_ALLOWED_IPS</span>.
            </div>

            {securityConfig?.allowlistEnabled && !securityConfig.currentIpAllowed && (
              <div className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800">
                Preflight warning: deploying with this allowlist may block your current device from admin access.
              </div>
            )}
          </div>
        )}

        {activeTab === 'recycle' && canManageUsers && (
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex flex-col gap-4 mb-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <h2 className="text-xl font-semibold text-gray-900">Recycle Bin ({recycleTotalCount})</h2>
                <div className="flex gap-2">
                  <button
                    onClick={async () => {
                      try {
                        await loadRecycleBin();
                        setMessage('Recycle bin refreshed.');
                      } catch (err) {
                        setMessage(err instanceof Error ? err.message : 'Failed to refresh recycle bin.');
                      }
                    }}
                    className="px-3 py-1.5 rounded bg-gray-800 text-white text-sm"
                  >
                    Refresh
                  </button>
                  <button
                    onClick={toggleSelectAllOnRecyclePage}
                    className="px-3 py-1.5 rounded bg-gray-200 text-gray-800 text-sm"
                  >
                    Toggle Page Select
                  </button>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-3">
                <input
                  className="border rounded-lg px-3 py-2"
                  placeholder="Search type/id/deleted by..."
                  value={recycleSearchInput}
                  onChange={(e) => setRecycleSearchInput(e.target.value)}
                />
                <select
                  className="border rounded-lg px-3 py-2"
                  value={recycleTypeFilter}
                  onChange={(e) => {
                    setRecycleTypeFilter(e.target.value as 'all' | RecycleBinRow['entityType']);
                    setRecyclePage(1);
                  }}
                >
                  <option value="all">all types</option>
                  <option value="blog_post">blog_post</option>
                  <option value="team_member">team_member</option>
                  <option value="board_member">board_member</option>
                  <option value="admin_user">admin_user</option>
                </select>
                <input
                  type="date"
                  className="border rounded-lg px-3 py-2"
                  value={recycleFromDate}
                  onChange={(e) => {
                    setRecycleFromDate(e.target.value);
                    setRecyclePage(1);
                  }}
                />
                <input
                  type="date"
                  className="border rounded-lg px-3 py-2"
                  value={recycleToDate}
                  onChange={(e) => {
                    setRecycleToDate(e.target.value);
                    setRecyclePage(1);
                  }}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={async () => {
                    if (selectedRecycleIds.length === 0) return;
                    try {
                      await bulkRestoreRecycleItems(selectedRecycleIds);
                      await Promise.all([loadRecycleBin(), loadPosts(), loadTeamMembers(), loadBoardMembers(), loadSiteSettings(), loadImpactStats(), loadReports(), loadSeoSettings(), loadAnnouncement(), loadAdminUsers()]);
                      setMessage('Selected items restored.');
                    } catch (err) {
                      setMessage(err instanceof Error ? err.message : 'Bulk restore failed.');
                    }
                  }}
                  className="px-3 py-1.5 rounded bg-blue-600 text-white text-sm disabled:opacity-50"
                  disabled={selectedRecycleIds.length === 0}
                >
                  Restore Selected ({selectedRecycleIds.length})
                </button>
                <button
                  onClick={async () => {
                    if (selectedRecycleIds.length === 0) return;
                    if (!confirm('Permanently purge selected recycle bin items?')) return;
                    try {
                      await bulkPurgeRecycleItems(selectedRecycleIds);
                      await loadRecycleBin();
                      setMessage('Selected items permanently removed.');
                    } catch (err) {
                      setMessage(err instanceof Error ? err.message : 'Bulk purge failed.');
                    }
                  }}
                  className="px-3 py-1.5 rounded bg-red-600 text-white text-sm disabled:opacity-50"
                  disabled={selectedRecycleIds.length === 0}
                >
                  Purge Selected ({selectedRecycleIds.length})
                </button>
              </div>
            </div>
            <div className="space-y-3">
              {recycleLoading && <p className="text-xs text-gray-500">Loading recycle bin...</p>}
              {recycleBinEntries.map((entry) => (
                <div key={entry.id} className="border rounded-lg p-3 flex flex-col gap-3">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={isRecycleSelected(entry.id)}
                        onChange={() => toggleRecycleSelected(entry.id)}
                        className="mt-1"
                      />
                      <div>
                      <p className="font-semibold text-gray-900">{entry.entityType} | {entry.entityId}</p>
                      <p className="text-xs text-gray-500">Deleted by {entry.deletedBy} on {entry.deletedAt || '-'}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={async () => {
                          try {
                            await restoreRecycleItem(entry.id);
                            await Promise.all([loadRecycleBin(), loadPosts(), loadTeamMembers(), loadBoardMembers(), loadSiteSettings(), loadImpactStats(), loadReports(), loadSeoSettings(), loadAnnouncement(), loadAdminUsers()]);
                            setMessage('Item restored from recycle bin.');
                          } catch (err) {
                            setMessage(err instanceof Error ? err.message : 'Failed to restore item.');
                          }
                        }}
                        className="px-3 py-1.5 rounded bg-blue-600 text-white text-sm"
                      >
                        Restore
                      </button>
                      <button
                        onClick={async () => {
                          if (!confirm('Permanently delete this recycle bin item?')) return;
                          try {
                            await purgeRecycleItem(entry.id);
                            await loadRecycleBin();
                            setMessage('Recycle bin item permanently removed.');
                          } catch (err) {
                            setMessage(err instanceof Error ? err.message : 'Failed to permanently remove item.');
                          }
                        }}
                        className="px-3 py-1.5 rounded bg-red-600 text-white text-sm"
                      >
                        Purge
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {recycleBinEntries.length === 0 && <p className="text-sm text-gray-500">No recycle bin items found for current filters.</p>}
              <div className="flex items-center justify-between pt-2">
                <p className="text-xs text-gray-500">
                  Page {recyclePage} of {recycleTotalPages}
                </p>
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1.5 rounded bg-gray-200 text-gray-800 text-sm disabled:opacity-50"
                    disabled={recyclePage <= 1}
                    onClick={() => setRecyclePage((p) => Math.max(1, p - 1))}
                  >
                    Prev
                  </button>
                  <button
                    className="px-3 py-1.5 rounded bg-gray-200 text-gray-800 text-sm disabled:opacity-50"
                    disabled={recyclePage >= recycleTotalPages}
                    onClick={() => setRecyclePage((p) => Math.min(recycleTotalPages, p + 1))}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {toast && (
        <div className="fixed top-4 right-4 z-[100]">
          <div className={`px-4 py-3 rounded-lg shadow-lg text-sm text-white ${toast.type === 'error' ? 'bg-red-600' : 'bg-emerald-600'}`}>
            {toast.text}
          </div>
        </div>
      )}
    </div>
  );
}
