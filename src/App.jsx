import React, { useState } from 'react'
import {
  Activity, Bell, Bookmark, CalendarDays, ChevronRight, Flame, Heart, Home,
  LayoutGrid, MessageCircle, MoreHorizontal, Search, Send, Shield, Star,
  Trophy, User, Users, Zap,
} from 'lucide-react'

const sports = ['关注', '足球', '篮球', '网球']

const matches = [
  { sport: 'NBA', time: '第三节 05:42', a: '洛杉矶', b: '波士顿', as: '86', bs: '82', live: true, colors: ['#f5c542', '#42bd88'] },
  { sport: '英超', time: '今晚 23:30', a: '阿森纳', b: '曼城', as: '-', bs: '-', colors: ['#ef4d59', '#65a9ff'] },
  { sport: '法网', time: '明天 20:00', a: '辛纳', b: '阿尔卡拉斯', as: '-', bs: '-', colors: ['#f19a4a', '#b7e36e'] },
]

const posts = [
  { author: '边线观察员', badge: '战术达人', ago: '8分钟前', title: '为什么阿森纳的右侧进攻今晚格外有效？', body: '厄德高频繁拉边后，萨卡得到了更多向内切入的空间。这个变化让对手的防线非常难受。', likes: 328, comments: 64, type: '战术分析', color: '#ef4d59' },
  { author: 'NorthBank', badge: '枪手球迷', ago: '16分钟前', title: '你认为今晚谁会成为全场最佳？', body: '距离比赛开始还有 2 小时，来投出你心中的关键球员。', likes: 186, comments: 92, type: '球迷投票', color: '#c8ff3d' },
  { author: '网前截击', badge: '网球作者', ago: '32分钟前', title: '这个反手制胜分，可能是今天最佳一球', body: '在极度被动的位置完成直线穿越，这一分把比赛气势彻底扭转。', likes: 512, comments: 48, type: '精彩瞬间', color: '#f19a4a' },
]

function Avatar({ label = 'A', color = '#c8ff3d', size = 'md' }) {
  const scale = size === 'lg' ? 'h-14 w-14 text-lg' : 'h-10 w-10 text-sm'
  return <div className={`${scale} grid shrink-0 place-items-center rounded-full font-black text-ink`} style={{ background: color }}>{label}</div>
}

function TeamMark({ name, color, large = false }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`${large ? 'h-16 w-16 text-xl' : 'h-12 w-12 text-base'} grid place-items-center rounded-2xl font-black text-white shadow-card`} style={{ background: `linear-gradient(145deg, ${color}, #111820)` }}>
        {name.slice(0, 1)}
      </div>
      <span className={`${large ? 'text-sm' : 'text-xs'} font-semibold`}>{name}</span>
    </div>
  )
}

function SectionTitle({ title, meta, onMore }) {
  return (
    <div className="mb-3 flex items-end justify-between">
      <div>
        {meta && <p className="mb-1 text-[10px] font-bold uppercase tracking-[.2em] text-lime">{meta}</p>}
        <h2 className="text-lg font-black">{title}</h2>
      </div>
      {onMore && <button onClick={onMore} className="flex items-center text-xs text-muted">查看全部 <ChevronRight size={14} /></button>}
    </div>
  )
}

