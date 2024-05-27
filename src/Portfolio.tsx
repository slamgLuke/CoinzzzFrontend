import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import plot from "./assets/plot.png"

const transaction_data = [
    {
        coin: 'BTC',
        type: 'Buy',
        date: '14-04-2024',
        price: '61,879.00',
        quantity: '0.01',
        usdtValue: '+ $618.79',
    },
    {
        coin: 'BTC',
        type: 'Sell',
        date: '14-04-2024',
        price: '61,879.00',
        quantity: '0.01',
        usdtValue: '- $618.79',
    },
    {
        coin: 'BTC',
        type: 'Buy',
        date: '14-04-2024',
        price: '61,879.00',
        quantity: '0.01',
        usdtValue: '+ $618.79',
    },
];

function transactionTable() {
    return (
        <Card className="margin-0">
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="sm:table-cell text-center">Coin</TableHead>
                            <TableHead className="sm:table-cell text-center">Type</TableHead>
                            <TableHead className="hidden md:table-cell text-center">Date</TableHead>
                            <TableHead className="hidden sm:table-cell text-center">Price</TableHead>
                            <TableHead className="sm:table-cell text-center">Quantity</TableHead>
                            <TableHead className="text-right">USDT Value</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transaction_data.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <div className="font-medium">{item.coin}</div>
                                </TableCell>
                                <TableCell className="sm:table-cell">
                                    <Badge className="text-xs" variant={item.type.toLowerCase() === "buy" ? "default" : "secondary"}>{item.type}</Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">{item.date}</TableCell>
                                <TableCell className="hidden sm:table-cell">{item.price}</TableCell>
                                <TableCell className="sm:table-cell">{item.quantity}</TableCell>
                                <TableCell className="text-right">{item.usdtValue}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )

}


export function Portfolio() {
    return (
        <div>
            <div className="flex flex1 flex-col align-top">
                <h1 className="text-4xl font-semibold w-auto text-left py-4 pl-6">
                    Portfolio
                </h1>
            </div>
            <div>
                <div className="flex flex-col items-center justify-center pb-16">
                    <Card className="items-center justify-center px-16 py-4">
                        <CardDescription>Your Net</CardDescription>
                        <CardTitle className="text-4xl">$1,329</CardTitle>
                        <CardTitle className="text-2xl">0.13 BTC</CardTitle>
                        <div className="text-xs text-muted-foreground">+25%</div>
                        <img src={plot} alt="plot" className="hidden"/> 
                    </Card>
                </div>
                <CardTitle>Transactions</CardTitle>
                <div className="text-xs text-muted-foreground pb-8">Your latest recorded transactions</div>
                {transactionTable()}
            </div>
        </div>
    )
}

export default Portfolio
