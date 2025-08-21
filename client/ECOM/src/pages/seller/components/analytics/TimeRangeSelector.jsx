import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TimeRangeSelector({ timeRange, setTimeRange }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold">Analytics Dashboard</h3>
      <Select value={timeRange} onValueChange={setTimeRange}>
        <SelectTrigger className="w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1month">Last Month</SelectItem>
          <SelectItem value="3months">Last 3 Months</SelectItem>
          <SelectItem value="6months">Last 6 Months</SelectItem>
          <SelectItem value="1year">Last Year</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
