"use client";

import React, { useEffect } from "react";
import styled from "styled-components";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import {
	jsx,
	javascript,
	bash,
	sass,
	scss,
	typescript,
} from "react-syntax-highlighter/dist/cjs/languages/prism";

const StyledFigure = styled.figure`
	max-height: 90vh;
	overflow: auto;
	/* width: 100%;*/

	// Full width on mobile devices
	@media (max-width: 768px) {
		width: 100vw;
		position: relative;
		left: 50%;
		right: 50%;
		margin-left: -50vw;
		margin-right: -50vw;

		& pre {
			border-radius: 0 !important;
		}
	}
`;

interface CodeBlockProps {
	node?: any;
	inline?: boolean;
	className?: string;
	children?: React.ReactNode;
	[key: string]: any;
}

const CodeBlock = ({ node, inline, className, children, ...props }: CodeBlockProps) => {
	useEffect(() => {
		SyntaxHighlighter.registerLanguage("jsx", jsx);
		SyntaxHighlighter.registerLanguage("javascript", javascript);
		SyntaxHighlighter.registerLanguage("js", javascript);
		SyntaxHighlighter.registerLanguage("typescript", typescript);
		SyntaxHighlighter.registerLanguage("ts", typescript);
		SyntaxHighlighter.registerLanguage("bash", bash);
		SyntaxHighlighter.registerLanguage("sass", sass);
		SyntaxHighlighter.registerLanguage("scss", scss);
	}, []);

	// Extracting the language - support both MDX and react-markdown formats
	let language: string | null = null;
	
	// MDX format: className is passed directly as a prop
	if (typeof className === "string" && className.startsWith("language-")) {
		language = className.replace("language-", "");
	} 
	// React-markdown format: className is in node.properties
	else if (node?.properties?.className) {
		const nodeClassName = node.properties.className;
		const match = Array.isArray(nodeClassName) 
			? nodeClassName.find((cn: string) => cn.startsWith("language-"))
			: typeof nodeClassName === "string" && nodeClassName.startsWith("language-") 
				? nodeClassName 
				: null;
		language = match ? match.replace("language-", "") : null;
	}

	// Check if this is inline code
	const isInline = inline || (!language && typeof children === "string" && !children.includes("\n"));

	if (isInline) {
		return <code className={className} {...props}>{children}</code>;
	}

	// Ensure children is a string for syntax highlighter
	const codeString = typeof children === "string" 
		? children 
		: Array.isArray(children) 
			? children.join("") 
			: String(children || "");

	return (
		<StyledFigure>
			<SyntaxHighlighter language={language || "text"} style={atomDark}>
				{codeString.replace(/\n$/, "")}
			</SyntaxHighlighter>
		</StyledFigure>
	);
};

export default CodeBlock;
