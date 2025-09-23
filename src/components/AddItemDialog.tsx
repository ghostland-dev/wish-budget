import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { WishlistItem } from "@/types/wishlist";

interface AddItemDialogProps {
  categories: string[];
  onAddItem: (item: Omit<WishlistItem, 'id' | 'createdAt'>) => void;
  editItem?: WishlistItem | null;
  onEditItem?: (item: WishlistItem) => void;
  onClose?: () => void;
}

export const AddItemDialog = ({ 
  categories, 
  onAddItem, 
  editItem, 
  onEditItem, 
  onClose 
}: AddItemDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: editItem?.name || '',
    category: editItem?.category || '',
    price: editItem?.price?.toString() || '',
    link: editItem?.link || '',
    imageUrl: editItem?.imageUrl || '',
    purchased: editItem?.purchased || false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || !formData.price) {
      return;
    }

    const itemData = {
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      link: formData.link || undefined,
      imageUrl: formData.imageUrl || undefined,
      purchased: formData.purchased
    };

    if (editItem && onEditItem) {
      onEditItem({
        ...editItem,
        ...itemData
      });
    } else {
      onAddItem(itemData);
    }

    setFormData({
      name: '',
      category: '',
      price: '',
      link: '',
      imageUrl: '',
      purchased: false
    });
    
    setOpen(false);
    onClose?.();
  };

  const resetForm = () => {
    setFormData({
      name: editItem?.name || '',
      category: editItem?.category || '',
      price: editItem?.price?.toString() || '',
      link: editItem?.link || '',
      imageUrl: editItem?.imageUrl || '',
      purchased: editItem?.purchased || false
    });
  };

  return (
    <Dialog open={editItem ? true : open} onOpenChange={(newOpen) => {
      if (editItem) {
        onClose?.();
      } else {
        setOpen(newOpen);
        if (!newOpen) resetForm();
      }
    }}>
      {!editItem && (
        <DialogTrigger asChild>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Ajouter un article
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editItem ? 'Modifier l\'article' : 'Ajouter un nouvel article'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom de l'article</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="ex. iPhone 15 Pro"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Catégorie</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Choisir une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Prix (€)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="99.99"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="link">Lien (optionnel)</Label>
            <Input
              id="link"
              type="url"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              placeholder="https://..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">URL de l'image (optionnel)</Label>
            <Input
              id="imageUrl"
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://..."
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              {editItem ? 'Modifier' : 'Ajouter'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                if (editItem) {
                  onClose?.();
                } else {
                  setOpen(false);
                }
              }}
            >
              Annuler
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};