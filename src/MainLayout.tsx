import { MainBar } from "./MainBar";

export function MainLayout({ coinData, followList }) {
	return (
		<div>
			<MainBar coinData={coinData} followList={followList} />
		</div>
	);
}

export default MainLayout;
