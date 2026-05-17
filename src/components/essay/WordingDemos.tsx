"use client";

import React, { useState, useEffect, useRef } from "react";
import {
	HelpCircle,
	Monitor,
	Sparkles,
	Ellipsis,
	CircleCheck,
	Lock,
	Search,
	ChevronDown,
	AlertCircle,
	AlertTriangle,
	ChevronRight,
	Check,
} from "lucide-react";

/* ─── 1. Button Labels ─── */

type MenuItem = { icon: React.ReactNode; label: string };

function ButtonLabelMenu({
	open,
	onToggle,
	items,
}: {
	open: boolean;
	onToggle: () => void;
	items: MenuItem[];
}) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!open) return;
		const handle = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				onToggle();
			}
		};
		document.addEventListener("mousedown", handle);
		return () => document.removeEventListener("mousedown", handle);
	}, [open, onToggle]);

	return (
		<div
			ref={ref}
			className="font-demo bg-white text-neutral-900 p-5 flex flex-col items-center gap-3"
		>
			<button
				onClick={onToggle}
				className="flex items-center gap-1.5 px-4 py-2 border-[1.5px] border-neutral-300 bg-transparent text-[13px] cursor-pointer text-neutral-900 rounded-md"
			>
				<Ellipsis size={16} />
				<span>More</span>
			</button>
			<div
				className={`bg-white border border-neutral-300 rounded-lg shadow-md min-w-[180px] py-1 transition-all duration-150 ${
					open
						? "opacity-100 translate-y-0 pointer-events-auto"
						: "opacity-0 -translate-y-1 pointer-events-none"
				}`}
			>
				{items.map((item, i) => (
					<button
						key={i}
						className="flex items-center gap-2 w-full py-2 px-3.5 text-[13px] text-neutral-900 bg-transparent border-none text-left cursor-pointer hover:bg-neutral-100"
					>
						{item.icon}
						{item.label}
					</button>
				))}
			</div>
		</div>
	);
}

export function ButtonLabelA() {
	const [open, setOpen] = useState(false);
	return (
		<ButtonLabelMenu
			open={open}
			onToggle={() => setOpen(!open)}
			items={[
				{ icon: <HelpCircle size={15} />, label: "Help" },
				{ icon: <Monitor size={15} />, label: "Desktop App" },
				{ icon: <Sparkles size={15} />, label: "Become a Pro" },
			]}
		/>
	);
}

export function ButtonLabelB() {
	const [open, setOpen] = useState(false);
	return (
		<ButtonLabelMenu
			open={open}
			onToggle={() => setOpen(!open)}
			items={[
				{ icon: <HelpCircle size={15} />, label: "Get Help" },
				{
					icon: <Monitor size={15} />,
					label: "Download Desktop App",
				},
				{ icon: <Sparkles size={15} />, label: "Upgrade Plan" },
			]}
		/>
	);
}

/* ─── 2. Placeholder vs Label ─── */

export function PlaceholderLabelA() {
	return (
		<div className="font-demo p-5 bg-white text-neutral-900">
			<div className="flex items-center gap-2 border border-neutral-300 rounded-md py-2.5 px-3 transition-colors focus-within:border-neutral-900">
				<Search size={15} className="text-neutral-400 shrink-0" />
				<input
					type="search"
					placeholder="Enter keywords..."
					className="flex-1 min-w-0 text-sm text-neutral-900 bg-transparent border-none outline-none focus:outline-none placeholder:text-neutral-400"
				/>
			</div>
		</div>
	);
}

export function PlaceholderLabelB() {
	return (
		<div className="font-demo p-5 bg-white text-neutral-900">
			<div className="flex items-center gap-2 border border-neutral-300 rounded-md py-2.5 px-3 transition-colors focus-within:border-neutral-900">
				<Search size={15} className="text-neutral-400 shrink-0" />
				<input
					type="search"
					placeholder="Search projects..."
					className="flex-1 min-w-0 text-sm text-neutral-900 bg-transparent border-none outline-none focus:outline-none placeholder:text-neutral-400"
				/>
			</div>
		</div>
	);
}

/* ─── 2b. Newsletter Placeholder ─── */

