"use client";

import React, { useState } from "react";
import Image from "next/image";
import styled from "styled-components";

interface ImageBlockProps {
	node: any;
	alt: string;
	src: string;
}

type NonArticleUsageProps = Pick<ImageBlockProps, "node">;

type ArticleUsageProps = Pick<ImageBlockProps, "src" | "alt">;

// Styled components
const ImageContainer = styled.div`
	width: 100%;
	position: relative;
	margin-bottom: 8px; // Adjust the space between the image and alt text as needed
`;

const AltText = styled.div`
	text-align: center;
	color: #666; // Example color, adjust as needed
	font-size: 14px; // Example font size, adjust as needed
`;

// Assuming the definitions of ArticleUsageProps and NonArticleUsageProps are available elsewhere in your code
const ImageBlock = (props: ArticleUsageProps | NonArticleUsageProps) => {
	let src: string;
	let alt: string;

	// Type guard to check if 'node' is present in props
	if ("node" in props) {
		// Props are of type NonArticleUsageProps
		src = props.node?.properties?.src;
		alt = props.node?.properties?.alt;
	} else {
		// Props are of type ArticleUsageProps
		src = props.src;
		alt = props.alt;
	}

	const width = 1000; // Example width for maintaining 1:1 aspect ratio
	const height = 1000; // Example height for maintaining 1:1 aspect ratio

	return (
		<>
			<ImageContainer>
				<Image
					src={src}
					alt={alt}
					layout="responsive"
					width={width}
					height={height}
					objectFit="contain" // Ensures the image fits within the container, maintaining its aspect ratio without cropping.
				/>
			</ImageContainer>
			{alt && <AltText>{alt}</AltText>}
		</>
	);
};

export default ImageBlock;
