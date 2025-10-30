import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProductPricing({ formData, setFormData }) {
  return (
    <Card>
      <CardHeader><CardTitle>Pricing & Stock</CardTitle></CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <Label>Price *</Label>
          <Input
            type="number"
            placeholder="e.g. 1000"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
        </div>
        <div>
          <Label>Discounted Price</Label>
          <Input
            type="number"
            placeholder="e.g. 900"
            value={formData.discountedPrice}
            onChange={(e) => setFormData({ ...formData, discountedPrice: e.target.value })}
          />
        </div>
        <div>
          <Label>Stock</Label>
          <Input
            type="number"
            placeholder="e.g. 50"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
          />
        </div>
      </CardContent>
    </Card>
  );
}
