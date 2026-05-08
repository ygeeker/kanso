"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { ActionBar, ActionBarMenu } from "@/components/ui";
import {
	ArrowBackSharpIcon,
} from "@/components/ui/Icons";
import ReaderSettingsSheet from "./ReaderSettingsSheet";
import { tocVisibleAtom, settingsOpenAtom } from "../atoms";
import { Table2Icon, ALargeSmallIcon } from "lucide-react";
import { useTranslations } from "next-intl";

/**
 * Toolbar Button Component
 */
interface ToolbarButtonProps {
	children: React.ReactNode;
	onClick?: () => void;
	disabled?: boolean;
	title?: string;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
	children,
	onClick,
	disabled = false,
	title,
}) => {
	const [isPressed, setIsPressed] = useState(false);

	const normalStyles = {
		color: disabled ? "var(--eink-ink-muted)" : "var(--eink-ink-secondary)",
		backgroundColor: "transparent",
	};

	const pressedStyles = {
		color: "var(--eink-paper)",
		backgroundColor: "var(--eink-ink)",
	};

	const currentStyles = isPressed && !disabled ? pressedStyles : normalStyles;

	return (
		<button
			className="flex items-center justify-center p-2 select-none disabled:cursor-not-allowed"
			style={currentStyles}
			onClick={onClick}
			disabled={disabled}
			title={title}
			onMouseDown={() => setIsPressed(true)}
			onMouseUp={() => setIsPressed(false)}
			onMouseLeave={() => setIsPressed(false)}
			onTouchStart={() => setIsPressed(true)}
			onTouchEnd={() => setIsPressed(false)}
		>
			{children}
		</button>
	);
};

/**
 * Reader Toolbar Props
 */
interface ReaderToolbarProps {
	title: string;
	onMenuClick?: () => void;
}

/**
 * Reader Toolbar Component - Kindle-style reading toolbar
 */
export const ReaderToolbar: React.FC<ReaderToolbarProps> = ({
	title,
	onMenuClick,
}) => {
	const router = useRouter();
	const t = useTranslations();
	const [settingsOpen, setSettingsOpen] = useAtom(settingsOpenAtom);
	const [tocVisible, setTocVisible] = useAtom(tocVisibleAtom);

	const handleBack = () => {
		router.push("/");
	};

	// Truncate title if too long
	const displayTitle = title.length > 30 ? title.slice(0, 30) + "..." : title;

	return (
		<>
			<ActionBar>
				{/* Leading: Back button and title */}
				<div className="flex items-center gap-1 flex-1 min-w-0">
					<ToolbarButton onClick={handleBack} title="Go back">
						<ArrowBackSharpIcon size={18} />
					</ToolbarButton>

					<span
						className="text-sm font-sans truncate"
						style={{ color: "var(--eink-ink)" }}
						title={title}
					>
						{displayTitle}
					</span>
				</div>

				{/* Trailing: ToC, Settings and menu */}
				<div className="flex items-center">
					<ToolbarButton
						onClick={() => setTocVisible(!tocVisible)}
						title="Table of contents"
					>
						<Table2Icon size={18} />
					</ToolbarButton>

					<ToolbarButton
						onClick={() => setSettingsOpen(true)}
						title="Reader settings"
					>
						<ALargeSmallIcon size={18} />
					</ToolbarButton>

					<ActionBarMenu
						items={[
							{
								textPrimary: "Twitter",
								component: "a",
								href: "https://x.com/renedotwang",
							},
							{
								textPrimary: "GitHub",
								component: "a",
								href: "https://github.com/rivertwilight",
							},
							{
								textPrimary: t("nav.homePage"),
								onClick: () => router.push("/"),
							},
							{
								textPrimary: t("nav.settings"),
								onClick: () => router.push("/settings"),
							},
						]}
					/>
				</div>
			</ActionBar>

			{/* Reader Settings Bottom Sheet */}
			<ReaderSettingsSheet
				isOpen={settingsOpen}
				onClose={() => setSettingsOpen(false)}
			/>
		</>
	);
};

export default ReaderToolbar;
