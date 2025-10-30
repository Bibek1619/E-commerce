import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

export default function ProductShipping({ formData, setFormData }) {
  const { shipping } = formData;

  const updateShipping = (field, value) =>
    setFormData({
      ...formData,
      shipping: { ...shipping, [field]: value },
    });

  return (
    <Card>
      <CardHeader><CardTitle>Shipping & Returns</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
          <Checkbox
            checked={shipping.freeShipping}
            onCheckedChange={(val) => updateShipping("freeShipping", val)}
          />
          <Label>Free Shipping</Label>
        </div>

        <div>
          <Label>Estimated Delivery Days</Label>
          <Input
            placeholder="e.g. 3-5 days"
            value={shipping.estimatedDays}
            onChange={(e) => updateShipping("estimatedDays", e.target.value)}
          />
        </div>

        <div>
          <Label>Return Policy</Label>
          <Textarea
            placeholder="Describe your return policy..."
            value={shipping.returnPolicy}
            onChange={(e) => updateShipping("returnPolicy", e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