function NewsletterInput({ placeholder }: { placeholder: string }) {
	return (
		<div className="font-demo p-5 bg-white text-neutral-900">
			<div className="flex items-center border border-neutral-300 rounded-lg p-1.5 gap-2 transition-colors focus-within:border-neutral-900">
				<input
					type="email"
					placeholder={placeholder}
					className="flex-1 min-w-0 py-2 px-2.5 text-sm text-neutral-900 bg-transparent border-none outline-none focus:outline-none placeholder:text-neutral-400"
				/>
				<button className="shrink-0 py-2 px-4 bg-neutral-900 text-white text-[13px] font-medium border-none cursor-pointer rounded-md">
					Subscribe
				</button>
			</div>
		</div>
	);
}

export function NewsletterPlaceholderA() {
	return <NewsletterInput placeholder="Subscribe to newsletter" />;
}

export function NewsletterPlaceholderB() {
	return <NewsletterInput placeholder="contact@rene.wang" />;
}

/* ─── 3. Error Messages ─── */

export function ErrorMessageA() {
	const [value, setValue] = useState("jane@example.com");

	return (
		<div className="font-demo p-5 bg-white text-neutral-900">
			<label className="text-xs font-semibold text-neutral-600 mb-1.5 block">
				Email
			</label>
			<input
				type="text"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				className="w-full border-[1.5px] border-red-700 py-3 px-3.5 text-sm text-neutral-900 bg-red-50 outline-none rounded-md"
			/>
			<div className="text-xs text-red-700 mt-1.5">Invalid input.</div>
		</div>
	);
}

export function ErrorMessageB() {
	const [value, setValue] = useState("jane@example.com");

	return (
		<div className="font-demo p-5 bg-white text-neutral-900">
			<label className="text-xs font-semibold text-neutral-600 mb-1.5 block">
				Email
			</label>
			<input
				type="text"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				className="w-full border-[1.5px] border-red-700 py-3 px-3.5 text-sm text-neutral-900 bg-red-50 outline-none rounded-md"
			/>
			<div className="text-xs text-red-700 mt-1.5">
				This email is already registered.{" "}
				<span className="underline cursor-pointer">
					Try signing in instead.
				</span>
			</div>
		</div>
	);
}

/* ─── 4. Confirmation Messages ─── */

function CheckIcon() {
	return (
		<CircleCheck
			size={20}
			className="shrink-0 text-green-600 fill-green-600 stroke-white"
		/>
	);
}

export function ConfirmationA() {
	return (
		<div className="font-demo p-5 bg-white text-neutral-900">
			<div className="flex items-start gap-2.5 py-3 px-4 rounded-lg border border-neutral-200 bg-green-50">
				<CheckIcon />
				<div className="text-sm font-semibold text-neutral-900">
					Successfully Saved.
				</div>
			</div>
		</div>
	);
}

export function ConfirmationB() {
	return (
		<div className="font-demo p-5 bg-white text-neutral-900">
			<div className="flex items-start gap-2.5 py-3 px-4 rounded-lg border border-neutral-200 bg-green-50">
				<CheckIcon />
				<div className="text-sm font-semibold text-neutral-900">
					Your changes to &ldquo;Project Alpha&rdquo; have been saved.
				</div>
			</div>
		</div>
	);
}

/* ─── 5. Empty State ─── */

export function EmptyStateWordingA() {
	const [query, setQuery] = useState("fluxcap");

	return (
		<div className="font-demo p-5 bg-white text-neutral-900">
			<input
				type="text"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				className="w-full border border-neutral-300 py-2 px-3 text-[13px] text-neutral-900 bg-transparent outline-none mb-4 rounded-md"
				placeholder="Search..."
			/>
			<div className="text-center py-5 text-sm text-neutral-400">
				No results found.
			</div>
		</div>
	);
}

