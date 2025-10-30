import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";

export default function ProductFeatures({ formData, setFormData }) {
  const { features, specifications } = formData;

  const addFeature = () =>
    setFormData({ ...formData, features: [...features, ""] });

  const removeFeature = (i) =>
    setFormData({ ...formData, features: features.filter((_, idx) => idx !== i) });

  const handleFeatureChange = (i, value) => {
    const newF = [...features];
    newF[i] = value;
    setFormData({ ...formData, features: newF });
  };

  return (
    <Card>
      <CardHeader><CardTitle>Features & Specifications</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <p className="text-xs text-gray-500">💡 Example: Feature → “Water Resistant”, Specification → “Material: Cotton”</p>

        {features.map((f, i) => (
          <div key={i} className="flex gap-2">
            <Input
              value={f}
              onChange={(e) => handleFeatureChange(i, e.target.value)}
              placeholder="Enter product feature..."
            />
            <Button variant="ghost" onClick={() => removeFeature(i)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
        <Button variant="outline" onClick={addFeature}>
          <Plus className="w-4 h-4 mr-1" /> Add Feature
        </Button>
      </CardContent>
    </Card>
  );
}
