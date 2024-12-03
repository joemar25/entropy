import {
    AlertTriangle,
    ArrowRight,
    Calendar,
    Check,
    ChevronLeft,
    ChevronRight,
    Command,
    CreditCard,
    File,
    FileText,
    HelpCircle,
    Image,
    Laptop,
    Loader2,
    LucideProps,
    Mail,
    MapPin,
    Moon,
    MoreVertical,
    Pizza,
    Plus,
    RefreshCwIcon,
    Settings,
    SunMedium,
    Trash,
    Twitter,
    User,
    Printer,
    BadgeCheck,
    Bell,
    LogOut,
    Receipt,
    X,
    RotateCcw,
    CalendarIcon,
    Tag,
    Shield,
    Folder,
    MoreHorizontal,
    Share,
    Trash2,
    RadioReceiverIcon,
    PanelLeft,
    Lightbulb,
    ChevronsUpDown,
    Files,
    Frame,
    LayoutDashboard,
    LeafyGreen,
    LifeBuoy,
    PieChart,
    Send,
    User2,
    Building,
    LucideSend,
    LucidePenLine,
    Hash,
    UserCheck,
    MessageSquare,
    CalendarClock,
    SearchIcon,
    Briefcase,
    UserCog,
    Minus,
    Clipboard,

    // mar-note: this commented is not to be used, but please do not remove
    // type Icon as LucideIcon,
} from 'lucide-react'

import {
    ArrowDownIcon,
    ArrowRightIcon,
    ArrowUpIcon,
    CircleIcon,
    Cross2Icon,
    InfoCircledIcon,
    StopwatchIcon,
} from '@radix-ui/react-icons'

export type Icon = typeof X

export const Icons = {
    logo: Command,
    close: X,
    spinner: Loader2,
    chevronLeft: ChevronLeft,
    chevronRight: ChevronRight,
    trash: Trash,
    post: FileText,
    page: File,
    media: Image,
    settings: Settings,
    billing: CreditCard,
    ellipsis: MoreVertical,
    add: Plus,
    edit: Minus,
    warning: AlertTriangle,
    user: User,
    arrowRight: ArrowRight,
    help: HelpCircle,
    pizza: Pizza,
    sun: SunMedium,
    moon: Moon,
    laptop: Laptop,
    twitter: Twitter,
    check: Check,
    calendar: Calendar,
    refresh: RefreshCwIcon,
    mapPin: MapPin,
    mail: Mail,
    printer: Printer,
    badgeCheck: BadgeCheck,
    bell: Bell,
    logout: LogOut,
    reciept: Receipt,
    calendarIcon: CalendarIcon,
    rotateCcw: RotateCcw,
    fileText: FileText,
    tag: Tag,
    shield: Shield,
    folder: Folder,
    moreHorizontal: MoreHorizontal,
    share: Share,
    trash2: Trash2,
    radioReceiverIcon: RadioReceiverIcon,
    arrowDownIcon: ArrowDownIcon,
    arrowRightIcon: ArrowRightIcon,
    arrowUpIcon: ArrowUpIcon,
    circleIcon: CircleIcon,
    infoCircledIcon: InfoCircledIcon,
    stopwatchIcon: StopwatchIcon,
    panelLeft: PanelLeft,
    lightBulb: Lightbulb,
    moonIcon: Moon,
    chevronsUpDown: ChevronsUpDown,
    file: File,
    files: Files,
    frame: Frame,
    layoutDashboard: LayoutDashboard,
    leafyGreen: LeafyGreen,
    lifeBuoy: LifeBuoy,
    map: Map,
    pieChart: PieChart,
    send: Send,
    user2: User2,
    building: Building,
    helpCircle: HelpCircle,
    lucideSend: LucideSend,
    lucidePenLine: LucidePenLine,
    hash: Hash,
    userCheck: UserCheck,
    messageSquare: MessageSquare,
    calendarClock: CalendarClock,
    search: SearchIcon,
    cross2Icon: Cross2Icon,
    briefcase: Briefcase,
    userCog: UserCog,
    clipboard: Clipboard,

    /**
     * Custom Icons below  
     */
    gitHub: ({ ...props }: LucideProps) => (
        <svg
            aria-hidden='true'
            focusable='false'
            role='img'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 496 512'
            {...props}
        >
            <path
                fill='currentColor'
                d='M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8z'
            />
        </svg>
    ),
    microsoft: ({ ...props }: LucideProps) => (
        <svg
            aria-hidden='true'
            focusable='false'
            role='img'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 448 448'
            {...props}
        >
            <rect x='0' y='0' width='200' height='200' fill='#F25022' />
            <rect x='248' y='0' width='200' height='200' fill='#7FBA00' />
            <rect x='0' y='248' width='200' height='200' fill='#00A4EF' />
            <rect x='248' y='248' width='200' height='200' fill='#FFB900' />
        </svg>
    ),
    google: ({ ...props }: LucideProps) => (
        <svg
            aria-hidden='true'
            focusable='false'
            role='img'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 448 448'
            {...props}
        >
            <path
                fill='#4285F4'
                d='M224 237.9h115.8c-5.1 29.4-20.6 54.2-44.4 70.5v58.6h71.8c42.2-38.6 66.8-95.3 66.8-160.5 0-9.9-.8-19.5-2.2-28.9H224v60.3z'
            />
            <path
                fill='#34A853'
                d='M224 448c59.2 0 108.8-19.5 145-53.1l-71.8-58.6c-20.1 13.3-45.7 21-73.2 21-56.6 0-104.4-37.5-121.5-89.7H27.6v59.3C64 398.5 138.1 448 224 448z'
            />
            <path
                fill='#FBBC05'
                d='M102.5 267.6c-4.8-14.4-7.5-29.6-7.5-45.6s2.7-31.2 7.5-45.6V117H27.6C10.1 153.7 0 189.6 0 222s10.1 68.3 27.6 105l74.9-59.4z'
            />
            <path
                fill='#EA4335'
                d='M224 89.7c32.3 0 61.3 11.1 84.3 29.7l63.3-63.3C332.9 22.4 281.6 0 224 0 138.1 0 64 49.5 27.6 117l74.9 59.4c17.1-52.2 64.9-89.7 121.5-89.7z'
            />
        </svg>
    ),
} as const

export type IconsType = typeof Icons