function MatchCard({ match, large = false, onClick }) {
  return (
    <button onClick={onClick} className={`glass w-full rounded-3xl p-4 text-left shadow-card transition active:scale-[.98] ${large ? 'relative overflow-hidden border-lime/20 p-5 shadow-glow' : ''}`}>
      {large && <div className="absolute -right-12 -top-20 h-44 w-44 rounded-full bg-lime/10 blur-3xl" />}
      <div className="relative flex items-center justify-between text-[11px] font-bold text-muted">
        <span>{match.sport}</span>
        <span className={match.live ? 'text-red-400' : ''}>{match.live && <i className="live-dot mr-2 inline-block h-1.5 w-1.5 rounded-full bg-red-400" />}{match.time}</span>
      </div>
      <div className={`relative grid grid-cols-[1fr_auto_1fr] items-center ${large ? 'mt-6 gap-4' : 'mt-4 gap-3'}`}>
        <TeamMark name={match.a} color={match.colors[0]} large={large} />
        <div className="text-center">
          <div className={`${large ? 'text-3xl' : 'text-xl'} font-black tracking-tight`}>{match.as} <span className="mx-1 text-muted">:</span> {match.bs}</div>
          <span className="mt-1 block text-[10px] text-muted">{match.live ? '12.6k 人正在讨论' : '预约提醒'}</span>
        </div>
        <TeamMark name={match.b} color={match.colors[1]} large={large} />
      </div>
    </button>
  )
}

function Header({ title, subtitle, action = true }) {
  return (
    <header className="flex items-center justify-between px-5 pb-4 pt-6">
      <div>
        {subtitle && <p className="mb-1 text-[10px] font-bold uppercase tracking-[.22em] text-lime">{subtitle}</p>}
        <h1 className="text-2xl font-black tracking-tight">{title}</h1>
      </div>
      {action && <button className="glass grid h-10 w-10 place-items-center rounded-full text-muted"><Bell size={18} /></button>}
    </header>
  )
}