export function EmptyStateWordingB() {
	const [query, setQuery] = useState("fluxcap");

	return (
		<div className="font-demo p-5 bg-white text-neutral-900">
			<input
				type="text"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				className="w-full border border-neutral-300 py-2 px-3 text-[13px] text-neutral-900 bg-transparent outline-none mb-4 rounded-md"
				placeholder="Search..."
			/>
			<div className="text-center py-3">
				<div className="mb-2 flex justify-center">
					<Search
						size={32}
						strokeWidth={1.5}
						className="text-neutral-400"
					/>
				</div>
				<div className="text-sm font-semibold mb-1 text-neutral-900">
					No results for &ldquo;{query}&rdquo;
				</div>
				<div className="text-xs text-neutral-400">
					Try a different keyword or check your spelling.
				</div>
			</div>
		</div>
	);
}

/* ─── 6. Destructive Action ─── */

export function DestructiveActionA() {
	return (
		<div className="font-demo p-5 bg-white text-neutral-900">
			<div className="rounded-lg border border-neutral-200 shadow-sm p-5">
				<div className="flex items-center gap-2 mb-3">
					<AlertTriangle size={20} className="text-red-600 shrink-0" />
					<div className="text-sm font-bold text-red-700">
						Warning: Permanent Deletion
					</div>
				</div>
				<p className="text-[13px] leading-relaxed text-neutral-600 mb-4">
					Are you sure you want to permanently delete this project?
					This action is irreversible and cannot be undone. All
					associated data will be permanently removed from our
					servers.
				</p>
				<div className="flex justify-end gap-2">
					<button className="py-2 px-4 border border-neutral-300 bg-transparent text-[13px] cursor-pointer text-neutral-600 rounded-md">
						Cancel
					</button>
					<button className="py-2 px-4 border border-red-700 bg-red-700 text-[13px] cursor-pointer text-white rounded-md">
						I understand, delete permanently
					</button>
				</div>
			</div>
		</div>
	);
}

export function DestructiveActionB() {
	return (
		<div className="font-demo p-5 bg-white text-neutral-900">
			<div className="rounded-lg border border-neutral-200 shadow-sm p-5">
				<div className="text-sm font-bold text-neutral-900 mb-3">
					Delete &ldquo;Landing Page&rdquo;?
				</div>
				<ul className="text-[13px] leading-relaxed text-neutral-600 mb-4 list-disc pl-4 space-y-1">
					<li>12 published posts will be unpublished</li>
					<li>3 team members will lose access</li>
					<li>Cannot be undone</li>
				</ul>
				<div className="flex justify-end gap-2">
					<button className="py-2 px-4 border border-neutral-300 bg-transparent text-[13px] cursor-pointer text-neutral-600 rounded-md">
						Keep project
					</button>
					<button className="py-2 px-4 border border-red-700 bg-red-700 text-[13px] cursor-pointer text-white rounded-md">
						Delete project
					</button>
				</div>
			</div>
		</div>
	);
}

/* ─── 7. Email Wording ─── */

export function EmailWordingA() {
	return (
		<div className="font-demo p-5 bg-white text-neutral-900">
			<div className="text-[11px] text-neutral-400 py-1.5 border-b border-neutral-200 flex gap-1.5">
				<span className="shrink-0">To:</span>
				<span className="text-neutral-900">hi@vercel.com</span>
			</div>
			<div className="text-[11px] text-neutral-400 py-1.5 border-b border-neutral-200 flex gap-1.5 mb-3">
				<span className="shrink-0">Subject:</span>
				<span className="text-neutral-900">
					You&apos;ve been invited to join Acme Inc.
				</span>
			</div>
			<div className="text-xs leading-relaxed text-neutral-600">
				<p className="mb-3">
					This{" "}
					<strong className="text-neutral-900">invitation</strong> was
					intended for hi@vercel.com.
				</p>
				<p className="mb-3">
					This <strong className="text-neutral-900">invite</strong>{" "}
					was sent on March 24, 2026, 12:55 AM (UTC) and will expire{" "}
					<strong className="text-neutral-900">in 72 hours</strong>.
					This <strong className="text-neutral-900">invite</strong>{" "}
					was sent from 204.13.186.218 located in São Paulo, Brazil.
					If you were not expecting this invitation, you can ignore
					this email. If you are concerned about your account&apos;s
					safety, please visit{" "}
					<span className="underline cursor-pointer">
						our Help page
					</span>{" "}
					to get in touch with us.
				</p>
				<p className="mb-3">
					<span className="underline cursor-pointer">
						Manage your notification settings
					</span>
				</p>
			</div>
		</div>
	);
}

