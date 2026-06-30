"use client";

import React, { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import {
  ArrowUpRight,
  Users,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  MousePointerClick,
  FileText,
  Activity,
  Smartphone,
  BarChart3,
  Music,
  Globe,
  Trophy,
} from "lucide-react";

const IG_DATA = [
  { week: "Mar 23 (W1)", ig_views: 1316, ig_reach: 549, ig_followers: 0, ig_interactions: 40, ig_visits: 113, ig_link_clicks: 0, ig_likes: 22, ig_shares: 4, ig_comments: 2, ig_saves: 1, ig_posts: 3, ig_reels: 0, ig_carousels: 0, ig_images: 3, ig_new_follows: 3 },
  { week: "Mar 30 (W2)", ig_views: 2283, ig_reach: 1081, ig_followers: 3, ig_interactions: 83, ig_visits: 175, ig_link_clicks: 0, ig_likes: 59, ig_shares: 8, ig_comments: 5, ig_saves: 0, ig_posts: 2, ig_reels: 1, ig_carousels: 0, ig_images: 1, ig_new_follows: 3 },
  { week: "Apr 6 (W3)", ig_views: 607, ig_reach: 378, ig_followers: 7, ig_interactions: 13, ig_visits: 74, ig_link_clicks: 0, ig_likes: 0, ig_shares: 0, ig_comments: 0, ig_saves: 0, ig_posts: 0, ig_reels: 0, ig_carousels: 0, ig_images: 0, ig_new_follows: 0 },
  { week: "Apr 13 (W4)", ig_views: 2370, ig_reach: 1153, ig_followers: 14, ig_interactions: 62, ig_visits: 98, ig_link_clicks: 4, ig_likes: 42, ig_shares: 8, ig_comments: 0, ig_saves: 4, ig_posts: 2, ig_reels: 0, ig_carousels: 2, ig_images: 0, ig_new_follows: 0 },
  { week: "Apr 20 (W5)", ig_views: 2478, ig_reach: 1006, ig_followers: 23, ig_interactions: 59, ig_visits: 88, ig_link_clicks: 0, ig_likes: 36, ig_shares: 8, ig_comments: 1, ig_saves: 0, ig_posts: 2, ig_reels: 1, ig_carousels: 0, ig_images: 1, ig_new_follows: 0 },
  { week: "Apr 27 (W6)", ig_views: 2203, ig_reach: 960, ig_followers: 30, ig_interactions: 62, ig_visits: 84, ig_link_clicks: 0, ig_likes: 25, ig_shares: 7, ig_comments: 0, ig_saves: 3, ig_posts: 1, ig_reels: 0, ig_carousels: 1, ig_images: 0, ig_new_follows: 1 },
  { week: "May 4 (W7)", ig_views: 642, ig_reach: 178, ig_followers: 34, ig_interactions: 13, ig_visits: 42, ig_link_clicks: 0, ig_likes: 0, ig_shares: 0, ig_comments: 0, ig_saves: 0, ig_posts: 0, ig_reels: 0, ig_carousels: 0, ig_images: 0, ig_new_follows: 0 },
  { week: "May 11 (W8)", ig_views: 286, ig_reach: 77, ig_followers: 37, ig_interactions: 1, ig_visits: 24, ig_link_clicks: 0, ig_likes: 0, ig_shares: 0, ig_comments: 0, ig_saves: 0, ig_posts: 0, ig_reels: 0, ig_carousels: 0, ig_images: 0, ig_new_follows: 0 },
  { week: "May 18 (W9)", ig_views: 2755, ig_reach: 1966, ig_followers: 49, ig_interactions: 122, ig_visits: 55, ig_link_clicks: 0, ig_likes: 90, ig_shares: 7, ig_comments: 3, ig_saves: 0, ig_posts: 1, ig_reels: 1, ig_carousels: 0, ig_images: 0, ig_new_follows: 3 },
  { week: "May 25 (W10)", ig_views: 71, ig_reach: 41, ig_followers: 55, ig_interactions: 1, ig_visits: 12, ig_link_clicks: 0, ig_likes: 0, ig_shares: 0, ig_comments: 0, ig_saves: 0, ig_posts: 0, ig_reels: 0, ig_carousels: 0, ig_images: 0, ig_new_follows: 0 },
  { week: "Jun 1 (W11)", ig_views: 993, ig_reach: 511, ig_followers: 60, ig_interactions: 34, ig_visits: 46, ig_link_clicks: 0, ig_likes: 24, ig_shares: 2, ig_comments: 0, ig_saves: 1, ig_posts: 1, ig_reels: 0, ig_carousels: 1, ig_images: 0, ig_new_follows: 0 },
  { week: "Jun 8 (W12)", ig_views: 34, ig_reach: 13, ig_followers: 64, ig_interactions: 2, ig_visits: 8, ig_link_clicks: 0, ig_likes: 0, ig_shares: 0, ig_comments: 0, ig_saves: 0, ig_posts: 0, ig_reels: 0, ig_carousels: 0, ig_images: 0, ig_new_follows: 0 },
  { week: "Jun 15 (W13)", ig_views: 22, ig_reach: 11, ig_followers: 67, ig_interactions: 0, ig_visits: 13, ig_link_clicks: 0, ig_likes: 0, ig_shares: 0, ig_comments: 0, ig_saves: 0, ig_posts: 0, ig_reels: 0, ig_carousels: 0, ig_images: 0, ig_new_follows: 0 },
  { week: "Jun 22 (W14)", ig_views: 15, ig_reach: 10, ig_followers: 69, ig_interactions: 0, ig_visits: 10, ig_link_clicks: 0, ig_likes: 0, ig_shares: 0, ig_comments: 0, ig_saves: 0, ig_posts: 0, ig_reels: 0, ig_carousels: 0, ig_images: 0, ig_new_follows: 0 },
  { week: "Jun 29 (W15)", ig_views: 3, ig_reach: 1, ig_followers: 70, ig_interactions: 0, ig_visits: 0, ig_link_clicks: 0, ig_likes: 0, ig_shares: 0, ig_comments: 0, ig_saves: 0, ig_posts: 0, ig_reels: 0, ig_carousels: 0, ig_images: 0, ig_new_follows: 0 },
];

const TT_DATA = [
  { week: "Mar 30 (W1)", tt_views: 1149, tt_profile_views: 66, tt_followers: 16, tt_likes: 42, tt_comments: 8, tt_shares: 1, tt_new_followers: 16, tt_videos: 1 },
  { week: "Apr 6 (W2)", tt_views: 277, tt_profile_views: 31, tt_followers: 20, tt_likes: 8, tt_comments: 0, tt_shares: 0, tt_new_followers: 4, tt_videos: 0 },
  { week: "Apr 13 (W3)", tt_views: 87, tt_profile_views: 8, tt_followers: 24, tt_likes: 1, tt_comments: 0, tt_shares: 0, tt_new_followers: 4, tt_videos: 0 },
  { week: "Apr 20 (W4)", tt_views: 967, tt_profile_views: 46, tt_followers: 32, tt_likes: 27, tt_comments: 7, tt_shares: 0, tt_new_followers: 8, tt_videos: 1 },
  { week: "Apr 27 (W5)", tt_views: 143, tt_profile_views: 7, tt_followers: 33, tt_likes: 3, tt_comments: 0, tt_shares: 2, tt_new_followers: 1, tt_videos: 0 },
  { week: "May 4 (W6)", tt_views: 105, tt_profile_views: 11, tt_followers: 34, tt_likes: 2, tt_comments: 0, tt_shares: 3, tt_new_followers: 1, tt_videos: 0 },
  { week: "May 11 (W7)", tt_views: 90, tt_profile_views: 9, tt_followers: 34, tt_likes: 2, tt_comments: 0, tt_shares: 0, tt_new_followers: 0, tt_videos: 0 },
  { week: "May 18 (W8)", tt_views: 1554, tt_profile_views: 62, tt_followers: 49, tt_likes: 66, tt_comments: 5, tt_shares: 6, tt_new_followers: 15, tt_videos: 2 },
  { week: "May 25 (W9)", tt_views: 531, tt_profile_views: 28, tt_followers: 53, tt_likes: 11, tt_comments: 0, tt_shares: 1, tt_new_followers: 4, tt_videos: 0 },
  { week: "Jun 1 (W10)", tt_views: 319, tt_profile_views: 21, tt_followers: 55, tt_likes: 7, tt_comments: 0, tt_shares: 2, tt_new_followers: 2, tt_videos: 0 },
  { week: "Jun 8 (W11)", tt_views: 634, tt_profile_views: 21, tt_followers: 58, tt_likes: 31, tt_comments: 0, tt_shares: 0, tt_new_followers: 3, tt_videos: 1 },
  { week: "Jun 15 (W12)", tt_views: 2746, tt_profile_views: 35, tt_followers: 61, tt_likes: 155, tt_comments: 0, tt_shares: 4, tt_new_followers: 3, tt_videos: 0 },
  { week: "Jun 22 (W13)", tt_views: 724, tt_profile_views: 11, tt_followers: 64, tt_likes: 30, tt_comments: 0, tt_shares: 0, tt_new_followers: 3, tt_videos: 0 },
];
// test
const WEB_DATA = [
  { week: "Mar 23 (W1)", web_active_users: 0, web_new_users: 0, web_engagement_time: 0, web_page_views: 0, web_sessions: 0, web_engagement_events: 0, web_scrolls: 0 },
  { week: "Mar 30 (W2)", web_active_users: 0, web_new_users: 0, web_engagement_time: 0, web_page_views: 0, web_sessions: 0, web_engagement_events: 0, web_scrolls: 0 },
  { week: "Apr 6 (W3)", web_active_users: 0, web_new_users: 0, web_engagement_time: 0, web_page_views: 0, web_sessions: 0, web_engagement_events: 0, web_scrolls: 0 },
  { week: "Apr 13 (W4)", web_active_users: 0, web_new_users: 0, web_engagement_time: 0, web_page_views: 0, web_sessions: 0, web_engagement_events: 0, web_scrolls: 0 },
  { week: "Apr 20 (W5)", web_active_users: 0, web_new_users: 0, web_engagement_time: 0, web_page_views: 0, web_sessions: 0, web_engagement_events: 0, web_scrolls: 0 },
  { week: "Apr 27 (W6)", web_active_users: 0, web_new_users: 0, web_engagement_time: 0, web_page_views: 0, web_sessions: 0, web_engagement_events: 0, web_scrolls: 0 },
  { week: "May 4 (W7)", web_active_users: 0, web_new_users: 0, web_engagement_time: 0, web_page_views: 0, web_sessions: 0, web_engagement_events: 0, web_scrolls: 0 },
  { week: "May 11 (W8)", web_active_users: 0, web_new_users: 0, web_engagement_time: 0, web_page_views: 0, web_sessions: 0, web_engagement_events: 0, web_scrolls: 0 },
  { week: "May 18 (W9)", web_active_users: 0, web_new_users: 0, web_engagement_time: 0, web_page_views: 0, web_sessions: 0, web_engagement_events: 0, web_scrolls: 0 },
  { week: "May 25 (W10)", web_active_users: 0, web_new_users: 0, web_engagement_time: 0, web_page_views: 0, web_sessions: 0, web_engagement_events: 0, web_scrolls: 0 },
  { week: "Jun 1 (W11)", web_active_users: 0, web_new_users: 0, web_engagement_time: 0, web_page_views: 0, web_sessions: 0, web_engagement_events: 0, web_scrolls: 0 },
  { week: "Jun 8 (W12)", web_active_users: 352, web_new_users: 352, web_engagement_time: 280, web_page_views: 350, web_sessions: 348, web_engagement_events: 220, web_scrolls: 2 },
  { week: "Jun 15 (W13)", web_active_users: 433, web_new_users: 153, web_engagement_time: 180, web_page_views: 110, web_sessions: 110, web_engagement_events: 70, web_scrolls: 1 },
  { week: "Jun 22 (W14)", web_active_users: 497, web_new_users: 31, web_engagement_time: 120, web_page_views: 60, web_sessions: 60, web_engagement_events: 40, web_scrolls: 1 },
  { week: "Jun 29 (W15)", web_active_users: 516, web_new_users: 3, web_engagement_time: 80, web_page_views: 26, web_sessions: 26, web_engagement_events: 15, web_scrolls: 0 },
];

const ALL_POSTS = [
  { date: "2026-03-27", type: "Image", desc: "Pstt... Ngerasa skill IT kalian jalan di tempat", views: 193, likes: 7, shares: 0, comments: 0, saves: 0, follows: 0 },
  { date: "2026-03-27", type: "Image", desc: "Cuma bisa teorinya doang, pas praktik bingung?", views: 329, likes: 7, shares: 0, comments: 0, saves: 1, follows: 0 },
  { date: "2026-03-27", type: "Image", desc: "🚨ALERT!!! Buat kalian yang masih baru mulai belajar coding", views: 1149, likes: 8, shares: 4, comments: 2, saves: 0, follows: 3 },
  { date: "2026-04-01", type: "Reel", desc: "Udah bosan dan bingung belajar sendirian?", views: 1803, likes: 25, shares: 5, comments: 0, saves: 0, follows: 0 },
  { date: "2026-04-01", type: "Image", desc: "Halo teman-teman! Lagi pengen upgrade skill", views: 961, likes: 34, shares: 3, comments: 5, saves: 0, follows: 3 },
  { date: "2026-04-17", type: "Carousel", desc: "Halo, Sobatizen! Sering ngerasa stuck ngerjain project", views: 1145, likes: 18, shares: 3, comments: 0, saves: 0, follows: 0 },
  { date: "2026-04-19", type: "Carousel", desc: "Waktu ngoding malah stuck? Tenang Sobatizen", views: 1568, likes: 24, shares: 5, comments: 0, saves: 4, follows: 0 },
  { date: "2026-04-20", type: "Image", desc: "Promo spesial launching SobatTi lagi berlangsung nih!", views: 1408, likes: 25, shares: 7, comments: 1, saves: 0, follows: 0 },
  { date: "2026-04-25", type: "Reel", desc: "Promo spesial launching SobatTi (video)", views: 344, likes: 11, shares: 1, comments: 0, saves: 0, follows: 0 },
  { date: "2026-04-27", type: "Carousel", desc: "Pernah ga sih muak sama hasil generate AI", views: 1563, likes: 25, shares: 7, comments: 0, saves: 3, follows: 1 },
  { date: "2026-05-21", type: "Reel", desc: "kalau codingnya udah ga kekontrol project nya", views: 2704, likes: 90, shares: 7, comments: 3, saves: 0, follows: 3 },
  { date: "2026-06-01", type: "Carousel", desc: "Terlalu lama cari ikon? Bingung cek kontras warna?", views: 804, likes: 24, shares: 2, comments: 0, saves: 1, follows: 0 },
];

const ALL_VIDEOS = [
  { date: "2026-04-02", title: "Buat kalian yang masih bingung skill IT masih gitu gitu aja", views: 1884, likes: 52, comments: 8, shares: 4 },
  { date: "2026-04-21", title: "jangan sampai kelewatan promo spesial dari kita guys", views: 1270, likes: 33, comments: 7, shares: 2 },
  { date: "2026-05-18", title: "guys minsob mau ngucapin makasih banyak buat review baiknya", views: 506, likes: 16, comments: 3, shares: 1 },
  { date: "2026-05-21", title: "aman yaa kita udah jago kontrol kok guys", views: 1845, likes: 68, comments: 2, shares: 5 },
  { date: "2026-06-13", title: "tenang aja sobatti ready 24/7 buat bantu tugas, tubes maupun project kalian loh", views: 3566, likes: 200, comments: 0, shares: 4 },
];

const COLORS = {
  blue: "#024885",
  orange: "#EB6003",
  dark: "#0a0b0d",
  muted: "#8c92a0",
  teal: "#0D9488",
  purple: "#7C3AED",
  pink: "#DB2777",
  lightBlue: "#3b82f6",
  lightOrange: "#f97316",
  lightTeal: "#14b8a6",
};

type Platform = "instagram" | "tiktok" | "web";

const igTopPost = ALL_POSTS.reduce((best, p) => p.views > (best?.views || 0) ? p : best);
const ttTopVideo = ALL_VIDEOS.reduce((best, v) => v.views > (best?.views || 0) ? v : best);

const totalIgViews = IG_DATA.reduce((a, c) => a + c.ig_views, 0);
const totalIgReach = IG_DATA.reduce((a, c) => a + c.ig_reach, 0);
const totalIgLikes = IG_DATA.reduce((a, c) => a + c.ig_likes, 0);
const totalIgVisits = IG_DATA.reduce((a, c) => a + c.ig_visits, 0);
const totalIgPosts = IG_DATA.reduce((a, c) => a + c.ig_posts, 0);
const totalIgShares = IG_DATA.reduce((a, c) => a + c.ig_shares, 0);
const totalIgComments = IG_DATA.reduce((a, c) => a + c.ig_comments, 0);
const totalIgNewFollows = IG_DATA.reduce((a, c) => a + c.ig_new_follows, 0);

const totalTtViews = TT_DATA.reduce((a, c) => a + c.tt_views, 0);
const totalTtProfileViews = TT_DATA.reduce((a, c) => a + c.tt_profile_views, 0);
const totalTtLikes = TT_DATA.reduce((a, c) => a + c.tt_likes, 0);
const totalTtComments = TT_DATA.reduce((a, c) => a + c.tt_comments, 0);
const totalTtShares = TT_DATA.reduce((a, c) => a + c.tt_shares, 0);
const totalTtNewFollowers = TT_DATA.reduce((a, c) => a + c.tt_new_followers, 0);

const igLatest = IG_DATA[IG_DATA.length - 1];
const ttLatest = TT_DATA[TT_DATA.length - 1];
const webLatest = WEB_DATA[WEB_DATA.length - 1];
const webTotalActiveUsers = WEB_DATA.reduce((a, d) => a + d.web_new_users, 0);
const webTotalPageViews = WEB_DATA.reduce((a, d) => a + d.web_page_views, 0);
const webTotalSessions = WEB_DATA.reduce((a, d) => a + d.web_sessions, 0);
const webTotalNewUsers = WEB_DATA.reduce((a, d) => a + d.web_new_users, 0);
const webTotalEngagementEvents = WEB_DATA.reduce((a, d) => a + d.web_engagement_events, 0);
const webTotalScrolls = WEB_DATA.reduce((a, d) => a + d.web_scrolls, 0);

// Peak chart data with growth percentage
function computePeakEntry<T extends Record<string, any>>(
  data: T[],
  key: string,
  label: string
): { label: string; value: number; week: string; growth: number | null } {
  const peak = data.reduce((a: any, b: any) => Number(b[key]) > Number(a[key]) ? b : a)
  const idx = data.findIndex((d: any) => d.week === peak.week)
  const prevVal = idx > 0 ? Number((data as any)[idx - 1][key]) : 0
  const value = Number(peak[key])
  const growth = idx > 0 && prevVal !== 0 ? ((value - prevVal) / prevVal) * 100 : null
  return { label, value, week: peak.week, growth }
}

const igPeakChartData = [
  computePeakEntry(IG_DATA, "ig_views", "Views"),
  computePeakEntry(IG_DATA, "ig_reach", "Reach"),
  computePeakEntry(IG_DATA, "ig_likes", "Likes"),
  computePeakEntry(IG_DATA, "ig_shares", "Shares"),
  computePeakEntry(IG_DATA, "ig_comments", "Comments"),
  computePeakEntry(IG_DATA, "ig_interactions", "Interactions"),
  computePeakEntry(IG_DATA, "ig_visits", "Profile Visits"),
  computePeakEntry(IG_DATA, "ig_link_clicks", "Link Clicks"),
]

const ttPeakChartData = [
  computePeakEntry(TT_DATA, "tt_views", "Views"),
  computePeakEntry(TT_DATA, "tt_profile_views", "Profile Views"),
  computePeakEntry(TT_DATA, "tt_likes", "Likes"),
  computePeakEntry(TT_DATA, "tt_comments", "Comments"),
  computePeakEntry(TT_DATA, "tt_shares", "Shares"),
  computePeakEntry(TT_DATA, "tt_new_followers", "New Followers"),
]

const webPeakChartData = [
  computePeakEntry(WEB_DATA, "web_active_users", "Active Users"),
  computePeakEntry(WEB_DATA, "web_new_users", "New Users"),
  computePeakEntry(WEB_DATA, "web_page_views", "Page Views"),
  computePeakEntry(WEB_DATA, "web_sessions", "Sessions"),
  computePeakEntry(WEB_DATA, "web_engagement_time", "Engagement Time"),
  computePeakEntry(WEB_DATA, "web_engagement_events", "Engagement Events"),
]

const webChannels = [
  { channel: "Direct", users: 531 },
  { channel: "Organic Social", users: 6 },
  { channel: "Organic Search", users: 2 },
];
const webCountries = [
  { country: "Indonesia", users: 510 },
  { country: "United States", users: 3 },
  { country: "India", users: 2 },
  { country: "Canada", users: 1 },
  { country: "Germany", users: 1 },
  { country: "Ecuador", users: 1 },
  { country: "Philippines", users: 1 },
  { country: "Sweden", users: 1 },
];
const webRetention = [
  { cohort: "May 17—23", w0: 0, w1: 0, w2: 0, w3: 0, w4: 0, w5: 0 },
  { cohort: "May 24—30", w0: 0, w1: 0, w2: 0, w3: 0, w4: 0, w5: -1 },
  { cohort: "May 31—Jun 6", w0: 0, w1: 0, w2: 0, w3: 0, w4: -1, w5: -1 },
  { cohort: "Jun 7—13", w0: 512, w1: 0, w2: 0, w3: -1, w4: -1, w5: -1 },
  { cohort: "Jun 14—20", w0: 9, w1: 0, w2: -1, w3: -1, w4: -1, w5: -1 },
  { cohort: "Jun 21—27", w0: 17, w1: -1, w2: -1, w3: -1, w4: -1, w5: -1 },
];

function DeltaTooltip({ active, payload, label, data: chartData }: any) {
  if (active && payload && payload.length && chartData) {
    const idx = chartData.findIndex((d: any) => d.week === label)
    const prev = idx > 0 ? chartData[idx - 1] : null
    return (
      <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-lg min-w-[220px]">
        <p className="font-semibold text-gray-800 mb-2">{label}</p>
        {prev && <p className="text-[11px] text-gray-400 mb-2">vs {prev.week}</p>}
        <div className="flex flex-col gap-1.5">
          {payload.map((entry: any, i: number) => {
            const val = entry.value
            const key = entry.dataKey
            let delta = null
            if (prev && prev[key] !== undefined) {
              const diff = val - prev[key]
              const pct = prev[key] !== 0 ? (diff / prev[key]) * 100 : null
              if (diff > 0) {
                const pctStr = pct !== null ? `(+${pct.toFixed(1)}%)` : ""
                delta = <span className="text-emerald-600 font-semibold ml-2">+{diff.toLocaleString()} <span className="text-emerald-500 text-[11px]">{pctStr}</span></span>
              } else if (diff < 0) {
                const pctStr = pct !== null ? `(${pct.toFixed(1)}%)` : ""
                delta = <span className="text-red-500 font-semibold ml-2">{diff.toLocaleString()} <span className="text-red-400 text-[11px]">{pctStr}</span></span>
              } else delta = <span className="text-gray-400 ml-2">0</span>
            }
            return (
              <div key={i} className="flex items-center text-sm w-full">
                <span className="w-2 h-2 rounded-full mr-2 shrink-0" style={{ backgroundColor: entry.color }} />
                <span className="text-gray-600">{entry.name}</span>
                <span className="ml-auto font-semibold text-gray-900">{val.toLocaleString()}{delta}</span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
  return null
}

function PeakTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    const entry = payload[0].payload
    return (
      <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-lg min-w-[180px]">
        <p className="font-semibold text-gray-800 mb-1">{entry.label}</p>
        <div className="text-2xl font-bold text-gray-900">{entry.value.toLocaleString()}</div>
        <p className="text-xs text-gray-500 mt-1">Peak: {entry.week}</p>
        {entry.growth !== null && (
          <div className="flex items-center gap-1 mt-2 pt-2 border-t border-gray-100">
            <span className={`text-sm font-semibold ${entry.growth >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
              {entry.growth >= 0 ? '+' : ''}{entry.growth.toFixed(1)}% WoW
            </span>
          </div>
        )}
      </div>
    )
  }
  return null
}

export default function Dashboard() {
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [hiddenLines, setHiddenLines] = useState<string[]>([]);

  const toggleLine = (e: any) => {
    const dataKey = e.dataKey;
    setHiddenLines((prev) =>
      prev.includes(dataKey) ? prev.filter((k) => k !== dataKey) : [...prev, dataKey]
    );
  };

  const isIG = platform === "instagram";
  const isTT = platform === "tiktok";
  const isWeb = platform === "web";
  const data: any[] = isIG ? IG_DATA : isTT ? TT_DATA : WEB_DATA;

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#0a0b0d] font-sans">
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#024885]" />
            <span className="font-semibold text-lg tracking-tight">SobatTi Internal</span>
          </div>
          <div className="text-sm font-medium text-gray-500">
            March — June 2026
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-2">{isIG ? "Instagram" : isTT ? "TikTok" : "Web"} Dashboard</h1>
          <p className="text-gray-500">Weekly health check and deep dive analytics for @sobat.ti{isIG ? "." : isTT ? " — 5 videos, 64 followers." : " — 546 page views, 539 users."}</p>
        </div>

        {/* TABS */}
        <div className="flex gap-2 mb-8 bg-[#eef0f3] p-1 rounded-xl w-fit">
          <button
            onClick={() => { setPlatform("instagram"); setHiddenLines([]); }}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              isIG ? "bg-white shadow-sm text-[#0a0b0d]" : "text-gray-500 hover:text-[#0a0b0d]"
            }`}
          >
            <Smartphone className="w-4 h-4" /> Instagram
          </button>
          <button
            onClick={() => { setPlatform("tiktok"); setHiddenLines([]); }}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              isTT ? "bg-white shadow-sm text-[#0a0b0d]" : "text-gray-500 hover:text-[#0a0b0d]"
            }`}
          >
            <Music className="w-4 h-4" /> TikTok
          </button>
          <button
            onClick={() => { setPlatform("web"); setHiddenLines([]); }}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              isWeb ? "bg-white shadow-sm text-[#0a0b0d]" : "text-gray-500 hover:text-[#0a0b0d]"
            }`}
          >
            <BarChart3 className="w-4 h-4" /> Web
          </button>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {isIG ? (
            <>
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <h3 className="text-gray-500 text-xs font-bold mb-4 uppercase tracking-widest">Lifetime (Mar 23 — Present)</h3>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600 font-medium text-sm">Total Views</span>
                    <span className="text-xl font-bold text-gray-900">{totalIgViews.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600 font-medium text-sm">Total Reach</span>
                    <span className="text-xl font-bold text-gray-900">{totalIgReach.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600 font-medium text-sm">Total Likes</span>
                    <span className="text-xl font-bold text-gray-900">{totalIgLikes.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 last:border-0 pb-2 last:pb-0">
                    <span className="text-gray-600 font-medium text-sm">Followers</span>
                    <span className="text-xl font-bold text-gray-900">{igLatest.ig_followers}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <h3 className="text-gray-500 text-xs font-bold mb-4 uppercase tracking-widest">This Week ({igLatest.week})</h3>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600 font-medium text-sm">Views</span>
                    <span className="text-xl font-bold text-gray-900">{igLatest.ig_views.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600 font-medium text-sm">Reach</span>
                    <span className="text-xl font-bold text-gray-900">{igLatest.ig_reach.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600 font-medium text-sm">Profile Visits</span>
                    <span className="text-xl font-bold text-gray-900">{igLatest.ig_visits.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center last:border-0 pb-2 last:pb-0">
                    <span className="text-gray-600 font-medium text-sm">Interactions</span>
                    <span className="text-xl font-bold text-gray-900">{igLatest.ig_interactions.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#0a0b0d] border border-gray-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between text-white relative overflow-hidden">
                <div className="absolute -right-6 -top-6 opacity-10">
                  <Heart className="w-40 h-40 text-pink-500" />
                </div>
                <div className="relative z-10 h-full flex flex-col">
                  <h3 className="text-gray-400 text-xs font-bold mb-4 uppercase tracking-widest">Top Post</h3>
                  <div className="flex gap-4 items-start flex-1 mt-2">
                    <div className="p-3 bg-white/10 rounded-xl shrink-0">
                      {igTopPost.type === "Reel" ? <Smartphone className="w-5 h-5 text-pink-500" /> : <FileText className="w-5 h-5 text-blue-400" />}
                    </div>
                    <div className="flex flex-col justify-center h-full">
                      <span className="text-xs text-gray-400 font-medium mb-1">{igTopPost.type} · {igTopPost.date}</span>
                      <p className="font-semibold text-[15px] leading-snug mb-3 line-clamp-2">&ldquo;{igTopPost.desc}&rdquo;</p>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-[#EB6003] font-bold flex items-center gap-1"><ArrowUpRight className="w-4 h-4"/>{igTopPost.views.toLocaleString()} Views</span>
                        <span className="text-gray-400">·</span>
                        <span className="text-pink-400 font-medium">{igTopPost.likes} Likes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : isTT ? (
            <>
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <h3 className="text-gray-500 text-xs font-bold mb-4 uppercase tracking-widest">Lifetime (Apr 2 — Present)</h3>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600 font-medium text-sm">Total Views</span>
                    <span className="text-xl font-bold text-gray-900">{totalTtViews.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600 font-medium text-sm">Profile Views</span>
                    <span className="text-xl font-bold text-gray-900">{totalTtProfileViews.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600 font-medium text-sm">Total Likes</span>
                    <span className="text-xl font-bold text-gray-900">{totalTtLikes.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 last:border-0 pb-2 last:pb-0">
                    <span className="text-gray-600 font-medium text-sm">Followers</span>
                    <span className="text-xl font-bold text-gray-900">{ttLatest.tt_followers}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <h3 className="text-gray-500 text-xs font-bold mb-4 uppercase tracking-widest">This Week ({ttLatest.week})</h3>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600 font-medium text-sm">Views</span>
                    <span className="text-xl font-bold text-gray-900">{ttLatest.tt_views.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600 font-medium text-sm">Profile Views</span>
                    <span className="text-xl font-bold text-gray-900">{ttLatest.tt_profile_views.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600 font-medium text-sm">Likes</span>
                    <span className="text-xl font-bold text-gray-900">{ttLatest.tt_likes.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center last:border-0 pb-2 last:pb-0">
                    <span className="text-gray-600 font-medium text-sm">New Followers</span>
                    <span className="text-xl font-bold text-gray-900">+{ttLatest.tt_new_followers}</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#0a0b0d] border border-gray-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between text-white relative overflow-hidden">
                <div className="absolute -right-6 -top-6 opacity-10">
                  <Music className="w-40 h-40 text-cyan-400" />
                </div>
                <div className="relative z-10 h-full flex flex-col">
                  <h3 className="text-gray-400 text-xs font-bold mb-4 uppercase tracking-widest">Top Video</h3>
                  <div className="flex gap-4 items-start flex-1 mt-2">
                    <div className="p-3 bg-white/10 rounded-xl shrink-0">
                      <Music className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div className="flex flex-col justify-center h-full">
                      <span className="text-xs text-gray-400 font-medium mb-1">Video · {ttTopVideo.date}</span>
                      <p className="font-semibold text-[15px] leading-snug mb-3 line-clamp-2">&ldquo;{ttTopVideo.title}&rdquo;</p>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-[#EB6003] font-bold flex items-center gap-1"><ArrowUpRight className="w-4 h-4"/>{ttTopVideo.views.toLocaleString()} Views</span>
                        <span className="text-gray-400">·</span>
                        <span className="text-cyan-400 font-medium">{ttTopVideo.likes} Likes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <h3 className="text-gray-500 text-xs font-bold mb-4 uppercase tracking-widest">Lifetime (Mar 23 — Present)</h3>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600 font-medium text-sm">Page Views</span>
                    <span className="text-xl font-bold text-gray-900">{webTotalPageViews.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600 font-medium text-sm">Sessions</span>
                    <span className="text-xl font-bold text-gray-900">{webTotalSessions.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600 font-medium text-sm">Users</span>
                    <span className="text-xl font-bold text-gray-900">{webTotalActiveUsers.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 last:border-0 pb-2 last:pb-0">
                    <span className="text-gray-600 font-medium text-sm">Engagement Rate</span>
                    <span className="text-xl font-bold text-gray-900">{Math.round(webTotalEngagementEvents / webTotalActiveUsers * 100)}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <h3 className="text-gray-500 text-xs font-bold mb-4 uppercase tracking-widest">This Week ({webLatest.week})</h3>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600 font-medium text-sm">Page Views</span>
                    <span className="text-xl font-bold text-gray-900">{webLatest.web_page_views.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600 font-medium text-sm">Sessions</span>
                    <span className="text-xl font-bold text-gray-900">{webLatest.web_sessions.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600 font-medium text-sm">Active Users</span>
                    <span className="text-xl font-bold text-gray-900">{webLatest.web_active_users.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center last:border-0 pb-2 last:pb-0">
                    <span className="text-gray-600 font-medium text-sm">New Users</span>
                    <span className="text-xl font-bold text-gray-900">{webLatest.web_new_users.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#0a0b0d] border border-gray-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between text-white relative overflow-hidden">
                <div className="absolute -right-6 -top-6 opacity-10">
                  <BarChart3 className="w-40 h-40 text-blue-400" />
                </div>
                <div className="relative z-10 h-full flex flex-col">
                  <h3 className="text-gray-400 text-xs font-bold mb-4 uppercase tracking-widest">Acquisition Channels</h3>
                  <div className="flex flex-col gap-2 mt-2 flex-1 justify-center">
                    {webChannels.map((ch) => (
                      <div key={ch.channel} className="flex items-center justify-between">
                        <span className="text-gray-300 text-sm">{ch.channel}</span>
                        <span className="font-semibold text-white">{ch.users} <span className="text-gray-400 font-normal">({Math.round(ch.users / webTotalActiveUsers * 100)}%)</span></span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* PEAK VALUES SUMMARY */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" /> Peak Values Summary
          </h2>
          <p className="text-sm text-gray-500 mb-6">Highest recorded metric values with week-over-week growth at peak</p>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={isIG ? igPeakChartData : isTT ? ttPeakChartData : webPeakChartData} margin={{ top: 30, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 11 }} dy={6} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} tickFormatter={(val) => val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val} />
                <Tooltip content={<PeakTooltip />} cursor={{ fill: '#F3F4F6' }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={60}>
                  {(isIG ? igPeakChartData : isTT ? ttPeakChartData : webPeakChartData).map((entry, i) => (
                    <Cell key={i} fill={entry.growth !== null && entry.growth >= 0 ? COLORS.blue : entry.growth !== null && entry.growth < 0 ? COLORS.orange : COLORS.muted} />
                  ))}
                  <LabelList dataKey="value" position="top" content={({ x, y, width, value, index }: any) => {
                    const data = isIG ? igPeakChartData : isTT ? ttPeakChartData : webPeakChartData
                    const entry = data[index]
                    return (
                      <g>
                        <text x={x + width / 2} y={y - 22} textAnchor="middle" fill="#0a0b0d" fontWeight={700} fontSize={13}>
                          {value.toLocaleString()}
                        </text>
                        {entry.growth !== null && (
                          <text x={x + width / 2} y={y - 7} textAnchor="middle" fill={entry.growth >= 0 ? '#059669' : '#dc2626'} fontWeight={600} fontSize={11}>
                            {entry.growth >= 0 ? '+' : ''}{entry.growth.toFixed(1)}%
                          </text>
                        )}
                      </g>
                    )
                  }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 gap-8">
          {/* Primary Chart */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-6">{isIG ? "Views & Reach" : isTT ? "Video Views & Profile Views" : "Active Users & New Users"}</h2>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 10 }} dy={10} interval="preserveStartEnd" />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} tickFormatter={(val) => val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} tickFormatter={(val) => val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val} />
                  <Tooltip content={<DeltaTooltip data={data} />} cursor={{ stroke: '#E5E7EB', strokeWidth: 1, strokeDasharray: '3 3' }} />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', cursor: 'pointer' }} onClick={toggleLine} />
                  {isIG ? (
                    <>
                      <Line hide={hiddenLines.includes('ig_views')} yAxisId="left" type="monotone" name="Views" dataKey="ig_views" stroke={COLORS.blue} strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                      <Line hide={hiddenLines.includes('ig_reach')} yAxisId="right" type="monotone" name="Reach" dataKey="ig_reach" stroke={COLORS.lightBlue} strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                    </>
                  ) : isTT ? (
                    <>
                      <Line hide={hiddenLines.includes('tt_views')} yAxisId="left" type="monotone" name="Video Views" dataKey="tt_views" stroke={COLORS.orange} strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                      <Line hide={hiddenLines.includes('tt_profile_views')} yAxisId="right" type="monotone" name="Profile Views" dataKey="tt_profile_views" stroke={COLORS.lightOrange} strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                    </>
                  ) : (
                    <>
                      <Line hide={hiddenLines.includes('web_active_users')} yAxisId="left" type="monotone" name="Active Users" dataKey="web_active_users" stroke={COLORS.blue} strokeWidth={3} dot={{ r: 4, fill: COLORS.blue, strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                      <Line hide={hiddenLines.includes('web_new_users')} yAxisId="right" type="monotone" name="New Users" dataKey="web_new_users" stroke={COLORS.lightBlue} strokeWidth={3} dot={{ r: 4, fill: COLORS.lightBlue, strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                    </>
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Engagement Chart */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-6">{isWeb ? "Page Views & Sessions" : "Engagement & Activity"}</h2>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 10 }} dy={10} interval="preserveStartEnd" />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <Tooltip content={<DeltaTooltip data={data} />} cursor={{ fill: '#F3F4F6' }} />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', cursor: 'pointer' }} onClick={toggleLine} />
                  {isIG ? (
                    <>
                      <Line hide={hiddenLines.includes('ig_likes')} yAxisId="left" type="monotone" name="Likes" dataKey="ig_likes" stroke={COLORS.pink} strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                      <Line hide={hiddenLines.includes('ig_shares')} yAxisId="right" type="monotone" name="Shares" dataKey="ig_shares" stroke={COLORS.orange} strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                      <Line hide={hiddenLines.includes('ig_comments')} yAxisId="right" type="monotone" name="Comments" dataKey="ig_comments" stroke={COLORS.lightOrange} strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                      <Line hide={hiddenLines.includes('ig_posts')} yAxisId="right" type="monotone" name="Posts" dataKey="ig_posts" stroke={COLORS.purple} strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                    </>
                  ) : isTT ? (
                    <>
                      <Line hide={hiddenLines.includes('tt_likes')} yAxisId="left" type="monotone" name="Likes" dataKey="tt_likes" stroke={COLORS.orange} strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                      <Line hide={hiddenLines.includes('tt_shares')} yAxisId="right" type="monotone" name="Shares" dataKey="tt_shares" stroke={COLORS.teal} strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                      <Line hide={hiddenLines.includes('tt_comments')} yAxisId="right" type="monotone" name="Comments" dataKey="tt_comments" stroke={COLORS.pink} strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                    </>
                  ) : (
                    <>
                      <Line hide={hiddenLines.includes('web_page_views')} yAxisId="left" type="monotone" name="Page Views" dataKey="web_page_views" stroke={COLORS.purple} strokeWidth={3} dot={{ r: 4, fill: COLORS.purple, strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                      <Line hide={hiddenLines.includes('web_sessions')} yAxisId="right" type="monotone" name="Sessions" dataKey="web_sessions" stroke={COLORS.orange} strokeWidth={3} dot={{ r: 4, fill: COLORS.orange, strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                    </>
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Follower Growth / Engagement Time Chart */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            {isWeb ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Avg Engagement Time</h2>
                  <span className="text-sm text-gray-500">Mean session duration per active user</span>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                      <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 10 }} dy={10} interval="preserveStartEnd" />
                      <YAxis domain={[0, 600]} axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                      <Tooltip content={<DeltaTooltip data={data} />} cursor={{ stroke: '#E5E7EB', strokeWidth: 1, strokeDasharray: '3 3' }} />
                      <Line type="monotone" dataKey="web_engagement_time" stroke={COLORS.teal} strokeWidth={3} dot={{ r: 5, fill: COLORS.teal, strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 7, fill: COLORS.teal, strokeWidth: 2, stroke: '#fff' }} name="Avg Engagement Time (s)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4 text-center text-sm">
                  <div>
                    <span className="text-gray-500 block">Peak</span>
                    <span className="font-semibold text-lg">{Math.round(Math.max(...WEB_DATA.map(d => d.web_engagement_time)))}s</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Average</span>
                    <span className="font-semibold text-lg text-teal-600">{Math.round(WEB_DATA.reduce((a, d) => a + d.web_engagement_time, 0) / WEB_DATA.filter(d => d.web_engagement_time > 0).length)}s</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Last Week</span>
                    <span className="font-semibold text-lg">{Math.round(WEB_DATA[WEB_DATA.length - 2].web_engagement_time)}s</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Follower Growth</h2>
                  <span className="text-sm text-gray-500">
                    <span className="font-semibold text-teal-600">{data[0].tt_followers ?? data[0].ig_followers}</span> → <span className="font-semibold text-teal-600">{data[data.length - 1].tt_followers ?? data[data.length - 1].ig_followers}</span> total
                  </span>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                      <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 10 }} dy={10} interval="preserveStartEnd" />
                      <YAxis domain={isIG ? [0, 80] : [0, 70]} axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} ticks={isIG ? [0, 10, 20, 30, 40, 50, 60, 70, 80] : [0, 10, 20, 30, 40, 50, 60, 70]} />
                      <Tooltip content={<DeltaTooltip data={data} />} cursor={{ stroke: '#E5E7EB', strokeWidth: 1, strokeDasharray: '3 3' }} />
                      <Line type="monotone" dataKey={isIG ? "ig_followers" : "tt_followers"} stroke={COLORS.teal} strokeWidth={3} dot={{ r: 5, fill: COLORS.teal, strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 7, fill: COLORS.teal, strokeWidth: 2, stroke: '#fff' }} name="Followers" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4 text-center text-sm">
                  <div>
                    <span className="text-gray-500 block">Start</span>
                    <span className="font-semibold text-lg">{isIG ? IG_DATA[0].ig_followers : TT_DATA[0].tt_followers}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Total Growth</span>
                    <span className="font-semibold text-lg text-teal-600">+{isIG ? IG_DATA[IG_DATA.length - 1].ig_followers - IG_DATA[0].ig_followers : TT_DATA[TT_DATA.length - 1].tt_followers - TT_DATA[0].tt_followers}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Current</span>
                    <span className="font-semibold text-lg">{isIG ? IG_DATA[IG_DATA.length - 1].ig_followers : TT_DATA[TT_DATA.length - 1].tt_followers}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* POST VOLUME / WEB EVENTS */}
        <div className="mt-8 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          {isWeb ? (
            <>
              <h2 className="text-lg font-semibold mb-1">Events Summary</h2>
              <p className="text-sm text-gray-500 mb-6">All tracked user events across the entire period</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-500 text-xs uppercase tracking-widest">
                      <th className="text-left py-3 pr-4 font-semibold">Event</th>
                      <th className="text-right py-3 px-4 font-semibold">Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "page_view", count: 546 },
                      { name: "session_start", count: 544 },
                      { name: "first_visit", count: 539 },
                      { name: "user_engagement", count: 345 },
                      { name: "scroll", count: 4 },
                    ].map((e, i) => (
                      <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td className="py-3 pr-4 text-gray-900 font-medium">{e.name}</td>
                        <td className="py-3 px-4 text-right font-semibold text-gray-900">{e.count.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <h3 className="text-lg font-semibold mt-8 mb-3">User Retention (Cohorts)</h3>
              <p className="text-sm text-gray-500 mb-4">Weekly cohort retention — how many users returned week-over-week</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-500 text-xs uppercase tracking-widest">
                      <th className="text-left py-3 pr-4 font-semibold">Cohort</th>
                      <th className="text-right py-3 px-4 font-semibold">Week 0</th>
                      <th className="text-right py-3 px-4 font-semibold">Week 1</th>
                      <th className="text-right py-3 px-4 font-semibold">Week 2</th>
                      <th className="text-right py-3 px-4 font-semibold">Week 3</th>
                      <th className="text-right py-3 px-4 font-semibold">Week 4</th>
                      <th className="text-right py-3 px-4 font-semibold">Week 5</th>
                    </tr>
                  </thead>
                  <tbody>
                    {webRetention.map((r, i) => (
                      <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td className="py-3 pr-4 text-gray-900 font-medium whitespace-nowrap">{r.cohort}</td>
                        {[r.w0, r.w1, r.w2, r.w3, r.w4, r.w5].map((v, j) => (
                          <td key={j} className={`py-3 px-4 text-right font-semibold ${v === -1 ? "text-gray-300" : v > 0 ? "text-teal-600" : "text-gray-500"}`}>
                            {v === -1 ? "\u2014" : v}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-lg font-semibold mb-1">Content Volume</h2>
              <p className="text-sm text-gray-500 mb-6">
                {isIG ? "Weekly posts broken down by format (feed images, Reels, carousels)" : "Weekly video uploads"}
              </p>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 10 }} dy={8} interval="preserveStartEnd" />
                    <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                    <Tooltip content={<DeltaTooltip data={data} />} cursor={{ fill: '#F3F4F6' }} />
                    {isIG ? (
                      <>
                        <Bar dataKey="ig_reels" name="Reels" stackId="a" fill={COLORS.pink} radius={[2, 2, 0, 0]} />
                        <Bar dataKey="ig_images" name="Image Posts" stackId="a" fill={COLORS.blue} radius={[2, 2, 0, 0]} />
                        <Bar dataKey="ig_carousels" name="Carousels" stackId="a" fill={COLORS.lightBlue} radius={[2, 2, 0, 0]} />
                        <Legend iconType="circle" wrapperStyle={{ paddingTop: '16px', fontSize: '12px' }} />
                      </>
                    ) : (
                      <>
                        <Bar dataKey="tt_videos" name="Videos" fill={COLORS.orange} radius={[4, 4, 0, 0]} />
                        <Legend iconType="circle" wrapperStyle={{ paddingTop: '16px', fontSize: '12px' }} />
                      </>
                    )}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </div>

        {/* METRIC BREAKDOWNS */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {isIG ? (
            <>
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-sm font-medium flex items-center gap-1.5"><Heart className="w-4 h-4" /> Avg Likes/Week</span>
                <span className="text-xl font-semibold">{(totalIgLikes / IG_DATA.length).toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-sm font-medium flex items-center gap-1.5"><Share2 className="w-4 h-4" /> Total Shares</span>
                <span className="text-xl font-semibold">{totalIgShares.toLocaleString()}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-sm font-medium flex items-center gap-1.5"><MessageCircle className="w-4 h-4" /> Total Comments</span>
                <span className="text-xl font-semibold">{totalIgComments.toLocaleString()}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-sm font-medium flex items-center gap-1.5"><FileText className="w-4 h-4" /> Total Posts</span>
                <span className="text-xl font-semibold">{totalIgPosts} ({ALL_POSTS.length} total)</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-sm font-medium flex items-center gap-1.5"><BarChart3 className="w-4 h-4" /> Profile Visits</span>
                <span className="text-xl font-semibold">{totalIgVisits.toLocaleString()}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-sm font-medium flex items-center gap-1.5"><MousePointerClick className="w-4 h-4" /> Link Clicks</span>
                <span className="text-xl font-semibold">{IG_DATA.reduce((a, c) => a + c.ig_link_clicks, 0).toLocaleString()}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-sm font-medium flex items-center gap-1.5"><Users className="w-4 h-4" /> New Follows (from posts)</span>
                <span className="text-xl font-semibold">{totalIgNewFollows}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-sm font-medium flex items-center gap-1.5"><Eye className="w-4 h-4" /> Peak Week</span>
                <span className="text-xl font-semibold">{IG_DATA.reduce((prev, curr) => prev.ig_views > curr.ig_views ? prev : curr).week}</span>
              </div>
            </>
          ) : isTT ? (
            <>
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-sm font-medium flex items-center gap-1.5"><Heart className="w-4 h-4" /> Avg Likes/Week</span>
                <span className="text-xl font-semibold">{(totalTtLikes / TT_DATA.length).toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-sm font-medium flex items-center gap-1.5"><Share2 className="w-4 h-4" /> Total Shares</span>
                <span className="text-xl font-semibold">{totalTtShares.toLocaleString()}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-sm font-medium flex items-center gap-1.5"><MessageCircle className="w-4 h-4" /> Total Comments</span>
                <span className="text-xl font-semibold">{totalTtComments.toLocaleString()}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-sm font-medium flex items-center gap-1.5"><Music className="w-4 h-4" /> Total Videos</span>
                <span className="text-xl font-semibold">{ALL_VIDEOS.length}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-sm font-medium flex items-center gap-1.5"><Users className="w-4 h-4" /> New Followers</span>
                <span className="text-xl font-semibold">+{totalTtNewFollowers}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-sm font-medium flex items-center gap-1.5"><BarChart3 className="w-4 h-4" /> Profile Views</span>
                <span className="text-xl font-semibold">{totalTtProfileViews.toLocaleString()}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-sm font-medium flex items-center gap-1.5"><Eye className="w-4 h-4" /> Peak Week</span>
                <span className="text-xl font-semibold">{TT_DATA.reduce((prev, curr) => prev.tt_views > curr.tt_views ? prev : curr).week}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-sm font-medium flex items-center gap-1.5"><Heart className="w-4 h-4" /> Top Video Likes</span>
                <span className="text-xl font-semibold">{ttTopVideo.likes.toLocaleString()}</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-sm font-medium flex items-center gap-1.5"><Eye className="w-4 h-4" /> Total Page Views</span>
                <span className="text-xl font-semibold">{webTotalPageViews.toLocaleString()}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-sm font-medium flex items-center gap-1.5"><Users className="w-4 h-4" /> Total Users</span>
                <span className="text-xl font-semibold">{webTotalActiveUsers.toLocaleString()}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-sm font-medium flex items-center gap-1.5"><Activity className="w-4 h-4" /> Total Sessions</span>
                <span className="text-xl font-semibold">{webTotalSessions.toLocaleString()}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-sm font-medium flex items-center gap-1.5"><Heart className="w-4 h-4" /> Engagement Events</span>
                <span className="text-xl font-semibold">{webTotalEngagementEvents.toLocaleString()}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-sm font-medium flex items-center gap-1.5"><BarChart3 className="w-4 h-4" /> Engagement Rate</span>
                <span className="text-xl font-semibold">{Math.round(webTotalEngagementEvents / webTotalActiveUsers * 100)}%</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-sm font-medium flex items-center gap-1.5"><Share2 className="w-4 h-4" /> Scrolls</span>
                <span className="text-xl font-semibold">{webTotalScrolls.toLocaleString()}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-sm font-medium flex items-center gap-1.5"><Activity className="w-4 h-4" /> Avg Time on Site</span>
                <span className="text-xl font-semibold">{Math.round(WEB_DATA.reduce((a, d) => a + d.web_engagement_time, 0) / WEB_DATA.filter(d => d.web_engagement_time > 0).length)}s</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-sm font-medium flex items-center gap-1.5"><Globe className="w-4 h-4" /> Top Country</span>
                <span className="text-xl font-semibold">ID (510)</span>
              </div>
            </>
          )}
        </div>

        {/* ALL VIDEOS / POSTS / WEB BREAKDOWN */}
        {isWeb ? (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Acquisition Channels</h2>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500 text-xs uppercase tracking-widest">
                    <th className="text-left py-3 pr-4 font-semibold">Channel</th>
                    <th className="text-right py-3 px-4 font-semibold">Users</th>
                    <th className="text-right py-3 pl-4 font-semibold">%</th>
                  </tr>
                </thead>
                <tbody>
                  {webChannels.map((ch, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="py-3 pr-4 text-gray-900 font-medium">{ch.channel}</td>
                      <td className="py-3 px-4 text-right font-semibold text-gray-900">{ch.users}</td>
                      <td className="py-3 pl-4 text-right text-gray-600">{Math.round(ch.users / webTotalActiveUsers * 100)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Top Countries</h2>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500 text-xs uppercase tracking-widest">
                    <th className="text-left py-3 pr-4 font-semibold">Country</th>
                    <th className="text-right py-3 px-4 font-semibold">Users</th>
                    <th className="text-right py-3 pl-4 font-semibold">%</th>
                  </tr>
                </thead>
                <tbody>
                  {webCountries.map((c, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="py-3 pr-4 text-gray-900 font-medium">{c.country}</td>
                      <td className="py-3 px-4 text-right font-semibold text-gray-900">{c.users}</td>
                      <td className="py-3 pl-4 text-right text-gray-600">{Math.round(c.users / webTotalActiveUsers * 100)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="mt-12 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">All {isIG ? "Posts" : "Videos"}</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500 text-xs uppercase tracking-widest">
                    <th className="text-left py-3 pr-4 font-semibold">Date</th>
                    <th className="text-left py-3 pr-4 font-semibold">{isIG ? "Type" : ""}</th>
                    <th className="text-left py-3 pr-4 font-semibold">Description</th>
                    <th className="text-right py-3 px-4 font-semibold">Views</th>
                    <th className="text-right py-3 px-4 font-semibold">Likes</th>
                    <th className="text-right py-3 px-4 font-semibold">Shares</th>
                    <th className="text-right py-3 px-4 font-semibold">Comments</th>
                    {isIG && <th className="text-right py-3 px-4 font-semibold">Saves</th>}
                    {isIG && <th className="text-right py-3 pl-4 font-semibold">Follows</th>}
                  </tr>
                </thead>
                <tbody>
                  {(isIG ? [...ALL_POSTS].reverse() : [...ALL_VIDEOS].reverse()).map((item: any, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="py-3 pr-4 text-gray-900 whitespace-nowrap">{item.date}</td>
                      <td className="py-3 pr-4">
                        {isIG && (
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                            item.type === "Reel" ? "bg-pink-50 text-pink-600" :
                            item.type === "Carousel" ? "bg-blue-50 text-blue-600" :
                            "bg-gray-100 text-gray-600"
                          }`}>
                            {item.type}
                          </span>
                        )}
                      </td>
                      <td className="py-3 pr-4 text-gray-600 max-w-[240px] truncate">{item.desc || item.title}</td>
                      <td className="py-3 px-4 text-right font-medium text-gray-900">{item.views.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right font-medium text-pink-600">{item.likes}</td>
                      <td className="py-3 px-4 text-right text-gray-600">{item.shares}</td>
                      <td className="py-3 px-4 text-right text-gray-600">{item.comments}</td>
                      {isIG && <td className="py-3 px-4 text-right text-gray-600">{item.saves}</td>}
                      {isIG && <td className="py-3 pl-4 text-right text-gray-600">{item.follows || "—"}</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
