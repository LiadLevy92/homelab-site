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
  /** Ordered image paths for a modal photo gallery (chronological). When
   *  present, the modal shows a main image + thumbnail strip instead of a
   *  single image. The first entry is used as the main image. */
  gallery?: string[];
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
    id: 'antenna-build',
    title: 'Physical Antenna — Build & Measurement',
    category: 'electrical_eng',
    state: 1, // 📜 Published — communications course project
    summary:
      'Communications lab: building a physical antenna and tuning it on ' +
      'a VNA & spectrum analyzer — resonant around ~2 GHz.',
    technologies: ['RF', 'Antenna', 'VNA', 'S-Parameters', 'Spectrum Analyzer'],
    image: '/assets/projects/electrical_eng/antenna-build/images/card.jpg',
    linkType: 'internal',
    href: '/projects/antenna-build',
  },

  // ── Maker / Hardware ─────────────────────────────────────────
  {
    id: 'bench-psu',
    title: 'Bench Power Supply',
    category: 'maker_hardware',
    state: 1, // 🛋️ In Use
    summary:
      'A retired computer PSU rebuilt into a workshop bench supply — ' +
      'boxed up with banana terminals, a fan and a power switch.',
    technologies: ['ATX PSU', 'Electronics', 'Enclosure', 'DC Bench Supply'],
    image: '/assets/projects/maker_hardware/bench-psu/images/card.jpg',
    linkType: 'modal',
    href: '#',
    tldr:
      'Took a spare ATX computer power supply and turned it into a proper bench supply for the workshop — mounted in an enclosure with colour-coded banana terminals, an added cooling fan and a front power switch.',
    gallery: [
      '/assets/projects/maker_hardware/bench-psu/images/01.jpg',
      '/assets/projects/maker_hardware/bench-psu/images/02.jpg',
      '/assets/projects/maker_hardware/bench-psu/images/03.jpg',
      '/assets/projects/maker_hardware/bench-psu/images/04.jpg',
      '/assets/projects/maker_hardware/bench-psu/images/05.jpg',
    ],
  },
  {
    id: 'slat-wall',
    title: 'Living-Room Slat Wall',
    category: 'maker_hardware',
    state: 1,
    summary:
      'A warm wood-slat accent wall built for the living room — from a ' +
      'bare wall to a finished feature behind the TV.',
    technologies: ['Woodworking', 'Wall Slats', 'Interior', 'DIY'],
    image: '/assets/projects/maker_hardware/slat-wall/images/card.jpg',
    linkType: 'modal',
    href: '#',
    tldr:
      'Designed and installed a wooden slat accent wall in the living room — measuring, cutting and mounting the slats to turn a plain wall into a warm feature wall behind the TV.',
    gallery: [
      '/assets/projects/maker_hardware/slat-wall/images/01.jpg',
      '/assets/projects/maker_hardware/slat-wall/images/02.jpg',
      '/assets/projects/maker_hardware/slat-wall/images/03.jpg',
      '/assets/projects/maker_hardware/slat-wall/images/04.jpg',
      '/assets/projects/maker_hardware/slat-wall/images/05.jpg',
      '/assets/projects/maker_hardware/slat-wall/images/06.jpg',
      '/assets/projects/maker_hardware/slat-wall/images/07.jpg',
    ],
  },
  {
    id: 'wood-wall-art',
    title: 'Geometric Wood Wall Art',
    category: 'maker_hardware',
    state: 1,
    summary:
      'A framed geometric wood-mosaic wall piece, assembled slat by slat ' +
      'from stained and natural timber.',
    technologies: ['Woodworking', 'Wood Mosaic', 'Wall Art', 'Wood Stain'],
    image: '/assets/projects/maker_hardware/wood-wall-art/images/card.jpg',
    linkType: 'modal',
    href: '#',
    tldr:
      'A geometric wood wall-art panel built piece by piece — cutting and arranging stained, natural and white timber into a mirrored X pattern, then framing it.',
    gallery: [
      '/assets/projects/maker_hardware/wood-wall-art/images/01.jpg',
      '/assets/projects/maker_hardware/wood-wall-art/images/02.jpg',
      '/assets/projects/maker_hardware/wood-wall-art/images/03.jpg',
      '/assets/projects/maker_hardware/wood-wall-art/images/04.jpg',
      '/assets/projects/maker_hardware/wood-wall-art/images/05.jpg',
    ],
  },
  {
    id: 'wood-table',
    title: 'Round Pedestal Table',
    category: 'maker_hardware',
    state: 1,
    summary:
      'A round pedestal table built from a hand-drawn leg template ' +
      'through to a white-painted finish.',
    technologies: ['Woodworking', 'Furniture', 'Templating', 'Paint Finish'],
    image: '/assets/projects/maker_hardware/wood-table/images/card.jpg',
    linkType: 'modal',
    href: '#',
    tldr:
      'A round table (part of a table-and-chairs build) made from scratch — from a hand-drawn curved-leg template on MDF, through cutting and assembly, to a white-painted finish styled at home.',
    gallery: [
      '/assets/projects/maker_hardware/wood-table/images/01.jpg',
      '/assets/projects/maker_hardware/wood-table/images/02.jpg',
      '/assets/projects/maker_hardware/wood-table/images/03.jpg',
      '/assets/projects/maker_hardware/wood-table/images/04.jpg',
      '/assets/projects/maker_hardware/wood-table/images/05.jpg',
      '/assets/projects/maker_hardware/wood-table/images/06.jpg',
      '/assets/projects/maker_hardware/wood-table/images/07.jpg',
    ],
  },
  {
    id: 'wood-nightstand',
    title: 'Pine Nightstand',
    category: 'maker_hardware',
    state: 1,
    summary:
      'A two-drawer pine nightstand built from raw timber, with shaped ' +
      'drawer pulls and tapered legs.',
    technologies: ['Woodworking', 'Furniture', 'Pine', 'Drawers'],
    image: '/assets/projects/maker_hardware/wood-nightstand/images/card.jpg',
    linkType: 'modal',
    href: '#',
    tldr:
      'A two-drawer bedside nightstand built from solid pine — the carcass, drawers on runners, carved finger-pull recesses and tapered legs.',
    gallery: [
      '/assets/projects/maker_hardware/wood-nightstand/images/01.jpg',
      '/assets/projects/maker_hardware/wood-nightstand/images/02.jpg',
      '/assets/projects/maker_hardware/wood-nightstand/images/03.jpg',
      '/assets/projects/maker_hardware/wood-nightstand/images/04.jpg',
      '/assets/projects/maker_hardware/wood-nightstand/images/05.jpg',
      '/assets/projects/maker_hardware/wood-nightstand/images/06.jpg',
    ],
  },
  {
    id: 'wood-kitchen',
    title: 'Modular Kitchen Cabinet',
    category: 'maker_hardware',
    state: 1,
    summary:
      'A modular kitchen base cabinet built and fitted with a door and ' +
      'drawers, from carcass to primed finish.',
    technologies: ['Woodworking', 'Cabinetry', 'Carpentry', 'Drawers'],
    image: '/assets/projects/maker_hardware/wood-kitchen/images/card.jpg',
    linkType: 'modal',
    href: '#',
    tldr:
      'A modular kitchen base unit built from board — assembling the carcass, fitting a door and drawer runners, and priming it ready for finish.',
    gallery: [
      '/assets/projects/maker_hardware/wood-kitchen/images/01.jpg',
      '/assets/projects/maker_hardware/wood-kitchen/images/02.jpg',
      '/assets/projects/maker_hardware/wood-kitchen/images/03.jpg',
      '/assets/projects/maker_hardware/wood-kitchen/images/04.jpg',
      '/assets/projects/maker_hardware/wood-kitchen/images/05.jpg',
      '/assets/projects/maker_hardware/wood-kitchen/images/06.jpg',
    ],
  },
  {
    id: 'wood-balcony',
    title: 'Balcony Corner Bench',
    category: 'maker_hardware',
    state: 1,
    summary:
      'An L-shaped slatted corner bench built for the balcony — from ' +
      'workshop frame to installed seating.',
    technologies: ['Woodworking', 'Pine', 'Outdoor Furniture', 'Balcony'],
    image: '/assets/projects/maker_hardware/wood-balcony/images/card.jpg',
    linkType: 'modal',
    href: '#',
    tldr:
      'A large L-shaped corner bench for the balcony, built from pine — framing the two sides in the workshop and assembling them into a slatted corner seating unit on the balcony.',
    gallery: [
      '/assets/projects/maker_hardware/wood-balcony/images/01.jpg',
      '/assets/projects/maker_hardware/wood-balcony/images/02.jpg',
      '/assets/projects/maker_hardware/wood-balcony/images/03.jpg',
      '/assets/projects/maker_hardware/wood-balcony/images/04.jpg',
    ],
  },
  {
    id: 'wood-planter',
    title: 'Wooden Planter',
    category: 'maker_hardware',
    state: 1,
    summary:
      'A handmade raised wooden planter box on legs, built from pine ' +
      'for the balcony.',
    technologies: ['Woodworking', 'Pine', 'Balcony'],
    image: '/assets/projects/maker_hardware/wood-planter/images/card.jpg',
    linkType: 'modal',
    href: '#',
    tldr:
      'A raised planter box built from pine for the balcony — a clean, simple build with a boxed top and four legs.',
    gallery: [
      '/assets/projects/maker_hardware/wood-planter/images/01.jpg',
      '/assets/projects/maker_hardware/wood-planter/images/02.jpg',
    ],
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
