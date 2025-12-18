import React, { ReactNode } from "react";

interface HeadingBlockProps {
	level?: number;
	children?: ReactNode;
	id?: string;
	[key: string]: any;
}

const HeadingBlock = ({ level = 1, children, ...props }: HeadingBlockProps) => {
	const Tag = `h${level}` as keyof JSX.IntrinsicElements;
	
	// Generate an ID from children text content for anchor links
	const generateId = (content: ReactNode): string => {
		if (typeof content === "string") return content;
		if (Array.isArray(content)) {
			return content.map(generateId).join("");
		}
		if (React.isValidElement(content) && content.props?.children) {
			return generateId(content.props.children);
		}
		return "";
	};

	const headingId = props.id || generateId(children);

	return (
		<Tag className="typo-heading" id={headingId} {...props}>
			{children}
		</Tag>
	);
};

export default HeadingBlock;
