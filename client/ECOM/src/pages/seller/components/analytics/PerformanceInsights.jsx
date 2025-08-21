import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PerformanceInsights() {
  const insights = [
    "Clothing sales show consistent growth trend",
    "Crafts category has highest revenue share",
    "December recorded peak sales and revenue",
    "Customer acquisition shows steady increase",
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside space-y-2">
          {insights.map((insight, idx) => (
            <li key={idx}>{insight}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
