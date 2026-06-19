// ───────────────────────────────────────────────────────────────
//  Projects Hub — central data source
//  Edit THIS file to add / update a project. The /projects page,
//  cards, filters and modals all read from here.
// ───────────────────────────────────────────────────────────────

export type CategoryId =
  | 'software_ai'
  | 'maker_hardware'
  | 'electrical_eng'
  | 'homelab_infra';

/** 1 = green (shipped) · 2 = yellow (in progress) · 3 = purple (concept) · 4 = gray (archived) */
export type ProjectState = 1 | 2 | 3 | 4;

export type LinkType = 'internal' | 'modal';

export interface Project {
  id: string;
  title: string;
  category: CategoryId;
  state: ProjectState;
  /** Executive summary — two lines max, shown on the card. */
  summary: string;
  /** Tech / tool tags, rendered as pills. */
  technologies: string[];
  /** Thumbnail shown on the card (and inside the modal). Path under /public. */
  image: string;
  /** 'internal' navigates to a full page; 'modal' opens a pop-up. */
  linkType: LinkType;
  /** Destination URL (internal route or external link). */
  href: string;
  /** Longer blurb shown only inside the modal (modal projects). */
  tldr?: string;
  /** Label for the modal's primary action button. */
  ctaLabel?: string;
}

// ── Category metadata (drives the filter tabs) ──────────────────
export const categories: { id: CategoryId; label: string }[] = [
  { id: 'software_ai',   label: 'Software & AI' },
  { id: 'maker_hardware', label: 'Maker & Hardware' },
  { id: 'electrical_eng', label: 'Electrical Eng. & Academia' },
  { id: 'homelab_infra',  label: 'HomeLab & Infra' },
];

export const DEFAULT_CATEGORY: CategoryId = 'software_ai';

// ── Dynamic status badge mapping (§4 of the spec) ───────────────
// One label per [category][state]; colour class is per-state.
const BADGE_LABELS: Record<CategoryId, Record<ProjectState, string>> = {
  software_ai: {
    1: '🚀 Live',
    2: '💻 WIP',
    3: '🧪 POC',
    4: '🧊 Archived',
  },
  maker_hardware: {
    1: '🛋️ In Use',
    2: '🔨 On the Bench',
    3: '📐 Concept',
    4: '♻️ Parted Out',
  },
  electrical_eng: {
    1: '📜 Published',
    2: '🔬 Researching',
    3: '💡 Proposal',
    4: '📁 Frozen',
  },
  homelab_infra: {
    1: '🟢 Running',
    2: '⚙️ Upgrading',
    3: '🚧 Lab Test',
    4: '🔌 Deprecated',
  },
};

const STATE_CLASS: Record<ProjectState, string> = {
  1: 'badge--green',
  2: 'badge--amber',
  3: 'badge--purple',
  4: 'badge--gray',
};

export function getBadge(category: CategoryId, state: ProjectState): { label: string; cls: string } {
  return {
    label: BADGE_LABELS[category][state],
    cls: STATE_CLASS[state],
  };
}

// ── The projects ───────────────────────────────────────────────
export const projects: Project[] = [
  {
    id: 'second-brain',
    title: 'Second Brain Bot',
    category: 'software_ai',
    state: 1,
    summary:
      'A Telegram bot that auto-files notes, voice, images and links into Notion using AI. Now live in production.',
    technologies: ['Next.js', 'Supabase', 'Telegram', 'Notion API', 'Claude'],
    image: '/og/brain.png',
    linkType: 'modal',
    href: '/second-brain',
    tldr:
      'Drop a thought, a voice note, a photo or a link into Telegram and the bot reads it, understands it, and files it into the right Notion database automatically — no manual sorting. It started as a homelab beta and now runs in production on Vercel + Supabase, with a waitlist landing page and a daily AI feedback-review pipeline.',
    ctaLabel: 'Read the full story →',
  },
  {
    id: 'conical-horn-antenna',
    title: 'Conical Horn Antenna',
    category: 'electrical_eng',
    state: 1, // 📜 Published — antennas course final project
    summary:
      'Antennas final project: design & simulation of a conical horn ' +
      'antenna (standard + corrugated) for X-band ~10 GHz.',
    technologies: ['MATLAB', 'Antenna Toolbox', 'RF', '10 GHz', 'EM Theory'],
    image: '/assets/projects/electrical_eng/conical-horn-antenna/images/horn-card.jpg',
    linkType: 'internal',
    href: '/projects/conical-horn-antenna',
  },
  {
    id: 'microcontroller-bingo',
    title: 'Microcontroller Bingo Dealer',
    category: 'electrical_eng',
    state: 1, // 📜 Published — microcomputers course final project
    summary:
      'Microcomputers final project: an embedded C "bingo dealer" on a ' +
      'KEIL MCBSTR9 — buttons, potentiometer (ADC), LCD and running LEDs.',
    technologies: ['Embedded C', 'KEIL MCBSTR9', 'STR9', 'ADC', 'LCD', 'GPIO'],
    image: '/assets/projects/electrical_eng/microcontroller-bingo/images/board-card.jpg',
    linkType: 'internal',
    href: '/projects/microcontroller-bingo',
  },
  {
    id: 'homelab',
    title: 'Self-Hosted Homelab',
    category: 'homelab_infra',
    state: 1,
    summary:
      'A two-node Proxmox homelab — smart home, photos, passwords, NAS and automations — built with Claude as co-pilot.',
    technologies: ['Proxmox', 'Docker', 'Tailscale', 'Cloudflare', 'n8n'],
    image: '/og/homelab.png',
    linkType: 'internal',
    href: '/homelab',
  },
];
