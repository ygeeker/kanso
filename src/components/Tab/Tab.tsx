import React from "react";
import { Tab, TabItem } from "@/components/ui";

type TTab = {
	name: string;
	text: string;
};

const HomeTab = ({
	onChange,
	tabs,
	activeIndex,
}: {
	onChange(index: string): void;
	activeIndex: string;
	tabs: TTab[];
}) => {
	return (
		<Tab>
			{tabs.map((tab) => (
				<TabItem
					key={tab.name}
					onClick={() => {
						onChange(tab.name);
					}}
					active={activeIndex === tab.name}
				>
					{tab.text}
				</TabItem>
			))}
		</Tab>
	);
};

export default HomeTab;
