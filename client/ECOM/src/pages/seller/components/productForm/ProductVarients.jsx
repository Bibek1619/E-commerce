import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";

export default function ProductVariants({ formData, setFormData }) {
  const { variants } = formData;

  const addVariant = () =>
    setFormData({ ...formData, variants: [...variants, { size: "", color: "", price: "", stock: "" }] });

  const removeVariant = (i) =>
    setFormData({ ...formData, variants: variants.filter((_, idx) => idx !== i) });

  const handleChange = (i, field, value) => {
    const newVariants = [...variants];
    newVariants[i][field] = value;
    setFormData({ ...formData, variants: newVariants });
  };

  return (
    <Card>
      <CardHeader><CardTitle>Variants</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <p className="text-xs text-gray-500">💡 Example: Size: M, Color: Red, Price: 500, Stock: 20</p>
        {variants.map((v, i) => (
          <div key={i} className="grid grid-cols-4 gap-2">
            <Input placeholder="Size" value={v.size} onChange={(e) => handleChange(i, "size", e.target.value)} />
            <Input placeholder="Color" value={v.color} onChange={(e) => handleChange(i, "color", e.target.value)} />
            <Input placeholder="Price" type="number" value={v.price} onChange={(e) => handleChange(i, "price", e.target.value)} />
            <Input placeholder="Stock" type="number" value={v.stock} onChange={(e) => handleChange(i, "stock", e.target.value)} />
            <Button variant="ghost" onClick={() => removeVariant(i)}><X className="w-4 h-4" /></Button>
          </div>
        ))}
        <Button variant="outline" onClick={addVariant}><Plus className="w-4 h-4 mr-1" /> Add Variant</Button>
      </CardContent>
    </Card>
  );
}