export function EmailWordingB() {
	return (
		<div className="font-demo p-5 bg-white text-neutral-900">
			<div className="text-[11px] text-neutral-400 py-1.5 border-b border-neutral-200 flex gap-1.5">
				<span className="shrink-0">To:</span>
				<span className="text-neutral-900">hi@vercel.com</span>
			</div>
			<div className="text-[11px] text-neutral-400 py-1.5 border-b border-neutral-200 flex gap-1.5 mb-3">
				<span className="shrink-0">Subject:</span>
				<span className="text-neutral-900">
					Invitation to join Acme Inc.
				</span>
			</div>
			<div className="text-xs leading-relaxed text-neutral-600">
				<p className="mb-3">
					This invitation was sent to hi@vercel.com on March 24, 2026
					at 12:55 AM (UTC) from 204.13.186.218 (São Paulo, Brazil).
					Expires{" "}
					<strong className="text-neutral-900">March 27, 2026</strong>
					.
				</p>
				<p className="mb-3">
					Didn&apos;t expect this? Safe to ignore. Concerned about
					your account? Visit{" "}
					<span className="underline cursor-pointer">
						our Help page
					</span>
					.
				</p>
				<p className="mb-3">
					<span className="underline cursor-pointer">
						Manage notification settings
					</span>
				</p>
			</div>
		</div>
	);
}

/* ─── 8. Changelog ─── */

function ChangelogEntry({
	tag,
	tagColor,
	children,
	last,
}: {
	tag: string;
	tagColor: string;
	children: React.ReactNode;
	last?: boolean;
}) {
	const colorMap: Record<string, string> = {
		blue: "bg-blue-100 text-blue-800",
		green: "bg-green-100 text-green-800",
		yellow: "bg-yellow-100 text-yellow-800",
	};
	return (
		<div
			className={`text-[13px] leading-normal py-2 text-neutral-600 ${
				last ? "" : "border-b border-neutral-200"
			}`}
		>
			<span
				className={`inline-block text-[10px] font-bold uppercase tracking-wider py-0.5 px-1.5 rounded-sm mr-2 align-middle ${colorMap[tagColor]}`}
			>
				{tag}
			</span>
			{children}
		</div>
	);
}

export function ChangelogA() {
	return (
		<div className="font-demo p-5 bg-white text-neutral-900">
			<div className="text-sm font-bold text-neutral-900 mb-3">
				v2.4.0
			</div>
			<ChangelogEntry tag="New" tagColor="blue">
				Added dark mode support
			</ChangelogEntry>
			<ChangelogEntry tag="Fix" tagColor="green">
				Fixed an issue that content may be blank in PDF export
			</ChangelogEntry>
			<ChangelogEntry tag="Fix" tagColor="yellow" last>
				Fixed custom font rendering issue
			</ChangelogEntry>
		</div>
	);
}

export function ChangelogB() {
	return (
		<div className="font-demo p-5 bg-white text-neutral-900">
			<div className="text-sm font-bold text-neutral-900 mb-3">
				v2.4.0
			</div>
			<ChangelogEntry tag="New" tagColor="blue">
				You can now switch to dark mode from Settings
			</ChangelogEntry>
			<ChangelogEntry tag="Fix" tagColor="green">
				PDFs no longer export as blank pages on Firefox
			</ChangelogEntry>
			<ChangelogEntry tag="Fix" tagColor="green" last>
				Your exports now include custom fonts
			</ChangelogEntry>
		</div>
	);
}

/* ─── 9. Loading State Copy ─── */

function Spinner({ size = 18 }: { size?: number }) {
	return (
		<span
			className="inline-block border-2 border-neutral-200 border-t-neutral-500 rounded-full animate-spin"
			style={{ width: size, height: size, animationDuration: "0.8s" }}
		/>
	);
}

