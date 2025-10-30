import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, X } from "lucide-react";
import { useState } from "react";

export default function ProductImages({ formData, setFormData }) {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const total = files.length + (formData.existingImages?.length || 0);
    if (total > 10) {
      alert("You can upload up to 10 images only.");
      return;
    }
    setSelectedImages((prev) => [...prev, ...files]);
    setFormData({ ...formData, images: [...(formData.images || []), ...files] });
  };

  const removeSelected = (i) => {
    const newFiles = selectedImages.filter((_, idx) => idx !== i);
    setSelectedImages(newFiles);
    setFormData({ ...formData, images: newFiles });
  };

  return (
    <Card>
      <CardHeader><CardTitle>Product Images</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="border-2 border-dashed rounded-lg p-8 text-center">
          <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
          <label className="cursor-pointer text-blue-600 font-medium">
            Click to upload
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          <p className="text-xs text-gray-500 mt-1">
            Upload up to 10 images (JPG, PNG)
          </p>
        </div>

        {selectedImages.length > 0 && (
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
            {selectedImages.map((img, idx) => (
              <div key={idx} className="relative group">
                <img
                  src={URL.createObjectURL(img)}
                  alt="Preview"
                  className="w-full h-24 object-cover rounded-md border"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition"
                  onClick={() => removeSelected(idx)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
