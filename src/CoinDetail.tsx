import TradingViewWidget from "./components/TradingViewWidget"

export function CoinDetail(symbol) {
  return (
    <div className="flex flex-col h-full">
      <TradingViewWidget symbol={symbol.symbol} />
    </div>
  );
}