export function LoadingStateA() {
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (loading) {
			const t = setTimeout(() => setLoading(false), 6000);
			return () => clearTimeout(t);
		}
	}, [loading]);

	return (
		<div className="font-demo flex justify-center items-center p-5 bg-white text-neutral-900 min-h-[120px]">
			{!loading ? (
				<button
					onClick={() => setLoading(true)}
					className="py-2.5 px-6 border-[1.5px] border-neutral-300 bg-transparent text-[13px] cursor-pointer text-neutral-900 rounded-md"
				>
					Generate Report
				</button>
			) : (
				<div className="text-center">
					<Spinner />
					<div className="text-[13px] text-neutral-400 mt-2.5">
						Please wait...
					</div>
				</div>
			)}
		</div>
	);
}

export function LoadingStateB() {
	const [loading, setLoading] = useState(false);
	const [elapsed, setElapsed] = useState(0);

	useEffect(() => {
		if (loading) {
			const t = setTimeout(() => setLoading(false), 6000);
			const tick = setInterval(() => setElapsed((e) => e + 1), 1000);
			return () => {
				clearTimeout(t);
				clearInterval(tick);
			};
		}
		setElapsed(0);
	}, [loading]);

	return (
		<div className="font-demo flex justify-center items-center p-5 bg-white text-neutral-900 min-h-[120px]">
			{!loading ? (
				<button
					onClick={() => setLoading(true)}
					className="py-2.5 px-6 border-[1.5px] border-neutral-300 bg-transparent text-[13px] cursor-pointer text-neutral-900 rounded-md"
				>
					Generate Report
				</button>
			) : (
				<div className="text-center">
					<Spinner />
					<div className="text-[13px] text-neutral-900 mt-2.5 font-semibold">
						Generating your report...
					</div>
					<div className="text-xs text-neutral-400 mt-1">
						This usually takes about 6 seconds
					</div>
					<div className="text-[11px] text-neutral-400 mt-2 tabular-nums">
						{elapsed}s elapsed
					</div>
				</div>
			)}
		</div>
	);
}

/* ─── 10. Disabled Feature Tooltips ─── */

function LockIcon() {
	return <Lock size={14} />;
}