function HomePage({ openMatch }) {
  const [activeSport, setActiveSport] = useState('关注')
  return (
    <>
      <Header title="赛场" subtitle="Saturday · 比赛日" />
      <div className="px-5">
        <div className="hide-scrollbar mb-5 flex gap-2 overflow-x-auto">
          {sports.map(s => <button key={s} onClick={() => setActiveSport(s)} className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${activeSport === s ? 'bg-lime text-ink' : 'bg-panel2 text-muted'}`}>{s}</button>)}
        </div>
        <MatchCard match={matches[0]} large onClick={openMatch} />
        <div className="mt-6">
          <SectionTitle title="即将开始" meta="UP NEXT" onMore={() => {}} />
          <div className="space-y-3">{matches.slice(1).map(m => <MatchCard key={m.sport} match={m} />)}</div>
        </div>
        <div className="mt-6">
          <SectionTitle title="今日热议" meta="TRENDING" />
          <button className="glass flex w-full items-center gap-3 rounded-2xl p-4 text-left">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-red-400/10 text-red-400"><Flame size={20} /></div>
            <div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">最后两分钟，谁能决定比赛？</p><p className="mt-1 text-[11px] text-muted">2,884 条新讨论</p></div>
            <ChevronRight size={16} className="text-muted" />
          </button>
        </div>
      </div>
    </>
  )
}

function MatchPage() {
  const [stand, setStand] = useState('公共区')
  const chats = [
    ['Kobe24', '这个三分太关键了！', '#c8ff3d'],
    ['花园主场', '防守轮转慢了一步，得叫暂停了', '#63b2ff'],
    ['篮球显微镜', '连续三回合都在找同一个错位', '#f08a78'],
    ['紫金岁月', '最后五分钟，准备好了吗？', '#c8a5ff'],
  ]
  return (
    <>
      <Header title="比赛中心" subtitle="NBA · LIVE" />
      <div className="px-5">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-panel p-5 shadow-glow">
          <div className="absolute left-1/2 top-0 h-32 w-40 -translate-x-1/2 rounded-full bg-lime/10 blur-3xl" />
          <div className="relative flex justify-center text-[10px] font-bold text-red-400"><span className="live-dot mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-red-400" /> 第三节 · 05:42</div>
          <div className="relative mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <TeamMark name="洛杉矶" color="#f5c542" large />
            <div className="text-center"><p className="text-4xl font-black">86<span className="mx-2 text-muted">:</span>82</p><p className="mt-2 text-[10px] text-muted">湖人球权 · 24 秒</p></div>
            <TeamMark name="波士顿" color="#42bd88" large />
          </div>
          <div className="relative mt-5 grid grid-cols-3 divide-x divide-white/10 rounded-2xl bg-white/[.035] py-3 text-center">
            {[['48%', '投篮命中'], ['31', '篮板'], ['18', '助攻']].map(x => <div key={x[1]}><b className="text-sm">{x[0]}</b><span className="mt-1 block text-[9px] text-muted">{x[1]}</span></div>)}
          </div>
        </div>
        <div className="my-4 grid grid-cols-3 gap-2">
          {['主队看台', '公共区', '客队看台'].map(x => <button key={x} onClick={() => setStand(x)} className={`rounded-xl py-2.5 text-[11px] font-bold ${stand === x ? 'bg-lime text-ink' : 'bg-panel2 text-muted'}`}>{x}</button>)}
        </div>
        <div className="mb-3 flex items-center justify-between"><h3 className="font-black">{stand}</h3><span className="flex items-center text-[10px] text-muted"><Users size={13} className="mr-1" />12,638 在线</span></div>
        <div className="space-y-4">
          {chats.map((c, i) => <div key={c[0]} className="flex gap-3"><Avatar label={c[0][0]} color={c[2]} /><div><p className="text-[11px] font-bold text-muted">{c[0]} <span className="ml-2 font-normal text-muted/60">{i + 1}分钟前</span></p><p className="mt-1 rounded-2xl rounded-tl-sm bg-panel2 px-3 py-2 text-xs">{c[1]}</p></div></div>)}
        </div>
        <div className="sticky bottom-20 mt-5 flex gap-2 rounded-2xl border border-white/10 bg-panel/95 p-2 backdrop-blur-xl">
          <input className="min-w-0 flex-1 bg-transparent px-2 text-xs outline-none placeholder:text-muted" placeholder={`在${stand}聊聊比赛...`} />
          <button className="grid h-9 w-9 place-items-center rounded-xl bg-lime text-ink"><Send size={16} /></button>
        </div>
      </div>
    </>
  )
}

function DiscoverPage() {
  const [liked, setLiked] = useState({})
  return (
    <>
      <Header title="发现" subtitle="COMMUNITY" />
      <div className="px-5">
        <div className="glass mb-5 flex items-center gap-2 rounded-2xl px-4 py-3 text-muted"><Search size={16} /><span className="text-xs">搜索赛事、球队和讨论</span></div>
        <div className="mb-5 flex gap-2"><button className="rounded-full bg-lime px-4 py-2 text-xs font-bold text-ink">推荐</button><button className="rounded-full bg-panel2 px-4 py-2 text-xs font-bold text-muted">最新</button><button className="rounded-full bg-panel2 px-4 py-2 text-xs font-bold text-muted">关注</button></div>
        <div className="space-y-4">
          {posts.map((p, i) => (
            <article key={p.title} className="glass rounded-3xl p-4 shadow-card">
              <div className="flex items-center gap-3"><Avatar label={p.author[0]} color={p.color} /><div className="min-w-0 flex-1"><p className="text-xs font-bold">{p.author}</p><p className="mt-1 text-[9px] text-muted">{p.badge} · {p.ago}</p></div><MoreHorizontal size={17} className="text-muted" /></div>
              <div className="mt-4"><span className="rounded-md bg-white/5 px-2 py-1 text-[9px] font-bold text-lime">{p.type}</span><h3 className="mt-3 text-sm font-black leading-snug">{p.title}</h3><p className="mt-2 text-[11px] leading-relaxed text-muted">{p.body}</p></div>
              <div className="mt-4 flex gap-5 border-t border-white/5 pt-3 text-[10px] text-muted"><button onClick={() => setLiked({ ...liked, [i]: !liked[i] })} className={`flex items-center gap-1.5 ${liked[i] ? 'text-red-400' : ''}`}><Heart size={14} fill={liked[i] ? 'currentColor' : 'none'} />{p.likes + (liked[i] ? 1 : 0)}</button><button className="flex items-center gap-1.5"><MessageCircle size={14} />{p.comments}</button><button className="ml-auto"><Bookmark size={14} /></button></div>
            </article>
          ))}
        </div>
      </div>
    </>
  )
}

function TeamPage() {
  const [following, setFollowing] = useState(true)
  return (
    <>
      <Header title="球队专区" subtitle="TEAM HUB" />
      <div className="px-5">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#ba1a2c] to-[#431017] p-5 shadow-card">
          <div className="absolute -right-6 -top-8 text-[130px] font-black text-white/[.04]">A</div>
          <div className="relative flex items-center gap-4"><Avatar label="A" color="#ffffff" size="lg" /><div className="flex-1"><h2 className="text-xl font-black">阿森纳</h2><p className="mt-1 text-[10px] text-white/60">英格兰 · 1886 · 124万球迷</p></div><button onClick={() => setFollowing(!following)} className={`rounded-full px-4 py-2 text-[11px] font-bold ${following ? 'bg-white/10 text-white' : 'bg-lime text-ink'}`}>{following ? '已关注' : '关注'}</button></div>
          <div className="relative mt-5 grid grid-cols-3 divide-x divide-white/10 rounded-2xl bg-black/15 py-3 text-center">{[['2', '联赛排名'], ['68', '积分'], ['+42', '净胜球']].map(x => <div key={x[1]}><b>{x[0]}</b><span className="mt-1 block text-[9px] text-white/55">{x[1]}</span></div>)}</div>
        </div>
        <div className="mt-6"><SectionTitle title="下一场比赛" meta="NEXT MATCH" /><MatchCard match={matches[1]} /></div>
        <div className="mt-6"><SectionTitle title="积分榜" meta="TABLE" onMore={() => {}} />
          <div className="glass overflow-hidden rounded-2xl">
            {[['1', '利物浦', '71'], ['2', '阿森纳', '68'], ['3', '曼城', '66'], ['4', '切尔西', '59']].map((r, i) => <div key={r[1]} className={`grid grid-cols-[24px_1fr_auto] items-center px-4 py-3 text-xs ${i === 1 ? 'bg-lime/5 text-lime' : 'border-b border-white/5'}`}><span>{r[0]}</span><b>{r[1]}</b><span>{r[2]} 分</span></div>)}
          </div>
        </div>
        <div className="mt-6"><SectionTitle title="球迷动态" meta="FAN POSTS" /><div className="glass rounded-2xl p-4"><p className="text-xs font-bold">NorthBank · 12分钟前</p><p className="mt-2 text-xs leading-relaxed text-muted">今晚的首发阵容出来了，左后卫位置的安排很有意思。</p><div className="mt-3 flex gap-4 text-[10px] text-muted"><span>♥ 142</span><span>◯ 36</span></div></div></div>
      </div>
    </>
  )
}

function ProfilePage() {
  return (
    <>
      <Header title="我的" subtitle="PROFILE" />
      <div className="px-5">
        <div className="flex items-center gap-4"><Avatar label="Z" color="#c8ff3d" size="lg" /><div className="min-w-0 flex-1"><h2 className="font-black">看台第十二人</h2><p className="mt-1 text-[10px] text-muted">加入赛场 268 天 · 上海</p></div><button className="rounded-full bg-panel2 px-3 py-2 text-[10px] font-bold text-muted">编辑资料</button></div>
        <div className="my-6 grid grid-cols-3 gap-2">{[['128', '关注'], ['3.2k', '获赞'], ['86', '讨论']].map(x => <div key={x[1]} className="glass rounded-2xl py-3 text-center"><b className="text-sm">{x[0]}</b><span className="mt-1 block text-[9px] text-muted">{x[1]}</span></div>)}</div>
        <div className="relative overflow-hidden rounded-3xl bg-lime p-5 text-ink shadow-glow"><div className="absolute -right-5 -top-8 text-[100px] font-black text-black/[.07]">68</div><p className="relative text-[10px] font-black uppercase tracking-[.2em]">预测战绩</p><div className="relative mt-3 flex items-end justify-between"><div><b className="text-4xl font-black">68%</b><p className="mt-1 text-[10px] font-semibold text-ink/60">本赛季命中率</p></div><div className="text-right text-[10px] font-bold"><p>击败 82% 用户</p><p className="mt-2 text-ink/55">连续命中 4 场</p></div></div></div>
        <div className="mt-6"><SectionTitle title="我的主队" meta="FAVORITES" /><div className="grid grid-cols-3 gap-2">{[['阿森纳','#ef4d59'],['洛杉矶','#f5c542'],['辛纳','#f19a4a']].map(x => <div key={x[0]} className="glass flex flex-col items-center rounded-2xl py-4"><TeamMark name={x[0]} color={x[1]} /></div>)}</div></div>
        <div className="mt-6"><SectionTitle title="成就徽章" meta="ACHIEVEMENTS" /><div className="glass grid grid-cols-3 gap-3 rounded-2xl p-4">{[[Zap,'快评达人'],[Star,'金牌预测'],[Shield,'理性球迷']].map(([Icon,t]) => <div key={t} className="flex flex-col items-center gap-2 text-center"><div className="grid h-10 w-10 place-items-center rounded-full bg-lime/10 text-lime"><Icon size={18} /></div><span className="text-[9px] text-muted">{t}</span></div>)}</div></div>
        <div className="mt-6 space-y-2">{[[Bookmark,'我的收藏'],[CalendarDays,'观赛日历'],[Activity,'我的数据']].map(([Icon,t]) => <button key={t} className="glass flex w-full items-center gap-3 rounded-2xl p-4 text-xs font-bold"><Icon size={17} className="text-lime" /><span className="flex-1 text-left">{t}</span><ChevronRight size={15} className="text-muted" /></button>)}</div>
      </div>
    </>
  )
}

const nav = [
  { id: 'home', label: '赛场', Icon: Home },
  { id: 'match', label: '比赛', Icon: Trophy },
  { id: 'discover', label: '发现', Icon: LayoutGrid },
  { id: 'team', label: '球队', Icon: Shield },
  { id: 'profile', label: '我的', Icon: User },
]

export default function App() {
  const [page, setPage] = useState('home')
  const pages = { home: <HomePage openMatch={() => setPage('match')} />, match: <MatchPage />, discover: <DiscoverPage />, team: <TeamPage />, profile: <ProfilePage /> }
  return (
    <main className="mx-auto min-h-screen max-w-[430px] bg-ink shadow-2xl shadow-black md:my-5 md:min-h-[880px] md:overflow-hidden md:rounded-[36px] md:border md:border-white/10">
      <div className="hide-scrollbar min-h-screen overflow-y-auto pb-28 md:h-[880px] md:min-h-0">{pages[page]}</div>
      <nav className="fixed bottom-0 left-1/2 z-20 grid w-full max-w-[430px] -translate-x-1/2 grid-cols-5 border-t border-white/10 bg-[#0c1117]/95 px-2 pb-4 pt-2 backdrop-blur-xl md:bottom-5 md:rounded-b-[36px]">
        {nav.map(({ id, label, Icon }) => <button key={id} onClick={() => setPage(id)} className={`flex flex-col items-center gap-1.5 py-1 text-[9px] font-bold transition ${page === id ? 'text-lime' : 'text-muted'}`}><div className={`grid h-8 w-10 place-items-center rounded-xl ${page === id ? 'bg-lime/10' : ''}`}><Icon size={18} strokeWidth={page === id ? 2.7 : 2} /></div>{label}</button>)}
      </nav>
    </main>
  )
}
