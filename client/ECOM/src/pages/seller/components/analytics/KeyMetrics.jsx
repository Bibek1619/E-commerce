import { Card, CardContent } from "@/components/ui/card"

export default function KeyMetrics({ trends }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <h4 className="text-sm font-medium">Sales Growth</h4>
          <p className="text-2xl font-bold">{trends.salesGrowth}%</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <h4 className="text-sm font-medium">Revenue Growth</h4>
          <p className="text-2xl font-bold">{trends.revenueGrowth}%</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <h4 className="text-sm font-medium">Customer Growth</h4>
          <p className="text-2xl font-bold">{trends.customerGrowth}%</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <h4 className="text-sm font-medium">Conversion Rate</h4>
          <p className="text-2xl font-bold">{trends.conversionRate}%</p>
        </CardContent>
      </Card>
    </div>
  )
}