export function DisabledTooltipA() {
	const [hover, setHover] = useState(false);

	return (
		<div className="font-demo pt-5 px-5 pb-5 bg-white text-neutral-900">
			<div className="flex items-center justify-between py-2.5">
				<div>
					<div className="text-[13px] font-semibold text-neutral-900">
						Custom Domain
					</div>
					<div className="text-[11px] text-neutral-400 mt-0.5">
						Use your own domain for published sites
					</div>
				</div>
				<div className="relative">
					<button
						className="flex items-center gap-1.5 py-1.5 px-3.5 border border-neutral-200 bg-neutral-100 text-xs text-neutral-400 cursor-default rounded-[5px]"
						onMouseEnter={() => setHover(true)}
						onMouseLeave={() => setHover(false)}
					>
						<LockIcon />
						Configure
					</button>
					{hover && (
						<div className="absolute bottom-[calc(100%+8px)] right-0 py-2 px-3 rounded-md text-xs leading-snug whitespace-nowrap bg-neutral-900 text-white pointer-events-none shadow-md">
							Available on Pro plan
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export function DisabledTooltipB() {
	const [hover, setHover] = useState(false);

	return (
		<div className="font-demo pt-5 px-5 pb-5 bg-white text-neutral-900">
			<div className="flex items-center justify-between py-2.5">
				<div>
					<div className="text-[13px] font-semibold text-neutral-900">
						Custom Domain
					</div>
					<div className="text-[11px] text-neutral-400 mt-0.5">
						Use your own domain for published sites
					</div>
				</div>
				<div className="relative">
					<button
						className="flex items-center gap-1.5 py-1.5 px-3.5 border border-neutral-200 bg-neutral-100 text-xs text-neutral-400 cursor-default rounded-[5px]"
						onMouseEnter={() => setHover(true)}
						onMouseLeave={() => setHover(false)}
					>
						<LockIcon />
						Configure
					</button>
					{hover && (
						<div className="absolute bottom-[calc(100%+8px)] right-0 py-2 px-3 rounded-md text-xs leading-snug whitespace-nowrap bg-neutral-900 text-white pointer-events-none shadow-md">
							Unlock custom domains → Pro
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

/* ─── 11. Answer Length ─── */

function FaqChevron() {
	return (
		<ChevronDown
			size={14}
			className="faq-chevron text-neutral-400 shrink-0 transition-transform duration-150"
		/>
	);
}

export function AnswerLengthA() {
	return (
		<div className="font-demo py-2 px-5 h-[180px] bg-white text-neutral-900">
			<details open>
				<summary className="text-[13px] font-semibold text-neutral-900 py-3 cursor-pointer list-none flex justify-between items-center">
					<span>Can I cancel anytime?</span>
					<FaqChevron />
				</summary>
				<div className="text-[13px] leading-relaxed text-neutral-600 pb-3">
					<p className="mb-2">
						Yes, you can cancel your subscription at any time from
						your account settings. Once you cancel, your current
						billing cycle will continue until the end of the period.
					</p>
					<p className="mb-2">
						Please note that refunds are not provided for partial
						billing periods. If you cancel mid-cycle, you will
						retain access to all features until your current period
						expires.
					</p>
					<p>
						If you have any questions about cancellation, our
						support team is available 24/7 to assist you.
					</p>
				</div>
			</details>
		</div>
	);
}

export function AnswerLengthB() {
	return (
		<div className="font-demo py-2 px-5 h-[180px] bg-white text-neutral-900">
			<details open>
				<summary className="text-[13px] font-semibold text-neutral-900 py-3 cursor-pointer list-none flex justify-between items-center">
					<span>Can I cancel anytime?</span>
					<FaqChevron />
				</summary>
				<div className="text-[13px] leading-relaxed text-neutral-600 pb-3">
					Yes. No fees, no questions.
				</div>
			</details>
		</div>
	);
}

/* ─── 12. Onboarding Questions ─── */

function OnboardingScreen({
	question,
	options,
}: {
	question: string;
	options: string[];
}) {
	const [selected, setSelected] = useState<string | null>(null);

	return (
		<div className="font-demo p-5 bg-white text-neutral-900">
			<div className="text-[11px] text-neutral-400 mb-1.5 uppercase tracking-wider">
				Step 1 of 3
			</div>
			<div className="text-sm font-bold text-neutral-900 mb-3.5">
				{question}
			</div>
			<div className="flex flex-wrap gap-2">
				{options.map((opt) => (
					<button
						key={opt}
						className={`py-2 px-3.5 text-xs rounded-full cursor-pointer transition-all duration-150 ${
							selected === opt
								? "bg-neutral-900 text-white border border-neutral-900"
								: "bg-transparent text-neutral-900 border border-neutral-300 hover:border-neutral-900"
						}`}
						onClick={() => setSelected(opt)}
					>
						{opt}
					</button>
				))}
			</div>
		</div>
	);
}

export function OnboardingA() {
	return (
		<OnboardingScreen
			question="What's your role?"
			options={[
				"Designer",
				"Engineer",
				"Product Manager",
				"Marketing",
				"Executive",
				"Other",
			]}
		/>
	);
}

export function OnboardingB() {
	return (
		<OnboardingScreen
			question="What will you use Acme for?"
			options={[
				"Build a website",
				"Write and publish",
				"Manage a team",
				"Track projects",
				"Something else",
			]}
		/>
	);
}

/* ─── 13. Settings Labels ─── */

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
	return (
		<button
			onClick={onToggle}
			className={`relative w-9 h-5 rounded-full border-none cursor-pointer transition-colors duration-200 shrink-0 ${
				on ? "bg-neutral-900" : "bg-neutral-200"
			}`}
		>
			<span
				className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-[left] duration-200 ${
					on ? "left-[18px]" : "left-0.5"
				}`}
			/>
		</button>
	);
}

type SettingsRow = {
	label: string;
	description?: string;
	defaultOn?: boolean;
};

type SettingsSection = {
	header?: string;
	rows: SettingsRow[];
};

function SettingsPanel({ sections }: { sections: SettingsSection[] }) {
	const allRows = sections.flatMap((s) => s.rows);
	const [toggles, setToggles] = useState<boolean[]>(
		allRows.map((r) => r.defaultOn ?? false)
	);

	let rowIndex = 0;

	return (
		<div className="font-demo py-4 px-5 bg-white text-neutral-900">
			{sections.map((section, si) => (
				<div key={si}>
					{section.header && (
						<div
							className={`text-[10px] font-bold text-neutral-400 uppercase tracking-widest ${
								si === 0 ? "pb-2" : "pt-3.5 pb-2"
							}`}
						>
							{section.header}
						</div>
					)}
					{section.rows.map((row) => {
						const i = rowIndex++;
						return (
							<div
								key={i}
								className="flex items-start justify-between gap-3 py-2.5 border-b border-neutral-200"
							>
								<div className="min-w-0">
									<div className="text-[13px] text-neutral-900 font-medium">
										{row.label}
									</div>
									{row.description && (
										<div className="text-[11px] text-neutral-400 mt-0.5 leading-snug">
											{row.description}
										</div>
									)}
								</div>
								<Toggle
									on={toggles[i]}
									onToggle={() =>
										setToggles((t) =>
											t.map((v, j) => (j === i ? !v : v))
										)
									}
								/>
							</div>
						);
					})}
				</div>
			))}
		</div>
	);
}

export function SettingsLabelsA() {
	return (
		<SettingsPanel
			sections={[
				{
					rows: [
						{
							label: "Enable two-factor authentication",
							defaultOn: true,
						},
						{ label: "Notifications", defaultOn: true },
						{
							label: "Dark Mode",
							description:
								"Enable dark mode for the application.",
						},
					],
				},
				{
					header: "Advanced",
					rows: [{ label: "Disable auto-renewal" }],
				},
			]}
		/>
	);
}

export function SettingsLabelsB() {
	return (
		<SettingsPanel
			sections={[
				{
					rows: [
						{
							label: "Require a code to sign in",
							description:
								"Adds a verification step to protect your account",
							defaultOn: true,
						},
						{
							label: "Send me email notifications",
							defaultOn: true,
						},
						{
							label: "Dark Mode",
							description:
								"Reduces eye strain in low-light environments",
						},
					],
				},
				{
					header: "Billing",
					rows: [
						{
							label: "Renew automatically",
							description:
								"Your plan renews on the 1st of each month",
						},
					],
				},
			]}
		/>
	);
}

/* ─── 14. Synonym: Submit vs Send ─── */

function ContactForm({ buttonLabel }: { buttonLabel: string }) {
	return (
		<div className="font-demo p-5 bg-white text-neutral-900">
			<div className="text-sm font-bold mb-3">Contact Us</div>
			<div className="space-y-2.5">
				<div>
					<label className="text-[11px] font-medium text-neutral-600 mb-1 block">
						Message
					</label>
					<div className="w-full border border-neutral-300 py-2 px-3 text-[13px] text-neutral-400 rounded-md h-16" />
				</div>
				<button className="w-full py-2 px-4 bg-neutral-900 text-white text-[13px] font-medium rounded-md">
					{buttonLabel}
				</button>
			</div>
		</div>
	);
}

export function SynonymSubmitA() {
	return <ContactForm buttonLabel="Submit" />;
}

export function SynonymSubmitB() {
	return <ContactForm buttonLabel="Send" />;
}

/* ─── 15. Synonym: Retry vs Try again ─── */

function ErrorCard({ buttonLabel }: { buttonLabel: string }) {
	return (
		<div className="font-demo p-5 bg-white text-neutral-900 flex items-center justify-center min-h-[160px]">
			<div className="text-center">
				<div className="mb-2 flex justify-center">
					<AlertCircle size={28} className="text-red-400" />
				</div>
				<div className="text-[13px] font-semibold text-neutral-900 mb-1">
					Couldn&apos;t load your messages
				</div>
				<div className="text-xs text-neutral-400 mb-4">
					Please check your connection and try again.
				</div>
				<button className="py-1.5 px-5 border border-neutral-300 bg-transparent text-[13px] cursor-pointer text-neutral-900 rounded-md transition-colors hover:bg-neutral-50 hover:border-neutral-400">
					{buttonLabel}
				</button>
			</div>
		</div>
	);
}

export function SynonymRetryA() {
	return <ErrorCard buttonLabel="Try again" />;
}

export function SynonymRetryB() {
	return <ErrorCard buttonLabel="Retry" />;
}

/* ─── 16. Synonym: Continue vs Next ─── */

function CheckoutStep({ buttonLabel }: { buttonLabel: React.ReactNode }) {
	return (
		<div className="font-demo p-5 bg-white text-neutral-900">
			<div className="flex items-center gap-2 mb-4 text-xs text-neutral-400">
				<span className="flex items-center gap-1 text-green-600 font-medium">
					<Check size={12} />
					Shipping
				</span>
				<ChevronRight size={12} />
				<span className="text-neutral-900 font-semibold">Payment</span>
				<ChevronRight size={12} />
				<span>Review</span>
			</div>
			<div className="border border-neutral-200 rounded-md p-3 mb-4">
				<div className="text-[11px] text-neutral-400 mb-1">
					Shipping address
				</div>
				<div className="text-[13px] text-neutral-900">Jane Doe</div>
				<div className="text-xs text-neutral-600">
					123 Main St, San Francisco, CA 94102
				</div>
			</div>
			<button className="w-full py-2.5 px-4 bg-neutral-900 text-white text-[13px] font-medium rounded-md cursor-pointer transition-colors hover:bg-neutral-800">
				{buttonLabel}
			</button>
		</div>
	);
}

export function SynonymContinueA() {
	return <CheckoutStep buttonLabel="Next" />;
}

export function SynonymContinueB() {
	return <CheckoutStep buttonLabel="Continue to payment" />;
}

/* ─── 17. Consistency ─── */

type TeamMember = { name: string; rowAction: string };

function TeamMembersPanel({
	title,
	searchPlaceholder,
	inviteLabel,
	members,
}: {
	title: string;
	searchPlaceholder: string;
	inviteLabel: string;
	members: TeamMember[];
}) {
	return (
		<div className="font-demo p-5 bg-white text-neutral-900">
			<div className="flex items-center justify-between mb-3">
				<div className="text-sm font-bold">{title}</div>
				<button className="py-1.5 px-3 bg-neutral-900 text-white text-[12px] font-medium rounded-md">
					{inviteLabel}
				</button>
			</div>
			<div className="relative mb-3">
				<Search
					size={13}
					className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400"
				/>
				<div className="w-full border border-neutral-300 py-1.5 pl-7 pr-3 text-[12px] text-neutral-400 rounded-md">
					{searchPlaceholder}
				</div>
			</div>
			<div>
				{members.map((m, i) => (
					<div
						key={i}
						className="flex items-center justify-between py-2 border-b border-neutral-200 last:border-b-0"
					>
						<div className="flex items-center gap-2">
							<div className="w-6 h-6 rounded-full bg-neutral-200" />
							<span className="text-[13px] text-neutral-900">
								{m.name}
							</span>
						</div>
						<button className="text-[12px] text-neutral-600 px-2 py-1 rounded hover:bg-neutral-100">
							{m.rowAction}
						</button>
					</div>
				))}
			</div>
		</div>
	);
}

export function ConsistencyA() {
	return (
		<TeamMembersPanel
			title="Team Members"
			searchPlaceholder="Search users..."
			inviteLabel="Invite teammate"
			members={[
				{ name: "Jane Doe", rowAction: "Remove" },
				{ name: "Alex Park", rowAction: "Kick out" },
				{ name: "Sam Lee", rowAction: "Delete user" },
			]}
		/>
	);
}

export function ConsistencyB() {
	return (
		<TeamMembersPanel
			title="Members"
			searchPlaceholder="Search members..."
			inviteLabel="Invite member"
			members={[
				{ name: "Jane Doe", rowAction: "Remove member" },
				{ name: "Alex Park", rowAction: "Remove member" },
				{ name: "Sam Lee", rowAction: "Remove member" },
			]}
		/>
	);
}

/* ─── CSS injection ─── */

export function DetailDemoStyles() {
	return (
		<style>{`
			@import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&display=swap');
			.font-demo,
			.font-demo button,
			.font-demo input,
			.font-demo summary {
				font-family: 'Geist Sans', system-ui, sans-serif;
			}
			details > summary::-webkit-details-marker,
			details > summary::marker {
				display: none;
				content: "";
			}
			details[open] > summary .faq-chevron {
				transform: rotate(180deg);
			}
			details[open] > summary .reveal-chevron {
				transform: rotate(90deg);
			}
		`}</style>
	);
}
